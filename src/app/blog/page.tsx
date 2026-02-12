import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Rss, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Blog - Tips, Tutorials & Updates",
    description: "Learn how to use OpenToolBox tools more effectively. Read tutorials, tips, and product updates from the team.",
    keywords: ["opentoolbox blog", "developer tutorials", "tool guides", "productivity tips", "free online tools"],
    openGraph: {
        title: "OpenToolBox Blog - Tips, Tutorials & Updates",
        description: "Learn how to use OpenToolBox tools more effectively. Read tutorials, tips, and product updates.",
        type: "website",
    }
}

// Blog posts - in a real app, this would come from a CMS or database
const posts = [
    {
        slug: "why-client-side-processing-matters",
        title: "Why Client-Side Processing Matters for Your Privacy",
        description: "Learn why processing data locally in your browser is more secure than uploading to remote servers, and how OpenToolBox protects your sensitive information.",
        category: "Privacy",
        date: "2026-02-01",
        readTime: "5 min read",
        featured: true
    },
    {
        slug: "json-formatting-best-practices",
        title: "JSON Formatting Best Practices for Developers",
        description: "Master JSON formatting with these tips on validation, debugging API responses, and working with nested data structures efficiently.",
        category: "Developer",
        date: "2026-01-28",
        readTime: "7 min read",
        featured: true
    },
    {
        slug: "create-professional-invoices-freelancers",
        title: "How to Create Professional Invoices as a Freelancer",
        description: "Step-by-step guide to creating GST-compliant invoices for Indian freelancers. Learn about tax calculations, branding, and client management.",
        category: "Business",
        date: "2026-01-25",
        readTime: "6 min read",
        featured: false
    },
    {
        slug: "pomodoro-technique-productivity",
        title: "The Pomodoro Technique: Boost Your Focus in 25 Minutes",
        description: "Discover how the Pomodoro technique can transform your productivity. Learn the science behind focused work sessions and mindful breaks.",
        category: "Productivity",
        date: "2026-01-20",
        readTime: "4 min read",
        featured: false
    },
    {
        slug: "image-optimization-web-performance",
        title: "Image Optimization: Speed Up Your Website Without Losing Quality",
        description: "Comprehensive guide to image formats, compression, and conversion. Learn when to use JPG, PNG, WebP, or AVIF for optimal web performance.",
        category: "Media",
        date: "2026-01-15",
        readTime: "8 min read",
        featured: true
    },
    {
        slug: "password-security-best-practices",
        title: "Password Security: Creating and Managing Strong Passwords",
        description: "Learn how to create uncrackable passwords, understand password strength metrics, and protect your online accounts effectively.",
        category: "Security",
        date: "2026-01-10",
        readTime: "7 min read",
        featured: false
    }
]

const categories = ["All", "Developer", "Business", "Privacy", "Productivity", "Media", "Security"]

export default function BlogPage() {
    const featuredPosts = posts.filter(p => p.featured)

    return (
        <div className="mx-auto max-w-5xl py-12 space-y-16">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                    <Rss className="h-4 w-4 mr-2" />
                    OpenToolBox Blog
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    Tips, Tutorials & Updates
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Learn how to use our tools more effectively, discover productivity tips, and stay updated with new features.
                </p>
            </div>

            {/* Featured Posts */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Featured Articles</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featuredPosts.map((post) => (
                        <Card key={post.slug} className="group hover:border-primary/20 transition-all hover:-translate-y-1">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}
                                    </span>
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {post.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1"
                                    >
                                        Read more <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* All Posts */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">All Articles</h2>
                    <div className="flex gap-2 overflow-x-auto">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={category === "All" ? "default" : "outline"}
                                size="sm"
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="divide-y divide-border">
                    {posts.map((post) => (
                        <article key={post.slug} className="py-6 flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="bg-muted px-2 py-0.5 rounded-full font-medium">
                                        {post.category}
                                    </span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-muted-foreground line-clamp-2">
                                    {post.description}
                                </p>
                            </div>
                            <div className="text-sm text-muted-foreground whitespace-nowrap">
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Subscribe CTA */}
            <section className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center space-y-4">
                <h2 className="text-2xl font-bold">Stay Updated</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Get notified when we publish new articles, tutorials, and product updates. No spam, ever.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button className="rounded-lg">Subscribe</Button>
                </div>
            </section>
        </div>
    )
}
