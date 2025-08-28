"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, Users, Clock } from "lucide-react";
import { Tutorial } from "@/lib/markdown";

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTutorials() {
      try {
        const response = await fetch("/api/tutorials");
        const data = await response.json();
        setTutorials(data);
      } catch (error) {
        console.error("Failed to load tutorials:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTutorials();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-32 pb-20 sm:pt-36 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">Loading tutorials...</div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-32 pb-20 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Interactive Tutorials
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
            Learn to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Code
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Learn to code with interactive tutorials that guide you through
            real-world projects and coding challenges
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>10,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Learn at your pace</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Interactive Examples</span>
            </div>
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`}>
              <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 hover:border-purple-200 dark:hover:border-purple-700 bg-gradient-to-br from-background via-background to-muted/30 h-full">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tutorial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-4xl">{tutorial.icon}</div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Free
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {tutorial.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {tutorial.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      What you&apos;ll learn:
                    </div>
                    <div className="space-y-1">
                      {tutorial.sections.slice(0, 2).map((section) => (
                        <div
                          key={section.id}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          {section.title}
                        </div>
                      ))}
                      {tutorial.sections.length > 2 && (
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          +{tutorial.sections.length - 2} more sections
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="text-sm text-muted-foreground">
                      {tutorial.sections.reduce(
                        (total, section) => total + section.lessons.length,
                        0
                      )}{" "}
                      lessons
                    </div>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all duration-300">
                      <span className="text-sm font-medium">
                        Start Learning
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">
            More Languages Coming Soon
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {["PHP", "Python", "React", "Node.js"].map((lang) => (
              <Card key={lang} className="p-4 opacity-60">
                <div className="text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-medium">{lang}</div>
                  <div className="text-xs text-muted-foreground">
                    Coming Soon
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
