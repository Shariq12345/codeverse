import { ROADMAPS } from "@/components/roadmaps/simple-data";
import { RoadmapCard } from "@/components/roadmaps/roadmap-card";

export const metadata = {
  title: "Roadmaps | CodeVerse",
  description:
    "Structured learning paths for frontend, backend, full-stack, devops, AI, data and more.",
};

export default function RoadmapsPage() {
  return (
    <main className="pt-32 pb-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Roadmaps
          </h1>
          <p className="mt-4 text-muted-foreground">
            Curated skill graphs guiding you from fundamentals to professional
            proficiency. Select a path to dive deeper.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ROADMAPS.map((r) => (
            <RoadmapCard key={r.slug} roadmap={r} />
          ))}
        </div>
      </div>
    </main>
  );
}
