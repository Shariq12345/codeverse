"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Trophy,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  Code2,
  Zap,
  Target,
  Flame,
  Award,
  TrendingUp,
  ChevronRight,
  Calendar,
  Brain,
  Puzzle,
} from "lucide-react";

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
  isNew?: boolean;
  isTrending?: boolean;
  isDaily?: boolean;
}

const mockChallenges: Challenge[] = [
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
  },
];

const categories = [
  "All",
  "JavaScript",
  "CSS",
  "React",
  "HTML",
  "UI/UX",
  "Algorithms",
];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChallenges() {
      try {
        const response = await fetch("/api/challenges");
        const data = await response.json();
        setChallenges(data);
        setFilteredChallenges(data);
      } catch (error) {
        console.error("Failed to load challenges:", error);
      } finally {
        setLoading(false);
      }
    }

    loadChallenges();
  }, []);

  useEffect(() => {
    let filtered = challenges;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (challenge) => challenge.category === selectedCategory
      );
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (challenge) => challenge.difficulty === selectedDifficulty
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          challenge.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          challenge.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredChallenges(filtered);
  }, [selectedCategory, selectedDifficulty, searchQuery, challenges]);

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "JavaScript":
        return <Code2 className="w-4 h-4" />;
      case "CSS":
        return <Puzzle className="w-4 h-4" />;
      case "React":
        return <Zap className="w-4 h-4" />;
      case "UI/UX":
        return <Target className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading challenges...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Coding Challenges
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Level Up Your
            <span className="block text-purple-600 dark:text-purple-400">
              Coding Skills
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Practice coding with real-world challenges. Earn points, compete
            with others, and showcase your skills to potential employers.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                50+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Active Challenges
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                15K+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Participants
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                1M+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Solutions Submitted
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Available
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category !== "All" && getCategoryIcon(category)}
                    <span className={category !== "All" ? "ml-1" : ""}>
                      {category}
                    </span>
                  </Button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={
                      selectedDifficulty === difficulty ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className="text-xs"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Showing {filteredChallenges.length} of {challenges.length}{" "}
            challenges
          </div>
        </div>

        {/* Featured Daily Challenge */}
        {filteredChallenges.some((c) => c.isDaily) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Daily Challenge
            </h2>
            {filteredChallenges
              .filter((challenge) => challenge.isDaily)
              .slice(0, 1)
              .map((challenge) => (
                <Card
                  key={challenge.id}
                  className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20"
                >
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={getDifficultyColor(challenge.difficulty)}
                          >
                            {challenge.difficulty}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300"
                          >
                            <Flame className="w-3 h-3 mr-1" />
                            Daily
                          </Badge>
                          {challenge.isNew && (
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                              New
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mb-2">
                          {challenge.title}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-400">
                          {challenge.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {challenge.points}
                          </div>
                          <div className="text-xs text-gray-500">Points</div>
                        </div>
                        <Link href={`/challenges/${challenge.id}`}>
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            Start Challenge
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        )}

        {/* Challenges Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChallenges
            .filter((challenge) => !challenge.isDaily)
            .map((challenge) => (
              <Card
                key={challenge.id}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(challenge.category)}
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {challenge.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {challenge.isTrending && (
                        <Badge
                          variant="outline"
                          className="border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-300"
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      {challenge.isNew && (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardTitle className="text-lg mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {challenge.title}
                  </CardTitle>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {challenge.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {challenge.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {challenge.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{challenge.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {challenge.points}
                        </div>
                        <div className="text-xs text-gray-500">Points</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {challenge.timeEstimate}
                        </div>
                        <div className="text-xs text-gray-500">Est. Time</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {challenge.completionRate}%
                        </div>
                        <div className="text-xs text-gray-500">
                          Success Rate
                        </div>
                      </div>
                    </div>

                    {/* Difficulty and Participants */}
                    <div className="flex items-center justify-between">
                      <Badge
                        className={getDifficultyColor(challenge.difficulty)}
                      >
                        {challenge.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        {challenge.participants.toLocaleString()}
                      </div>
                    </div>

                    <Link href={`/challenges/${challenge.id}`}>
                      <Button className="w-full group">
                        Start Challenge
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12">
          <Award className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Challenge Yourself?
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community of developers, solve challenges, earn points, and
            showcase your skills. Every challenge you complete makes you a
            better developer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              View Leaderboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
