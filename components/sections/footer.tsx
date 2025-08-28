import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "#features" },
      { label: "Roadmaps", href: "#roadmaps" },
      { label: "Challenges", href: "#challenges" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Docs", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Legal", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              CodeVerse
            </span>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              One unified platform to learn, practice and master programming
              through structured, interactive experiences.
            </p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wide uppercase/relaxed text-foreground/70">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground hover:underline underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs text-muted-foreground/80 md:flex-row">
          <p>© {new Date().getFullYear()} CodeVerse. All rights reserved.</p>
          <p className="text-[11px]">
            Built with Next.js & Tailwind — design system powered by shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
