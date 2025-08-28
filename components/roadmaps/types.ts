export type RoadmapCategory =
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "ai-engineer"
  | "data-analyst"
  | "data-science"
  | "ml-engineer"
  | "mobile"
  | "cloud"
  | "security"
  | "blockchain"
  | "game-dev"
  | "ui-ux";

export interface RoadmapNode {
  id: string;
  title: string;
  description?: string;
  level: number; // depth
  children?: RoadmapNode[];
  resources?: { label: string; url: string }[];
  optional?: boolean;
  recommended?: boolean;
  content?: string; // markdown-ish string
  snippets?: { language: string; code: string; description?: string }[];
  // Visual roadmap properties
  position?: { x: number; y: number }; // percentage positions (0-100)
  type?: "topic" | "choice" | "milestone" | "tool";
  connections?: string[]; // ids of connected nodes
}

export interface RoadmapMeta {
  slug: RoadmapCategory;
  title: string;
  short: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estMonths: number; // estimated months to reach proficiency
  tags: string[];
  theme?: string; // optional accent color token
  nodes: RoadmapNode[];
}
