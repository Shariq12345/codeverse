import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/sections/footer";

const geistSans = GeistSans;

export const metadata: Metadata = {
  title: "CodeVerse – Learn, Practice & Master Coding",
  description:
    "Interactive docs, guided roadmaps, challenges, adaptive quizzes & projects – one platform to become a better developer.",
  metadataBase: new URL("https://codeverse.local"),
  openGraph: {
    title: "CodeVerse – Learn, Practice & Master Coding",
    description:
      "Interactive docs, guided roadmaps, challenges, adaptive quizzes & projects – one platform to become a better developer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeVerse – Learn, Practice & Master Coding",
    description:
      "Interactive docs, guided roadmaps, challenges, adaptive quizzes & projects – one platform to become a better developer.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased min-h-dvh bg-background text-foreground flex flex-col`}
      >
        <SiteNav />
        <div className="flex-1 flex flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
