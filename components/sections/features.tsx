import {
  Code2,
  Compass,
  Trophy,
  Award,
  ListCheck,
  FlaskConical,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Compass className="size-6" />,
    title: "Guided Roadmaps",
    text: "Structured paths with prerequisites, milestones and progression insights.",
  },
  {
    icon: <Code2 className="size-6" />,
    title: "Real Coding Challenges",
    text: "From warm-ups to system design prep – auto evaluated in a secure sandbox.",
  },
  {
    icon: <ListCheck className="size-6" />,
    title: "Adaptive Quizzes",
    text: "Smart question routing highlights strengths & knowledge gaps.",
  },
  {
    icon: <FlaskConical className="size-6" />,
    title: "Interactive Docs",
    text: "MDX based content with inline playgrounds & micro-assessments.",
  },
  {
    icon: <Trophy className="size-6" />,
    title: "Gamified Progress",
    text: "XP, streaks, achievements & skill graphs keep motivation high.",
  },
  {
    icon: <Award className="size-6" />,
    title: "Project Certifications",
    text: "Apply skills to real projects & earn shareable completion badges.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative border-t bg-gradient-to-b from-background to-background/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Built For Deep Learning & Lasting Skill
          </h2>
          <p className="mt-4 text-muted-foreground text-balance">
            Stop jumping between resources. CodeVerse unifies everything you
            need to go from zero to production‑ready engineer.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="relative flex flex-col rounded-xl border bg-card/60 p-6 backdrop-blur-sm transition-colors hover:bg-card/80"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
