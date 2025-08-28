"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  RotateCcw,
  CheckCircle,
  Clock,
  Users,
  Trophy,
  ChevronLeft,
  Code2,
  TestTube,
  FileText,
  Star,
  Share,
  Lightbulb,
  Target,
  Timer,
  Award,
} from "lucide-react";
import Link from "next/link";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
  points: number;
  timeEstimate: string;
  participants: number;
  completionRate: number;
  tags: string[];
  instructions: string;
  starterCode: {
    html: string;
    css: string;
    js: string;
  };
  expectedOutput: string;
  testCases: Array<{
    input: any;
    expected: any;
    description: string;
  }>;
  hints: string[];
  solution?: {
    html: string;
    css: string;
    js: string;
    explanation: string;
  };
}

const mockChallenge: Challenge = {
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
  instructions: `
# CSS Grid Photo Gallery Challenge

Create a responsive photo gallery using CSS Grid that adapts to different screen sizes.

## Requirements:
1. Use CSS Grid to create a 3-column layout on desktop
2. On tablet (768px and below), show 2 columns
3. On mobile (480px and below), show 1 column
4. Each photo should maintain aspect ratio
5. Add a subtle hover effect on images
6. Ensure proper gap between grid items

## Tips:
- Use \`grid-template-columns\` with \`repeat()\` and \`minmax()\`
- Consider using \`grid-auto-rows\` for consistent row heights
- Media queries will help with responsiveness
- \`object-fit: cover\` is useful for images
  `,
  starterCode: {
    html: `<div class="gallery">
  <img src="https://picsum.photos/300/200?random=1" alt="Photo 1">
  <img src="https://picsum.photos/300/200?random=2" alt="Photo 2">
  <img src="https://picsum.photos/300/200?random=3" alt="Photo 3">
  <img src="https://picsum.photos/300/200?random=4" alt="Photo 4">
  <img src="https://picsum.photos/300/200?random=5" alt="Photo 5">
  <img src="https://picsum.photos/300/200?random=6" alt="Photo 6">
</div>`,
    css: `.gallery {
  /* Add your CSS Grid code here */
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Add responsive styles here */`,
    js: `// JavaScript is optional for this challenge
// You can add interactive features if desired`,
  },
  expectedOutput:
    "A responsive grid gallery that shows 3 columns on desktop, 2 on tablet, and 1 on mobile with proper spacing and hover effects.",
  testCases: [
    {
      input: "Desktop viewport (1200px)",
      expected: "3 columns displayed",
      description: "Gallery should show 3 columns on desktop screens",
    },
    {
      input: "Tablet viewport (768px)",
      expected: "2 columns displayed",
      description: "Gallery should show 2 columns on tablet screens",
    },
    {
      input: "Mobile viewport (480px)",
      expected: "1 column displayed",
      description: "Gallery should show 1 column on mobile screens",
    },
  ],
  hints: [
    "Use CSS Grid's repeat() function for responsive columns",
    "Media queries help adjust grid columns for different screen sizes",
    "Consider using grid-gap or gap for spacing between items",
    "object-fit: cover ensures images maintain aspect ratio",
  ],
  solution: {
    html: `<div class="gallery">
  <img src="https://picsum.photos/300/200?random=1" alt="Photo 1">
  <img src="https://picsum.photos/300/200?random=2" alt="Photo 2">
  <img src="https://picsum.photos/300/200?random=3" alt="Photo 3">
  <img src="https://picsum.photos/300/200?random=4" alt="Photo 4">
  <img src="https://picsum.photos/300/200?random=5" alt="Photo 5">
  <img src="https://picsum.photos/300/200?random=6" alt="Photo 6">
</div>`,
    css: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.gallery img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
    padding: 16px;
  }
}`,
    js: `// Optional: Add image loading animation
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.gallery img');
  images.forEach((img, index) => {
    img.style.opacity = '0';
    img.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      img.style.opacity = '1';
      img.style.transform = 'translateY(0)';
    }, index * 100);
  });
});`,
    explanation:
      "This solution uses CSS Grid with responsive breakpoints to create a flexible photo gallery that adapts to different screen sizes.",
  },
};

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.challengeId as string;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState({
    html: "",
    css: "",
    js: "",
  });
  const [activeTab, setActiveTab] = useState("instructions");
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    async function loadChallenge() {
      try {
        const response = await fetch(`/api/challenges/${challengeId}`);
        if (!response.ok) {
          throw new Error("Challenge not found");
        }
        const challengeData = await response.json();
        setChallenge(challengeData);
        setCode({
          html: challengeData.starterCode.html,
          css: challengeData.starterCode.css,
          js: challengeData.starterCode.js,
        });
      } catch (error) {
        console.error("Failed to load challenge:", error);
      }
    }

    if (challengeId) {
      loadChallenge();
    }
  }, [challengeId]);

  useEffect(() => {
    // Timer for tracking time spent
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
    }, 1000);
  };

  const handleReset = () => {
    if (challenge) {
      setCode({
        html: challenge.starterCode.html,
        css: challenge.starterCode.css,
        js: challenge.starterCode.js,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          timeSpent: formatTime(timeSpent),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Submission result:", result);
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Failed to submit challenge:", error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300";
      case "Intermediate":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
      case "Advanced":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300";
      case "Expert":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading challenge...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/challenges">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Challenges
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={getDifficultyColor(challenge.difficulty)}>
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline">
                <Code2 className="w-3 h-3 mr-1" />
                {challenge.category}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {challenge.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">Time Spent</div>
              <div className="font-mono text-lg text-gray-900 dark:text-white">
                <Timer className="w-4 h-4 inline mr-1" />
                {formatTime(timeSpent)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Points</div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                <Trophy className="w-4 h-4 inline mr-1" />
                {challenge.points}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Instructions and Code */}
          <div className="space-y-6">
            {/* Challenge Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Challenge Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {challenge.description}
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {challenge.timeEstimate}
                    </div>
                    <div className="text-xs text-gray-500">Est. Time</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {challenge.participants.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Participants</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {challenge.completionRate}%
                    </div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Instructions, Hints, Tests */}
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="instructions">
                    <FileText className="w-4 h-4 mr-2" />
                    Instructions
                  </TabsTrigger>
                  <TabsTrigger value="hints">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Hints
                  </TabsTrigger>
                  <TabsTrigger value="tests">
                    <TestTube className="w-4 h-4 mr-2" />
                    Tests
                  </TabsTrigger>
                  <TabsTrigger value="solution" disabled={!showSolution}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Solution
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="instructions" className="p-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: challenge.instructions.replace(/\n/g, "<br>"),
                      }}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="hints" className="p-6">
                  <div className="space-y-3">
                    {challenge.hints.map((hint, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                      >
                        <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {hint}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tests" className="p-6">
                  <div className="space-y-4">
                    {challenge.testCases.map((test, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Test {index + 1}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {test.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-gray-700 dark:text-gray-300">
                              Input:
                            </div>
                            <code className="text-blue-600 dark:text-blue-400">
                              {test.input}
                            </code>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700 dark:text-gray-300">
                              Expected:
                            </div>
                            <code className="text-emerald-600 dark:text-emerald-400">
                              {test.expected}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="solution" className="p-6">
                  {challenge.solution && (
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        {challenge.solution.explanation}
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">HTML:</h4>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
                            <code>{challenge.solution.html}</code>
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">CSS:</h4>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
                            <code>{challenge.solution.css}</code>
                          </pre>
                        </div>
                        {challenge.solution.js && (
                          <div>
                            <h4 className="font-medium mb-2">JavaScript:</h4>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
                              <code>{challenge.solution.js}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Panel - Code Editor and Preview */}
          <div className="space-y-6">
            {/* Code Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Code Editor
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleRunCode}
                      disabled={isRunning}
                    >
                      {isRunning ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Run Code
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="html">
                  <TabsList className="grid grid-cols-3 w-full mb-4">
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="js">JavaScript</TabsTrigger>
                  </TabsList>

                  <TabsContent value="html">
                    <textarea
                      value={code.html}
                      onChange={(e) =>
                        setCode((prev) => ({ ...prev, html: e.target.value }))
                      }
                      className="w-full h-64 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your HTML code here..."
                    />
                  </TabsContent>

                  <TabsContent value="css">
                    <textarea
                      value={code.css}
                      onChange={(e) =>
                        setCode((prev) => ({ ...prev, css: e.target.value }))
                      }
                      className="w-full h-64 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your CSS code here..."
                    />
                  </TabsContent>

                  <TabsContent value="js">
                    <textarea
                      value={code.js}
                      onChange={(e) =>
                        setCode((prev) => ({ ...prev, js: e.target.value }))
                      }
                      className="w-full h-64 p-3 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your JavaScript code here..."
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg h-64 bg-white">
                  <iframe
                    title="Preview"
                    className="w-full h-full rounded-lg"
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <style>${code.css}</style>
                        </head>
                        <body>
                          ${code.html}
                          <script>${code.js}</script>
                        </body>
                      </html>
                    `}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submission */}
            <Card>
              <CardContent className="pt-6">
                {!isCompleted ? (
                  <div className="space-y-4">
                    <Button className="w-full" size="lg" onClick={handleSubmit}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Solution
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowSolution(true)}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      View Solution
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <Award className="w-16 h-16 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      Challenge Completed!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      You earned {challenge.points} points in{" "}
                      {formatTime(timeSpent)}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link href="/challenges">
                        <Button variant="outline">More Challenges</Button>
                      </Link>
                      <Button>
                        <Share className="w-4 h-4 mr-2" />
                        Share Solution
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
