"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#features", label: "Features" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/challenges", label: "Challenges" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-all border-b",
        scrolled ? "border-border/60" : "border-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 md:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
        >
          CodeVerse
        </Link>
        <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-accent/60 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/signin">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="shadow-sm shadow-primary/30">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
