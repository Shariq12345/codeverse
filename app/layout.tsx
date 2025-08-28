import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/sections/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-background text-foreground flex flex-col`}
      >
        <SiteNav />
        <div className="flex-1 flex flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
