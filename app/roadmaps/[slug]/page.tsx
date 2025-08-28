import { notFound } from "next/navigation";
import Link from "next/link";
import { getRoadmap, ROADMAPS } from "@/components/roadmaps/simple-data";
import { SimpleRoadmap } from "@/components/roadmaps/simple-roadmap";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ROADMAPS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const roadmap = getRoadmap(slug);
  if (!roadmap) return {};
  return {
    title: `${roadmap.title} Roadmap | CodeVerse`,
    description: roadmap.short,
  };
}

export default async function RoadmapDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const roadmap = getRoadmap(slug);
  if (!roadmap) return notFound();

  return (
    <main className="pt-32 pb-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <Link
            href="/roadmaps"
            className="hover:text-foreground transition-colors"
          >
            Roadmaps
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{roadmap.title}</span>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/roadmaps">
            <Button variant="ghost" className="gap-2 px-3">
              <ChevronLeft className="w-4 h-4" />
              Back to Roadmaps
            </Button>
          </Link>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1 text-xs font-medium tracking-wide ring-1 ring-border/50">
            <span className="capitalize">{roadmap.difficulty}</span>
            <span className="h-3 w-px bg-border/60" />
            <span>{roadmap.estMonths} mo est.</span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {roadmap.title} Roadmap
          </h1>
          <p className="mt-4 text-muted-foreground">{roadmap.short}</p>
        </div>
        <div className="mt-12">
          <SimpleRoadmap nodes={roadmap.nodes} roadmapSlug={slug} />
        </div>
      </div>
    </main>
  );
}
