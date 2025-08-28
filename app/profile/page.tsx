"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Target,
  Calendar,
  Clock,
  Code2,
  Star,
  Flame,
  Award,
  TrendingUp,
  CheckCircle,
  Settings,
  Share,
  Medal,
  Zap,
  Brain,
  Users,
  BarChart3,
} from "lucide-react";

interface UserStats {
  totalPoints: number;
  rank: number;
  challengesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalUsers: number;
  weeklyPoints: number;
  monthlyPoints: number;
  averageTime: string;
  successRate: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlockedAt: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface CompletedChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  completedAt: string;
  timeSpent: string;
  rank: number;
}

const mockUserStats: UserStats = {
  totalPoints: 3421,
  rank: 4,
  challengesCompleted: 36,
  currentStreak: 5,
  longestStreak: 12,
  totalUsers: 15847,
  weeklyPoints: 425,
  monthlyPoints: 1650,
  averageTime: "42m",
  successRate: 78,
};

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first challenge",
    icon: <Target className="w-6 h-6" />,
    unlockedAt: "2024-08-15",
    rarity: "common",
  },
  {
    id: "2",
    title: "Speed Demon",
    description: "Complete a challenge in under 15 minutes",
    icon: <Zap className="w-6 h-6" />,
    unlockedAt: "2024-08-18",
    rarity: "rare",
  },
  {
    id: "3",
    title: "CSS Master",
    description: "Complete 10 CSS challenges",
    icon: <Code2 className="w-6 h-6" />,
    unlockedAt: "2024-08-22",
    rarity: "epic",
  },
  {
    id: "4",
    title: "Streak Keeper",
    description: "Maintain a 7-day solving streak",
    icon: <Flame className="w-6 h-6" />,
    unlockedAt: "2024-08-25",
    rarity: "rare",
  },
];

const mockRecentChallenges: CompletedChallenge[] = [
  {
    id: "1",
    title: "CSS Grid Mastery",
    category: "CSS",
    difficulty: "Intermediate",
    points: 150,
    completedAt: "2024-08-25",
    timeSpent: "42m",
    rank: 1247,
  },
  {
    id: "2",
    title: "JavaScript Array Methods",
    category: "JavaScript",
    difficulty: "Advanced",
    points: 250,
    completedAt: "2024-08-24",
    timeSpent: "68m",
    rank: 892,
  },
  {
    id: "3",
    title: "Responsive Design Challenge",
    category: "CSS",
    difficulty: "Intermediate",
    points: 175,
    completedAt: "2024-08-23",
    timeSpent: "55m",
    rank: 634,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
      case "rare":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
      case "epic":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300";
      case "legendary":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
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

  const getNextRankPoints = () => {
    const rankThresholds = [0, 1000, 2500, 5000, 10000, 20000];
    const currentRankIndex = rankThresholds.findIndex(
      (threshold) => mockUserStats.totalPoints < threshold
    );
    return currentRankIndex === -1 ? null : rankThresholds[currentRankIndex];
  };

  const nextRankPoints = getNextRankPoints();
  const progressToNext = nextRankPoints
    ? ((mockUserStats.totalPoints % 1000) / 1000) * 100
    : 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Profile Header */}
        <div className="mb-12">
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <Avatar className="w-24 h-24 ring-4 ring-blue-200 dark:ring-blue-800">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    John Developer
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    @johndeveloper
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        #{mockUserStats.rank}
                      </div>
                      <div className="text-sm text-gray-500">Global Rank</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {mockUserStats.totalPoints.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {mockUserStats.challengesCompleted}
                      </div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1">
                        <Flame className="w-6 h-6" />
                        {mockUserStats.currentStreak}
                      </div>
                      <div className="text-sm text-gray-500">Day Streak</div>
                    </div>
                  </div>

                  {/* Progress to Next Rank */}
                  {nextRankPoints && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          Progress to next rank
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {mockUserStats.totalPoints} / {nextRankPoints} points
                        </span>
                      </div>
                      <Progress value={progressToNext} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                      <Award className="w-4 h-4 mr-1" />
                      Advanced Developer
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {mockUserStats.successRate}% Success Rate
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="challenges">
              <Code2 className="w-4 h-4 mr-2" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="stats">
              <TrendingUp className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {mockUserStats.weeklyPoints}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Points earned
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weekly Goal</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    Average Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {mockUserStats.averageTime}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Per challenge
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      12% faster than last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="w-5 h-5 text-purple-500" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {mockUserStats.successRate}%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    First attempt success
                  </p>
                  <div className="mt-4">
                    <Progress
                      value={mockUserStats.successRate}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentChallenges.slice(0, 3).map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {challenge.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Badge
                            className={getDifficultyColor(challenge.difficulty)}
                            variant="secondary"
                          >
                            {challenge.difficulty}
                          </Badge>
                          <span>•</span>
                          <span>{challenge.category}</span>
                          <span>•</span>
                          <span>Completed in {challenge.timeSpent}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600 dark:text-purple-400">
                          +{challenge.points} pts
                        </div>
                        <div className="text-sm text-gray-500">
                          Rank #{challenge.rank}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                        achievement.rarity === "legendary"
                          ? "bg-yellow-100 dark:bg-yellow-900/20"
                          : achievement.rarity === "epic"
                          ? "bg-purple-100 dark:bg-purple-900/20"
                          : achievement.rarity === "rare"
                          ? "bg-blue-100 dark:bg-blue-900/20"
                          : "bg-gray-100 dark:bg-gray-900/20"
                      }`}
                    >
                      <div
                        className={`${
                          achievement.rarity === "legendary"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : achievement.rarity === "epic"
                            ? "text-purple-600 dark:text-purple-400"
                            : achievement.rarity === "rare"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {achievement.description}
                    </p>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity.charAt(0).toUpperCase() +
                        achievement.rarity.slice(1)}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-2">
                      Unlocked{" "}
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Locked Achievement */}
              <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 opacity-60">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <Medal className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-500">???</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Complete more challenges to unlock this achievement
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-500 dark:bg-gray-800"
                  >
                    Locked
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Completed Challenges ({mockRecentChallenges.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {challenge.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <Badge
                            className={getDifficultyColor(challenge.difficulty)}
                          >
                            {challenge.difficulty}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Code2 className="w-3 h-3" />
                            {challenge.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {challenge.timeSpent}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Rank #{challenge.rank}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600 dark:text-purple-400 text-lg">
                          +{challenge.points}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(challenge.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500">
                      Chart visualization would go here
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Category Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        category: "JavaScript",
                        completed: 15,
                        total: 20,
                        color: "bg-yellow-500",
                      },
                      {
                        category: "CSS",
                        completed: 12,
                        total: 15,
                        color: "bg-blue-500",
                      },
                      {
                        category: "HTML",
                        completed: 9,
                        total: 10,
                        color: "bg-orange-500",
                      },
                      {
                        category: "React",
                        completed: 5,
                        total: 12,
                        color: "bg-cyan-500",
                      },
                    ].map((cat) => (
                      <div key={cat.category}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">{cat.category}</span>
                          <span className="text-gray-500">
                            {cat.completed}/{cat.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${cat.color}`}
                            style={{
                              width: `${(cat.completed / cat.total) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Detailed Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {mockUserStats.longestStreak}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Longest Streak
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {mockUserStats.monthlyPoints}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This Month
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {Math.round(
                        (mockUserStats.rank / mockUserStats.totalUsers) * 100
                      )}
                      %
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Top Percentile
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      42
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Days Active
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
