import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerMetaHighlight,
} from "@shikijs/transformers";
import { transformerCopyButton } from "./shiki-transformers";

const tutorialsDirectory = path.join(process.cwd(), "content/tutorials");

export interface TutorialMetadata {
  title: string;
  description: string;
  icon?: string;
  color?: string;
  difficulty?: string;
  estimatedTime?: string;
  order?: number;
  section?: string;
}

export interface TutorialLesson {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  section: string;
  htmlContent: string;
  codeBlocks: CodeBlock[];
}

export interface CodeBlock {
  language: string;
  code: string;
  isExample?: boolean;
  isTryItYourself?: boolean;
}

export interface TutorialSection {
  id: string;
  title: string;
  lessons: TutorialLesson[];
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: string;
  estimatedTime: string;
  sections: TutorialSection[];
}

export async function getAllTutorials(): Promise<Tutorial[]> {
  const tutorialDirs = fs.readdirSync(tutorialsDirectory);
  const tutorials: Tutorial[] = [];

  for (const tutorialId of tutorialDirs) {
    const tutorialPath = path.join(tutorialsDirectory, tutorialId);
    if (!fs.statSync(tutorialPath).isDirectory()) continue;

    const tutorial = await getTutorial(tutorialId);
    if (tutorial) {
      tutorials.push(tutorial);
    }
  }

  return tutorials;
}

export async function getTutorial(
  tutorialId: string
): Promise<Tutorial | null> {
  const tutorialPath = path.join(tutorialsDirectory, tutorialId);

  if (!fs.existsSync(tutorialPath)) {
    return null;
  }

  // Read tutorial metadata from index.md
  const indexPath = path.join(tutorialPath, "index.md");
  if (!fs.existsSync(indexPath)) {
    return null;
  }

  const indexContent = fs.readFileSync(indexPath, "utf8");
  const { data: metadata } = matter(indexContent);

  // Get all lesson files
  const files = fs
    .readdirSync(tutorialPath)
    .filter((file) => file.endsWith(".md") && file !== "index.md")
    .sort();

  const lessons: TutorialLesson[] = [];

  for (const file of files) {
    const lesson = await getTutorialLesson(tutorialId, file);
    if (lesson) {
      lessons.push(lesson);
    }
  }

  // Group lessons by section
  const sectionsMap = new Map<string, TutorialLesson[]>();

  lessons.forEach((lesson) => {
    const sectionTitle = lesson.section || "General";
    if (!sectionsMap.has(sectionTitle)) {
      sectionsMap.set(sectionTitle, []);
    }
    sectionsMap.get(sectionTitle)!.push(lesson);
  });

  // Convert to sections array
  const sections: TutorialSection[] = Array.from(sectionsMap.entries()).map(
    ([title, sectionLessons]) => ({
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      lessons: sectionLessons.sort((a, b) => a.order - b.order),
    })
  );

  return {
    id: tutorialId,
    title: metadata.title || tutorialId,
    description: metadata.description || "",
    icon: metadata.icon || "📚",
    color: metadata.color || "from-blue-500 to-purple-500",
    difficulty: metadata.difficulty || "beginner",
    estimatedTime: metadata.estimatedTime || "1 hour",
    sections,
  };
}

export async function getTutorialLesson(
  tutorialId: string,
  filename: string
): Promise<TutorialLesson | null> {
  const lessonPath = path.join(tutorialsDirectory, tutorialId, filename);

  if (!fs.existsSync(lessonPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(lessonPath, "utf8");
  const { data: frontMatter, content } = matter(fileContent);

  // Process markdown to HTML with syntax highlighting
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeShiki, {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false, // Use CSS variables for theming
      langs: [
        "html",
        "css",
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "json",
        "markdown",
        "bash",
        "sql",
        "python",
        "java",
        "php",
        "go",
        "rust",
        "yaml",
      ],
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerMetaHighlight(),
        transformerCopyButton(),
        // Add language label transformer
        {
          name: "add-language-label",
          pre(node: any) {
            // Add data-language attribute for CSS styling
            const lang = this.options.lang;
            if (lang && lang !== "text") {
              node.properties["data-language"] = lang;
            }
          },
        },
      ],
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const htmlContent = processedContent.toString();

  // Extract code blocks from markdown
  const codeBlocks = extractCodeBlocks(content);

  const lessonId = filename.replace(".md", "");

  return {
    id: lessonId,
    title: frontMatter.title || lessonId,
    description: frontMatter.description || "",
    content,
    order: frontMatter.order || 0,
    section: frontMatter.section || "General",
    htmlContent,
    codeBlocks,
  };
}

function extractCodeBlocks(content: string): CodeBlock[] {
  const codeBlocks: CodeBlock[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const language = match[1] || "text";
    const code = match[2].trim();

    // Determine if it's an example or try-it-yourself based on context
    const beforeBlock = content.substring(0, match.index).toLowerCase();
    const isExample =
      beforeBlock.includes("example") || beforeBlock.includes("demo");
    const isTryItYourself =
      beforeBlock.includes("try it yourself") ||
      beforeBlock.includes("practice");

    codeBlocks.push({
      language,
      code,
      isExample,
      isTryItYourself,
    });
  }

  return codeBlocks;
}

export async function getTutorialLessonBySlug(
  tutorialId: string,
  lessonSlug: string
): Promise<TutorialLesson | null> {
  const tutorial = await getTutorial(tutorialId);
  if (!tutorial) return null;

  for (const section of tutorial.sections) {
    const lesson = section.lessons.find((l) => l.id === lessonSlug);
    if (lesson) return lesson;
  }

  return null;
}
