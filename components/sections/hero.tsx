import { Button } from "@/components/ui/button";
import { Sparkle, Rocket, BookOpen, Target } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-28 md:pt-40 md:pb-40">
      <BackgroundDecor />
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-xs font-medium tracking-wide shadow-sm backdrop-blur">
            <Sparkle className="size-3.5 text-primary" />
            <span>Early Preview • Building the future of learning</span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Master <span className="text-primary">Coding</span> Through
            <br className="hidden sm:block" /> Interactive Learning
          </h1>
          <p className="mt-6 max-w-xl text-base/7 sm:text-lg/8 text-muted-foreground">
            CodeVerse unifies docs, guided roadmaps, real challenges, adaptive
            quizzes and hands‑on projects into one seamless learning journey.
            Progress from fundamentals to advanced topics with clarity and
            confidence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base backdrop-blur"
            >
              View Roadmaps
            </Button>
          </div>
          <ul className="mt-10 grid max-w-xl grid-cols-2 gap-5 text-sm text-foreground/80 sm:grid-cols-4">
            {[
              { icon: <BookOpen className="size-4" />, label: "Curated Docs" },
              {
                icon: <Target className="size-4" />,
                label: "Adaptive Quizzes",
              },
              { icon: <Rocket className="size-4" />, label: "Real Challenges" },
              { icon: <Sparkle className="size-4" />, label: "Projects" },
            ].map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-2 rounded-md border bg-background/60 px-3 py-2 backdrop-blur-sm"
              >
                {f.icon}
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-primary/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-muted blur-3xl dark:bg-muted/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-border)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.35]" />
    </div>
  );
}
