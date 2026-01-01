"use client";

import Link from "next/link";
import { ArrowRight, Star, Github, Zap, Shield, Globe, Lock, Code2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tools, categories } from "@/config/tools";
import { ToolsSlider } from "@/components/home/ToolsSlider";
import { PremiumCard } from "@/components/common/PremiumCard";
import { motion } from "framer-motion";

export default function Home() {
  // Hand-picked popular tools for a diverse showcase
  const featuredSlugs = [
    "json-formatter",
    "image-converter",
    "password-generator",
    "qr-code-generator",
    "youtube-thumbnail",
    "sign-pdf"
  ];

  const featuredTools = tools.filter(t => featuredSlugs.includes(t.slug));

  // Categorize tools for the sliders
  const row1Tools = tools.filter(t => ["developer", "security", "text"].includes(t.category));
  const row2Tools = tools.filter(t => ["design", "media", "social"].includes(t.category));
  const row3Tools = tools.filter(t => ["general", "math", "finance", "health", "pdf"].includes(t.category));

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
            The Ultimate <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-300%">
              Developer Toolbox
            </span>
          </h1>

          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl lg:text-2xl font-light leading-relaxed">
            Beautifully designed, privacy-focused toolset for modern developers. <br className="hidden md:inline" />
            <span className="text-foreground font-medium">Free forever. No tracking. Just code.</span>
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

          {/* Row 1: Code & Security */}
          <div className="-rotate-1 origin-center hover:rotate-0 transition-transform duration-500 opacity-80 hover:opacity-100">
            <ToolsSlider tools={row1Tools} direction="right" duration={80} />
          </div>

          {/* Row 2: Design & Media */}
          <div className="rotate-1 origin-center hover:rotate-0 transition-transform duration-500 opacity-90 hover:opacity-100 scale-105">
            <ToolsSlider tools={row2Tools} direction="left" duration={60} />
          </div>

          {/* Row 3: Utilities */}
          <div className="-rotate-1 origin-center hover:rotate-0 transition-transform duration-500 opacity-80 hover:opacity-100">
            <ToolsSlider tools={row3Tools} direction="right" duration={90} />
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
            />
          ))}
        </div>

        <div className="mt-8 flex sm:hidden justify-center">
          <Link href="/tools" className="flex items-center text-primary font-medium hover:underline">
            View directory <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Categories Grid - Keeping it clean but premium */}
      <section className="container max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-10 text-center">Browse by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryTools = tools.filter(t => t.category === category.id)
            if (categoryTools.length === 0) return null

            return (
              <div key={category.id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-6 hover:border-primary/20 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{category.label}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{categoryTools.length} tools available</p>

                  <ul className="space-y-2">
                    {categoryTools.slice(0, 3).map(t => (
                      <li key={t.slug}>
                        <Link href={`/tools/${t.slug}`} className="text-sm text-foreground/80 hover:text-primary transition-colors flex items-center">
                          <ArrowRight className="mr-2 h-3 w-3 opacity-0 -ml-5 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/tools#${category.id}`} className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline">
                    View all <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}
