import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { CallToActionSection } from "@/components/sections/cta";
import { ROADMAPS } from "@/components/roadmaps/simple-data";
import { RoadmapCard } from "@/components/roadmaps/roadmap-card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <section
          id="roadmaps"
          className="border-t py-24 sm:py-32 bg-background"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Roadmaps
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Structured learning paths from fundamentals to fluency. Choose
                  your journey & track progress visually.
                </p>
              </div>
              <Link
                href="/roadmaps"
                className="text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                View all →
              </Link>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ROADMAPS.slice(0, 8).map((r) => (
                <RoadmapCard key={r.slug} roadmap={r} />
              ))}
            </div>
          </div>
        </section>
        <section
          id="challenges"
          className="border-t py-24 sm:py-32 bg-gradient-to-b from-background to-background/60"
        >
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Challenges & Playground (Coming Soon)
              </h2>
              <p className="mt-4 text-muted-foreground">
                Practice with real-time evaluation, performance insights &
                community benchmarks. Front-end, back-end, algorithmic and
                project-based tasks.
              </p>
            </div>
          </div>
        </section>
        <CallToActionSection />
      </main>
    </>
  );
}
