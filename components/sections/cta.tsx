import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
      <div className="mx-auto max-w-5xl px-4 md:px-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Start Your Journey Today
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join early and help shape the platform. Your feedback directly guides
          upcoming features & curricula.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="h-12 px-8 text-base shadow-md">
            Create Free Account
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base">
            Explore Roadmaps
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          No credit card required • Free tier includes core roadmap & challenges
        </p>
      </div>
    </section>
  );
}
