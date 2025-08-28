"use client";
import { ROADMAPS } from "@/components/roadmaps/simple-data";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

function getProgress(slug: string, nodes: any[]) {
  if (typeof window === "undefined") return 0;
  const saved = localStorage.getItem(`roadmap-${slug}`);
  if (!saved) return 0;
  const progress = JSON.parse(saved);
  interface RoadmapNode {
    id: string;
    children?: RoadmapNode[];
    [key: string]: any;
  }

  interface ProgressMap {
    [id: string]: boolean;
  }

  const allNodes: RoadmapNode[] = [];
  function traverse(nodeList: any[]) {
    nodeList.forEach((node) => {
      allNodes.push(node);
      if (node.children) traverse(node.children);
    });
  }
  traverse(nodes);
  const completed = allNodes.filter((n) => progress[n.id]).length;
  return Math.round((completed / allNodes.length) * 100);
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const u = localStorage.getItem("cv-user");
      if (u) setUser(JSON.parse(u));
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-32 pb-20 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {user ? `Welcome, ${user.name}!` : "Your Learning Dashboard"}
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your progress, celebrate achievements, and discover your next
            steps.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ROADMAPS.map((roadmap) => (
            <Link key={roadmap.slug} href={`/roadmaps/${roadmap.slug}`}>
              <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 hover:border-purple-200 dark:hover:border-purple-700 bg-gradient-to-br from-background via-background to-muted/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {roadmap.title}
                    </CardTitle>
                    {getProgress(roadmap.slug, roadmap.nodes) === 100 && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 animate-pulse"
                      >
                        <Trophy className="w-3 h-3 mr-1" /> Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors duration-300">
                    {roadmap.short}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress
                    value={getProgress(roadmap.slug, roadmap.nodes)}
                    className="h-2"
                  />
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted-foreground">
                      {getProgress(roadmap.slug, roadmap.nodes)}% complete
                    </span>
                    {getProgress(roadmap.slug, roadmap.nodes) === 100 ? (
                      <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Mastered!
                      </span>
                    ) : (
                      <span className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
                        Continue <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
