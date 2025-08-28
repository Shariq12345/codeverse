"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Menu, X, Code, Home } from "lucide-react";
import { Tutorial } from "@/lib/markdown";
import { CodePlayground } from "@/components/ui/code-playground";

export default function TutorialPage() {
  const params = useParams();
  const tutorialId = params.tutorialId as string;

  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTutorial() {
      try {
        const response = await fetch(`/api/tutorials/${tutorialId}`);
        if (!response.ok) {
          throw new Error("Tutorial not found");
        }
        const tutorialData = await response.json();
        setTutorial(tutorialData);

        // Set first lesson as current
        if (
          tutorialData.sections.length > 0 &&
          tutorialData.sections[0].lessons.length > 0
        ) {
          setCurrentLessonId(tutorialData.sections[0].lessons[0].id);
        }
      } catch (error) {
        console.error("Failed to load tutorial:", error);
      } finally {
        setLoading(false);
      }
    }

    if (tutorialId) {
      loadTutorial();
    }
  }, [tutorialId]);

  // Add copy functionality for code blocks
  useEffect(() => {
    function handleCopyClick(event: Event) {
      const target = event.target as HTMLElement;
      const copyButton = target.closest(
        ".shiki-copy-button"
      ) as HTMLButtonElement;

      if (!copyButton) return;

      const codeBlock = copyButton.closest(".shiki");
      if (!codeBlock) return;

      const preElement = codeBlock.querySelector("pre");
      if (!preElement) return;

      const code = preElement.textContent || "";

      navigator.clipboard
        .writeText(code)
        .then(() => {
          // Show copied state
          copyButton.classList.add("copied");
          copyButton.setAttribute("aria-label", "Copied!");

          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.classList.remove("copied");
            copyButton.setAttribute("aria-label", "Copy code");
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    }

    document.addEventListener("click", handleCopyClick);

    return () => {
      document.removeEventListener("click", handleCopyClick);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <div>Loading tutorial...</div>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Tutorial Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The tutorial you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/tutorials">
            <Button>Back to Tutorials</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const allLessons = tutorial.sections.flatMap((section) =>
    section.lessons.map((lesson) => ({
      ...lesson,
      sectionTitle: section.title,
    }))
  );

  const currentLessonIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLessonId
  );
  const currentLesson = allLessons[currentLessonIndex];

  const previousLesson = allLessons[currentLessonIndex - 1];
  const nextLesson = allLessons[currentLessonIndex + 1];

  const navigateToLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-16">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/tutorials">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="font-semibold">{tutorial.title}</h1>
              <p className="text-sm text-muted-foreground">
                {currentLesson?.title}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-80 bg-background border-r transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 pt-16 lg:pt-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto p-6">
            {/* Tutorial Header */}
            <div className="mb-6">
              <Link
                href="/tutorials"
                className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Tutorials
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{tutorial.icon}</div>
                <div>
                  <h1 className="text-xl font-bold">{tutorial.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    {tutorial.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{allLessons.length} lessons</span>
                <Badge variant="secondary">Free</Badge>
                <Badge variant="outline">{tutorial.difficulty}</Badge>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Sections and Lessons */}
            <div className="space-y-4">
              {tutorial.sections.map((section) => (
                <div key={section.id}>
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </h3>
                  <div className="space-y-1 ml-2">
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => navigateToLesson(lesson.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 hover:bg-accent ${
                          currentLessonId === lesson.id
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="font-medium text-sm">
                          {lesson.title}
                        </div>
                        <div className="text-xs opacity-75">
                          {lesson.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 pt-24 lg:pt-8">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            {currentLesson && (
              <>
                {/* Breadcrumb */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{currentLesson.sectionTitle}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground">
                      {currentLesson.title}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Lesson {currentLessonIndex + 1} of {allLessons.length}
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                      {currentLesson.title}
                    </h1>

                    {/* Content rendered from markdown */}
                    <div
                      className="prose prose-slate dark:prose-invert max-w-none tutorial-content"
                      dangerouslySetInnerHTML={{
                        __html: currentLesson.htmlContent,
                      }}
                    />
                  </div>

                  {/* Code Examples */}
                  {currentLesson.codeBlocks &&
                    currentLesson.codeBlocks.length > 0 && (
                      <div className="space-y-6">
                        {currentLesson.codeBlocks.map((codeBlock, index) => (
                          <div key={index}>
                            {codeBlock.isTryItYourself ? (
                              <CodePlayground
                                title="Try It Yourself"
                                initialHtml={
                                  codeBlock.language === "html"
                                    ? codeBlock.code
                                    : ""
                                }
                                initialCss={
                                  codeBlock.language === "css"
                                    ? codeBlock.code
                                    : ""
                                }
                                initialJs={
                                  codeBlock.language === "javascript" ||
                                  codeBlock.language === "js"
                                    ? codeBlock.code
                                    : ""
                                }
                              />
                            ) : (
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                                    <Code className="w-5 h-5" />
                                    {codeBlock.isExample ? "Example" : "Code"}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
                                    <code
                                      className={`language-${codeBlock.language}`}
                                    >
                                      {codeBlock.code}
                                    </code>
                                  </pre>
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t">
                  <div className="flex-1">
                    {previousLesson && (
                      <Button
                        variant="outline"
                        onClick={() => navigateToLesson(previousLesson.id)}
                        className="w-full sm:w-auto"
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous: {previousLesson.title}
                      </Button>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      {currentLessonIndex + 1} / {allLessons.length}
                    </div>
                  </div>

                  <div className="flex-1 flex justify-end">
                    {nextLesson && (
                      <Button
                        onClick={() => navigateToLesson(nextLesson.id)}
                        className="w-full sm:w-auto"
                      >
                        Next: {nextLesson.title}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
