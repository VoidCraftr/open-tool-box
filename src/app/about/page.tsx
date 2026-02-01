"use client"

import { Shield, Zap, Palette, Code2, Lock, Smartphone, Heart, Sparkles, Globe, Orbit } from "lucide-react"
import { BuyMeCoffee } from "@/components/common/BuyMeCoffee"
import { motion } from "framer-motion"

export default function AboutPage() {
    const features = [
        {
            icon: Shield,
            title: "Privacy First",
            description: "We strictly prioritize client-side processing. Your data (images, code, passwords) rarely leaves your browser.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Built with Next.js 14 and optimized for Web Vitals. No bloat, no trackers, just pure utility.",
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            icon: Palette,
            title: "Modern Design",
            description: "Tools shouldn't look like they were built in 1999. We use clean, modern aesthetics for a better experience.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
    ]

    const segments = [
        {
            icon: Code2,
            title: "Software Engineers",
            description: "Format JSON, SQL, and decode JWTs without fear of data leaks.",
            color: "text-blue-500"
        },
        {
            icon: Palette,
            title: "Designers",
            description: "Generate CSS gradients, box-shadows, and optimize images.",
            color: "text-purple-500"
        },
        {
            icon: Lock,
            title: "Privacy Advocates",
            description: "Generate secure passwords and UUIDs entirely offline.",
            color: "text-green-500"
        },
        {
            icon: Smartphone,
            title: "Mobile Developers",
            description: "Test deep links and generate QR codes for app downloads.",
            color: "text-orange-500"
        },
    ]

    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            {/* Clean Background - Removed Dark Layers */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 opacity-50" />

            <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32 space-y-32">

                {/* Hero Section: The Vision */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-8"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary backdrop-blur-xl">
                        <Sparkles className="w-3 h-3" /> Reimagining Utilities
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase text-foreground">
                            Tools for the <br />
                            <span className="text-primary/90">Modern Era</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground font-medium leading-relaxed">
                            OpenToolbox was born from a simple frustration: developer tools should be beautiful, fast, and respect your privacy.
                            No ads. No tracking. Pure utility.
                        </p>
                    </div>
                </motion.section>

                {/* Core Philosophy: Features */}
                <section className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative h-full flex flex-col items-center text-center space-y-6 p-10 rounded-3xl bg-card border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                                <div className={`p-4 rounded-2xl ${feature.bg} shadow-sm transition-transform group-hover:scale-110 group-hover:-rotate-3`}>
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Built for Everyone: Use Cases */}
                <section className="space-y-16">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-muted rounded-full">
                                <Orbit className="w-6 h-6 text-primary animate-spin-slow" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-foreground">Built for Everyone</h2>
                        <p className="text-xl text-muted-foreground font-medium">
                            Whether you are debugging an API or optimizing your next creative project.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {segments.map((segment, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative overflow-hidden group rounded-2xl border border-border bg-card p-8 hover:shadow-md transition-all hover:bg-muted/30"
                            >
                                <div className="space-y-4 relative z-10">
                                    <div className={`p-2 rounded-lg ${segment.color} bg-current/10 w-fit`}>
                                        <segment.icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="text-lg font-black tracking-tight uppercase leading-none text-foreground">{segment.title}</h4>
                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{segment.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Mission Statement: The "Why" */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] border border-border bg-card p-12 lg:p-20 text-center space-y-8 shadow-sm"
                >
                    <Heart className="mx-auto h-12 w-12 text-primary animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-foreground">Support our Mission</h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
                        OpenToolbox is and will always be community-driven. Your support helps us cover hosting costs
                        and allows us to build even more free tools for everyone.
                    </p>
                    <div className="pt-6">
                        <BuyMeCoffee />
                    </div>
                </motion.section>

                {/* Global Footer Insight */}
                <div className="flex flex-col items-center gap-4 opacity-40">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                        <Globe className="w-3 h-3" /> Distributed Worldwide
                    </div>
                    <p className="text-[10px] font-medium italic text-muted-foreground">Hand-crafted by VoidCraftr and contributors.</p>
                </div>
            </div>
        </div>
    )
}
