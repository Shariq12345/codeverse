"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Trophy,
  Target,
  Clock,
  Calendar,
  Star,
  Award,
  BarChart3,
  Activity,
} from "lucide-react";

interface AnalyticsData {
  totalChallenges: number;
  totalUsers: number;
  totalSubmissions: number;
  averageCompletionTime: string;
  popularCategories: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  dailyActiveUsers: number;
  weeklyGrowth: number;
  completionRate: number;
}

const mockAnalytics: AnalyticsData = {
  totalChallenges: 50,
  totalUsers: 15847,
  totalSubmissions: 89432,
  averageCompletionTime: "38m",
  popularCategories: [
    { name: "JavaScript", count: 12450, percentage: 35 },
    { name: "CSS", count: 9876, percentage: 28 },
    { name: "HTML", count: 7234, percentage: 20 },
    { name: "React", count: 5872, percentage: 17 },
  ],
  dailyActiveUsers: 1247,
  weeklyGrowth: 12.5,
  completionRate: 73,
};

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalytics);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <Badge
          variant="secondary"
          className="mb-4 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
        >
          <Activity className="w-4 h-4 mr-2" />
          Platform Analytics
        </Badge>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Community Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          See how our coding community is growing and engaging with challenges.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.totalChallenges}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Active Challenges
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.totalUsers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Users
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.totalSubmissions.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Submissions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.averageCompletionTime}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg. Time
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Popular Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-gray-500">
                      {category.count.toLocaleString()} submissions
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Community Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {analytics.dailyActiveUsers.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Daily Active Users
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  +{analytics.weeklyGrowth}%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Weekly Growth
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {analytics.completionRate}%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Challenge Completion Rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Award className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                1,000th Challenge Completed!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our community just hit a major milestone
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                New Daily Challenge
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fresh challenges added daily
              </p>
            </div>

            <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <Users className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                15K+ Developers
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Growing community of coders
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
