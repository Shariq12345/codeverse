import { NextResponse } from "next/server";

// Mock data - in a real app, this would come from a database
const challenges = [
  {
    id: "1",
    title: "CSS Grid Mastery",
    description:
      "Create a responsive photo gallery using CSS Grid. Test your layout skills with this visual challenge.",
    difficulty: "Intermediate",
    category: "CSS",
    points: 150,
    timeEstimate: "45 min",
    participants: 2847,
    completionRate: 68,
    tags: ["CSS", "Grid", "Responsive", "Layout"],
    isTrending: true,
    isNew: false,
    isDaily: false,
  },
  {
    id: "2",
    title: "JavaScript Array Algorithms",
    description:
      "Solve 5 array manipulation problems using modern JavaScript methods. Perfect for interview prep.",
    difficulty: "Advanced",
    category: "JavaScript",
    points: 250,
    timeEstimate: "90 min",
    participants: 1923,
    completionRate: 42,
    tags: ["JavaScript", "Algorithms", "Arrays", "Problem Solving"],
    isTrending: false,
    isNew: false,
    isDaily: false,
  },
  {
    id: "3",
    title: "Daily UI: Login Form",
    description:
      "Design and code a beautiful, accessible login form with smooth animations and validation.",
    difficulty: "Beginner",
    category: "UI/UX",
    points: 100,
    timeEstimate: "30 min",
    participants: 4521,
    completionRate: 85,
    tags: ["HTML", "CSS", "Forms", "Animation"],
    isDaily: true,
    isNew: true,
    isTrending: false,
  },
  {
    id: "4",
    title: "React Component Library",
    description:
      "Build a reusable button component with multiple variants, sizes, and states using React and TypeScript.",
    difficulty: "Intermediate",
    category: "React",
    points: 200,
    timeEstimate: "60 min",
    participants: 1634,
    completionRate: 71,
    tags: ["React", "TypeScript", "Components", "Design System"],
    isTrending: false,
    isNew: false,
    isDaily: false,
  },
  {
    id: "5",
    title: "API Integration Challenge",
    description:
      "Fetch and display data from a REST API with error handling, loading states, and pagination.",
    difficulty: "Advanced",
    category: "JavaScript",
    points: 300,
    timeEstimate: "120 min",
    participants: 892,
    completionRate: 38,
    tags: ["API", "Fetch", "Error Handling", "Async"],
    isTrending: true,
    isNew: false,
    isDaily: false,
  },
  {
    id: "6",
    title: "CSS Animation Playground",
    description:
      "Create engaging micro-interactions using pure CSS animations. No JavaScript allowed!",
    difficulty: "Intermediate",
    category: "CSS",
    points: 175,
    timeEstimate: "50 min",
    participants: 2156,
    completionRate: 63,
    tags: ["CSS", "Animation", "Keyframes", "Transitions"],
    isTrending: false,
    isNew: false,
    isDaily: false,
  },
];

export async function GET() {
  try {
    return NextResponse.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}
