import { notFound } from "next/navigation";
import { getRoadmap, ROADMAPS } from "@/components/roadmaps/simple-data";
import { SimpleRoadmap } from "@/components/roadmaps/simple-roadmap";

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
