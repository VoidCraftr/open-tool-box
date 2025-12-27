"use client"

import Link from "next/link";
import { ArrowRight, Star, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tools, categories } from "@/config/tools";

export default function Home() {
  const featuredTools = tools.filter(t => t.isPopular || t.isNew).slice(0, 6);

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-8 lg:pt-16">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          The Open Source <br className="hidden sm:inline" />
          <span className="text-primary">Developer Toolbox</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          A collection of free, privacy-focused open source tools. No bloat, just code.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/tools">
            <Button size="lg" className="px-8">Explore All Tools</Button>
          </Link>
          <a href="https://github.com/voidcraftr/nexus-tools" target="_blank" rel="noreferrer">
            <Button variant="outline" size="lg">
              <Github className="mr-2 h-4 w-4" />
              Star on GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured & New</h2>
          <Link href="/tools" className="text-sm text-primary hover:underline flex items-center">
            View all <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 group cursor-pointer relative overflow-hidden">
                {tool.isNew && (
                  <div className="absolute top-0 right-0 p-2">
                    <Badge variant="default" className="text-xs bg-blue-600 hover:bg-blue-600">NEW</Badge>
                  </div>
                )}
                {tool.isPopular && !tool.isNew && (
                  <div className="absolute top-0 right-0 p-2">
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1 fill-current" /> Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Browse by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const categoryTools = tools.filter(t => t.category === category.id)
            if (categoryTools.length === 0) return null
            return (
              <Card key={category.id} className="bg-muted/30 border-dashed">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <category.icon className="h-5 w-5" />
                    <span className="font-semibold uppercase tracking-wider text-xs">{category.label}</span>
                  </div>
                  <CardTitle className="text-base">{categoryTools.length} Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {categoryTools.slice(0, 4).map(t => (
                    <Link key={t.slug} href={`/tools/${t.slug}`} className="block text-sm hover:underline">
                      {t.name}
                    </Link>
                  ))}
                  {categoryTools.length > 4 && (
                    <Link href={`/tools#${category.id}`} className="block text-sm text-primary hover:underline font-medium pt-1">
                      + {categoryTools.length - 4} more
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  );
}
