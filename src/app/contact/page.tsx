"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Check, Copy, Twitter, Github, Linkedin, Instagram, Facebook, Send, Globe, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactPage() {
    const [copied, setCopied] = useState(false)
    const email = "satyam.agarwal.ai@gmail.com"

    const copyEmail = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const socials = [
        { name: "Twitter", icon: Twitter, href: "https://twitter.com/Satyam_Agarwal_", color: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10" },
        { name: "GitHub", icon: Github, href: "https://github.com/voidcraftr", color: "hover:text-[#333] dark:hover:text-white hover:bg-white/10" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/voidcraftr", color: "hover:text-[#0077B5] hover:bg-[#0077B5]/10" },
        { name: "Instagram", icon: Instagram, href: "https://instagram.com/voidcraftr", color: "hover:text-[#E4405F] hover:bg-[#E4405F]/10" },
        { name: "Facebook", icon: Facebook, href: "https://facebook.com/voidcraftr", color: "hover:text-[#1877F2] hover:bg-[#1877F2]/10" },
    ]

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />

            <div className="mx-auto max-w-6xl py-20 lg:py-32 px-6">
                <div className="grid gap-16 lg:grid-cols-2 items-center">

                    {/* Left Column: Narrative */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary backdrop-blur-xl">
                                <Send className="w-3 h-3" /> Get in Touch
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
                                Let's build the <br />
                                <span className="bg-gradient-to-r from-primary via-blue-500 to-emerald-500 bg-clip-text text-transparent italic">future together.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                                Have a suggestion for a new tool? Found a bug? Or just want to say hi?
                                We are a small team of open-source enthusiasts and we'd love to hear from you.
                            </p>
                        </div>

                        {/* Social Universe */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60 flex items-center gap-3">
                                <Globe className="w-4 h-4" /> Connect across the web
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {socials.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md transition-all ${social.color} font-bold text-sm`}
                                    >
                                        <social.icon className="h-5 w-5" />
                                        <span>{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Additional Insight */}
                        <div className="pt-8 border-t border-white/5 max-w-md">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-1" />
                                <p className="text-sm text-primary/80 font-medium leading-relaxed italic">
                                    "Your feedback directly shapes the next release of OpenToolbox. Every suggestion is reviewed by our core engineering team."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Interaction Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative glow behind the card */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-blue-500/20 to-emerald-500/20 rounded-[3rem] blur-3xl opacity-50 animate-pulse" />

                        <Card className="relative overflow-hidden liquid-glass border border-white/20 shadow-liquid rounded-[3rem] group">
                            <CardContent className="p-10 md:p-14 flex flex-col items-center text-center space-y-10">

                                {/* Visual Anchor */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000" />
                                    <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-black/40 border border-white/10 shadow-2xl transition-all group-hover:-translate-y-2 group-hover:border-primary/50">
                                        <Mail className="h-10 w-10 text-primary animate-float" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-3xl font-black tracking-tight text-foreground uppercase">Direct Communication</h3>
                                    <p className="text-muted-foreground font-medium max-w-[280px] mx-auto leading-relaxed">
                                        Skip the contact form. Reach out to our human operators directly.
                                    </p>
                                </div>

                                {/* Email Copy Interaction */}
                                <div className="w-full space-y-4">
                                    <div className="relative group/input w-full">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover/input:opacity-100 transition duration-500" />
                                        <div className="relative flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 pl-6 backdrop-blur-xl">
                                            <span className="flex-1 text-left font-mono text-sm font-bold text-muted-foreground/80 truncate">
                                                {email}
                                            </span>
                                            <Button
                                                onClick={copyEmail}
                                                className={`h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 ${copied ? "bg-green-500 hover:bg-green-600 text-white scale-95" : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"}`}
                                            >
                                                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                                {copied ? "TRANSFERRED" : "COPY EMAIL"}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 px-2">
                                        <div className="h-px flex-1 bg-white/5" />
                                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-40 italic">or launch protocol</span>
                                        <div className="h-px flex-1 bg-white/5" />
                                    </div>

                                    <a href={`mailto:${email}`} className="block w-full">
                                        <Button size="lg" className="w-full h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-[0.98]">
                                            Open System Mailer
                                        </Button>
                                    </a>
                                </div>

                                <div className="pt-6">
                                    <p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">
                                        Response Entropy: &lt; 24 Hours
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
