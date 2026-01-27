"use client";

import Link from "next/link";
import { ArrowRight, Star, Github, Zap, Shield, Globe, Lock, Code2, Cpu, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tools, categories, ToolMetadata } from "@/config/tools";
import { ToolsSlider } from "@/components/home/ToolsSlider";
import { PremiumCard } from "@/components/common/PremiumCard";
import { LaunchShowcase } from "@/components/home/LaunchShowcase";
import { motion } from "framer-motion";

export default function Home() {
  // Categorize tools for the sliders (Human-First Rows)
  // Consolidating to 3 rows for a cleaner layout
  const row1Tools = tools.filter(t => ["text", "social", "media", "design"].includes(t.category));
  const row2Tools = tools.filter(t => ["developer", "security", "pdf"].includes(t.category));
  const row3Tools = tools.filter(t => ["math", "finance", "health", "general"].includes(t.category));

  // Featured tools (manually curated)
  const featuredToolSlugs = [
    "sign-pdf",
    "photo-enhancer",
    "watermark-remover",
    "instagram-post-generator",
    "invoice-generator",
    "qr-code-generator"
  ];
  const featuredTools = featuredToolSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter(Boolean) as ToolMetadata[];

  return (
    <div className="flex flex-col gap-16 md:gap-24 overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-24 pb-12 text-center space-y-8">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 relative z-10"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            v1.0 is now live!
          </div>

          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            Simple Tools for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-300%">
              Everyday Tasks
            </span>
          </h1>

          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl lg:text-2xl font-light leading-relaxed">
            Beautifully designed, secure tools that respect your privacy. <br className="hidden md:inline" />
            <span className="text-foreground font-medium">No uploads. No tracking. Just results.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link href="/tools">
              <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105">
                Explore All Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Multi-Row Tools Slider */}
        <div className="relative pt-16 space-y-6 w-full max-w-[100vw] overflow-hidden perspective-1000">

          {/* Fade Gradients for edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1: Creation & Media */}
          <div className="-rotate-1 origin-center hover:rotate-0 transition-transform duration-500 opacity-90 hover:opacity-100">
            <ToolsSlider tools={row1Tools} direction="right" duration={100} />
          </div>

          {/* Row 2: Dev & Security */}
          <div className="rotate-1 origin-center hover:rotate-0 transition-transform duration-500 opacity-100 scale-105">
            <ToolsSlider tools={row2Tools} direction="left" duration={80} />
          </div>

          {/* Row 3: Math & Life */}
          <div className="-rotate-1 origin-center hover:rotate-0 transition-transform duration-500 opacity-90 hover:opacity-100">
            <ToolsSlider tools={row3Tools} direction="right" duration={120} />
          </div>
        </div>
      </section>

      {/* Benefits Content */}
      <section className="container max-w-5xl mx-auto px-4 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Why OpenToolBox?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlike other tool sites that are riddle with ads and send your data to servers, we prioritize your experience and privacy.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/20 transition-colors">
            <div className="mx-auto w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Client-Side</h3>
            <p className="text-muted-foreground">Your data never leaves your browser. JSON, images, and code are processed locally.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/20 transition-colors">
            <div className="mx-auto w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Blazing Fast</h3>
            <p className="text-muted-foreground">Built on Next.js 15 for near-instant load times and seamless transitions.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/20 transition-colors">
            <div className="mx-auto w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">No tracking pixels. No cookies. We respect your privacy and your code.</p>
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="container max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured & New</h2>
            <p className="text-muted-foreground mt-2 text-lg">Hand-picked tools for your daily workflow.</p>
          </div>
          <Link href="/tools" className="hidden sm:flex items-center text-primary font-medium hover:underline group">
            View directory <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <PremiumCard
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              icon={tool.icon}
              title={tool.name}
              description={tool.description}
              isNew={tool.isNew}
              isPopular={tool.isPopular}
              isPremium={tool.isPremium}
            />
          ))}
        </div>

      </section>

      {/* Launch Showcase */}
      <LaunchShowcase />

      {/* Intent-Driven Hubs */}
      <section className="container max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-10 text-center">What do you want to do?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {/* Hub 1: Text & Writing */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-8 hover:border-primary/20 transition-all duration-500 liquid-shadow hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
                <Type className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Fix My Text</h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">Clean up messy lists, count words, or format your notes perfectly.</p>
              <ul className="space-y-3">
                {tools.filter(t => t.category === "text").slice(0, 4).map(t => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`} className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 group/link">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/link:bg-primary group-hover/link:scale-125 transition-all" />
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/tools#text" className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:underline group/btn">
                All Text Tools <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Hub 2: Photos & Images */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-8 hover:border-primary/20 transition-all duration-500 liquid-shadow hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4 text-blue-500">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Creative Studio</h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">Create viral memes, cinematic quote posts, and professional social assets instantly.</p>
              <ul className="space-y-3">
                {tools.filter(t => t.category === "design").slice(0, 4).map(t => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`} className="text-foreground/80 hover:text-blue-500 transition-colors flex items-center gap-2 group/link">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/link:bg-blue-500 group-hover/link:scale-125 transition-all" />
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/tools#design" className="mt-8 inline-flex items-center text-sm font-semibold text-blue-500 hover:underline group/btn">
                All Studio Tools <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Hub 3: Data & Privacy */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-8 hover:border-primary/20 transition-all duration-500 liquid-shadow hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-purple-500/10 p-4 text-purple-500">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Secure My Data</h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">Generate passwords, format code, and protect your digital life.</p>
              <ul className="space-y-3">
                {tools.filter(t => t.category === "security").slice(0, 4).map(t => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`} className="text-foreground/80 hover:text-purple-500 transition-colors flex items-center gap-2 group/link">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40 group-hover/link:bg-purple-500 group-hover/link:scale-125 transition-all" />
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/tools#security" className="mt-8 inline-flex items-center text-sm font-semibold text-purple-500 hover:underline group/btn">
                All Privacy Tools <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Hub 4: Math & Finance */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-8 hover:border-primary/20 transition-all duration-500 liquid-shadow hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-green-500/10 p-4 text-green-500">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Business Hub</h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">Generate professional invoices, quotes, receipts, and estimates for your clients.</p>
              <ul className="space-y-3">
                {tools.filter(t => t.category === "finance").slice(0, 4).map(t => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`} className="text-foreground/80 hover:text-green-500 transition-colors flex items-center gap-2 group/link">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 group-hover/link:bg-green-500 group-hover/link:scale-125 transition-all" />
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/tools#finance" className="mt-8 inline-flex items-center text-sm font-semibold text-green-500 hover:underline group/btn">
                All Money Tools <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Hub 5: Health & Productivity */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-8 hover:border-primary/20 transition-all duration-500 liquid-shadow hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-orange-500/10 p-4 text-orange-500">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Stay Productive</h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">Calculate your age, track focus, or check your health stats.</p>
              <ul className="space-y-3">
                {tools.filter(t => t.category === "general").slice(0, 4).map(t => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`} className="text-foreground/80 hover:text-orange-500 transition-colors flex items-center gap-2 group/link">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40 group-hover/link:bg-orange-500 group-hover/link:scale-125 transition-all" />
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/tools#general" className="mt-8 inline-flex items-center text-sm font-semibold text-orange-500 hover:underline group/btn">
                All Pro Tools <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* About & Social Sharing - SEO Content */}
      <section className="container max-w-4xl mx-auto px-4 pb-20 space-y-8">
        <div className="bg-muted/10 border border-white/5 rounded-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">About OpenToolBox</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">OpenToolBox</strong> is engineered to be the <strong className="text-foreground">Ultimate Developer Toolbox</strong> for modern creators. We believe that simple tasks like formatting JSON, converting images, or generating secure passwords shouldn't require sending your sensitive data to a remote server.
              </p>
              <p>
                That's why we built this platform with a <strong className="text-foreground">Privacy-First</strong> architecture. Every tool on this site runs 100% in your browser. Whether you are Base64 encoding a confidential API key or resizing a private photo, your data never leaves your device.
              </p>
              <p>
                OpenToolBox is free, open-source, and constantly improving. If you find these tools useful, help us grow by sharing with your network!
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Share this page</h3>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out OpenToolBox - The Ultimate Free & Private Developer Tools! 🛠️🔒")}&url=${encodeURIComponent("https://opentoolbox.online")}`, '_blank')}
                className="gap-2 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/20 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                Share on X
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://opentoolbox.online")}`, '_blank')}
                className="gap-2 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/20 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                Share on LinkedIn
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://opentoolbox.online")}`, '_blank')}
                className="gap-2 hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/20 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 4.16v1.972h3.618l-.291 3.667h-3.327v7.98H9.101z" /></svg>
                Share on Facebook
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
