"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Medal,
  Crown,
  Star,
  Target,
  Calendar,
  Users,
  TrendingUp,
  Flame,
  Award,
  Zap,
  Code2,
} from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  points: number;
  challengesCompleted: number;
  streak: number;
  rank: number;
  badge: string;
  country: string;
  joinedDate: string;
}

const mockUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "@sarahcode",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    points: 4250,
    challengesCompleted: 45,
    streak: 12,
    rank: 1,
    badge: "Master",
    country: "US",
    joinedDate: "2024-01",
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    username: "@alexdev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    points: 3890,
    challengesCompleted: 42,
    streak: 8,
    rank: 2,
    badge: "Expert",
    country: "CA",
    joinedDate: "2024-02",
  },
  {
    id: "3",
    name: "Emma Thompson",
    username: "@emmacodes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    points: 3654,
    challengesCompleted: 38,
    streak: 15,
    rank: 3,
    badge: "Expert",
    country: "UK",
    joinedDate: "2024-01",
  },
  {
    id: "4",
    name: "David Kim",
    username: "@davidk",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    points: 3421,
    challengesCompleted: 36,
    streak: 5,
    rank: 4,
    badge: "Advanced",
    country: "KR",
    joinedDate: "2024-03",
  },
  {
    id: "5",
    name: "Maria Garcia",
    username: "@mariacodes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    points: 3198,
    challengesCompleted: 34,
    streak: 9,
    rank: 5,
    badge: "Advanced",
    country: "ES",
    joinedDate: "2024-02",
  },
];

// Generate more users for demonstration
const generateMoreUsers = (
  startRank: number,
  count: number
): LeaderboardUser[] => {
  const names = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Lisa Wang",
    "Tom Brown",
    "Anna Lee",
    "Chris Wilson",
    "Nina Patel",
  ];
  const countries = ["US", "CA", "UK", "DE", "FR", "AU", "IN", "JP"];
  const badges = ["Advanced", "Intermediate", "Beginner"];

  return Array.from({ length: count }, (_, i) => ({
    id: `${startRank + i}`,
    name: names[i % names.length],
    username: `@user${startRank + i}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${
      startRank + i
    }`,
    points: Math.floor(Math.random() * 2000) + 1000,
    challengesCompleted: Math.floor(Math.random() * 30) + 10,
    streak: Math.floor(Math.random() * 10) + 1,
    rank: startRank + i,
    badge: badges[Math.floor(Math.random() * badges.length)],
    country: countries[i % countries.length],
    joinedDate: "2024-03",
  }));
};

const allUsers = [...mockUsers, ...generateMoreUsers(6, 15)];

export default function LeaderboardPage() {
  const [timeFrame, setTimeFrame] = useState<"weekly" | "monthly" | "allTime">(
    "allTime"
  );
  const [category, setCategory] = useState<
    "overall" | "javascript" | "css" | "html"
  >("overall");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">
            #{rank}
          </span>
        );
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Master":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300";
      case "Expert":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
      case "Advanced":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300";
      case "Intermediate":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300";
      case "Beginner":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const topThree = allUsers.slice(0, 3);
  const restOfUsers = allUsers.slice(3);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Top Coding
            <span className="block text-yellow-600 dark:text-yellow-400">
              Champions
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            See where you stand among the community's best developers. Complete
            challenges, earn points, and climb your way to the top!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <Tabs
            value={timeFrame}
            onValueChange={(value) => setTimeFrame(value as any)}
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="weekly">
                <Calendar className="w-4 h-4 mr-2" />
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly">
                <Calendar className="w-4 h-4 mr-2" />
                Monthly
              </TabsTrigger>
              <TabsTrigger value="allTime">
                <Star className="w-4 h-4 mr-2" />
                All Time
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap justify-center gap-2">
            {["overall", "javascript", "css", "html"].map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat as any)}
                className="capitalize"
              >
                {cat === "overall" ? (
                  <TrendingUp className="w-4 h-4 mr-2" />
                ) : (
                  <Code2 className="w-4 h-4 mr-2" />
                )}
                {cat === "overall" ? "Overall" : cat.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            🏆 Top 3 Champions
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="order-1 md:order-1">
              <Card className="relative border-2 border-gray-300 dark:border-gray-600 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gray-400 text-white">2nd</Badge>
                </div>
                <CardContent className="pt-8 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-gray-300">
                    <AvatarImage src={topThree[1]?.avatar} />
                    <AvatarFallback>
                      {topThree[1]?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">
                    {topThree[1]?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {topThree[1]?.username}
                  </p>
                  <div className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">
                    {topThree[1]?.points.toLocaleString()} pts
                  </div>
                  <Badge className={getBadgeColor(topThree[1]?.badge || "")}>
                    {topThree[1]?.badge}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* 1st Place */}
            <div className="order-2 md:order-2 scale-105">
              <Card className="relative border-2 border-yellow-400 dark:border-yellow-500 bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-white">👑 1st</Badge>
                </div>
                <CardContent className="pt-8 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-yellow-400">
                    <AvatarImage src={topThree[0]?.avatar} />
                    <AvatarFallback>
                      {topThree[0]?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-xl mb-1">
                    {topThree[0]?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {topThree[0]?.username}
                  </p>
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    {topThree[0]?.points.toLocaleString()} pts
                  </div>
                  <Badge className={getBadgeColor(topThree[0]?.badge || "")}>
                    {topThree[0]?.badge}
                  </Badge>
                  <div className="flex justify-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{topThree[0]?.streak} day streak</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3rd Place */}
            <div className="order-3 md:order-3">
              <Card className="relative border-2 border-amber-600 dark:border-amber-500 bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-amber-600 text-white">3rd</Badge>
                </div>
                <CardContent className="pt-8 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-amber-600">
                    <AvatarImage src={topThree[2]?.avatar} />
                    <AvatarFallback>
                      {topThree[2]?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">
                    {topThree[2]?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {topThree[2]?.username}
                  </p>
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                    {topThree[2]?.points.toLocaleString()} pts
                  </div>
                  <Badge className={getBadgeColor(topThree[2]?.badge || "")}>
                    {topThree[2]?.badge}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Full Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {restOfUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar and Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.username}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {user.challengesCompleted}
                      </div>
                      <div className="text-gray-500">Challenges</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {user.streak}
                      </div>
                      <div className="text-gray-500">Streak</div>
                    </div>
                  </div>

                  {/* Badge and Points */}
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {user.points.toLocaleString()} pts
                    </div>
                    <Badge className={getBadgeColor(user.badge)}>
                      {user.badge}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Users
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12">
          <Trophy className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Climb the Ranks?
          </h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Start completing challenges today and see your name on the
            leaderboard. Every solved challenge brings you closer to the top!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Challenges
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              <Award className="w-4 h-4 mr-2" />
              View My Profile
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
