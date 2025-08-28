import Link from "next/link";
import { RoadmapMeta } from "./types";

export function RoadmapCard({ roadmap }: { roadmap: RoadmapMeta }) {
  return (
    <Link
      href={`/roadmaps/${roadmap.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card/60 p-5 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/40"
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${roadmap.theme} opacity-70 transition-opacity group-hover:opacity-100`}
      />
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold tracking-tight">
          {roadmap.title}
        </h3>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {roadmap.difficulty}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
        {roadmap.short}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {roadmap.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary ring-1 ring-primary/20"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-[11px] text-muted-foreground/80">
        <span>{roadmap.estMonths} mo est.</span>
        <span className="opacity-0 transition-opacity group-hover:opacity-100">
          View →
        </span>
      </div>
    </Link>
  );
}
