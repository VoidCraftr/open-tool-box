"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MessageCircle, ExternalLink, Copy, Check, QrCode, ShieldCheck, Zap, Sparkles, Activity } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { QRCodeSVG } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"

export default function WhatsAppLink() {
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [copied, setCopied] = useState(false)

    const cleanPhone = phone.replace(/[^0-9]/g, '')
    const whatsappUrl = `https://wa.me/${cleanPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`

    const copyToClipboard = () => {
        if (!cleanPhone) return
        navigator.clipboard.writeText(whatsappUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const openChat = () => {
        if (!cleanPhone) return
        window.open(whatsappUrl, '_blank')
    }

    return (
        <ToolWrapper
            title="Premium Connect: WhatsApp Link & QR Engine"
            description="Generate professional WhatsApp direct-chat links and high-fidelity QR codes with custom pre-filled messages. Optimized for business and marketing."
            toolSlug="whatsapp-link"
        >
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Configuration Panel */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                            <MessageCircle className="w-32 h-32" />
                        </div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                Connectivity Logic
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-black tracking-widest opacity-60">Configure your direct bridge</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-tight text-muted-foreground ml-1">Universal Phone Number</Label>
                                <div className="group relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black opacity-40 group-focus-within:opacity-100 transition-opacity">+</div>
                                    <Input
                                        placeholder="15551234567"
                                        className="h-14 pl-8 bg-background/50 border-white/10 text-lg font-mono tracking-wider focus:ring-primary/20"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="tel"
                                    />
                                </div>
                                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter opacity-60 px-1 italic">Include country code &bull; Exclude zero prefix</p>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-tight text-muted-foreground ml-1 text-primary">Pre-filled Response Message</Label>
                                <Textarea
                                    placeholder="Hello, I'm reaching out from your profile about..."
                                    className="min-h-[140px] bg-background/50 border-white/10 text-base leading-relaxed resize-none focus:ring-primary/20"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 flex gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="p-2 bg-primary/10 rounded-lg h-fit">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-primary uppercase tracking-tighter italic">End-to-End Client Isolation</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">No phone numbers or message strings touch our infrastructure. Your data is restricted to your machine.</p>
                        </div>
                    </div>
                </div>

                {/* Distribution Panel */}
                <div className="space-y-6">
                    <Card className="premium-card bg-primary text-primary-foreground border-none relative overflow-hidden shadow-2xl shadow-primary/20 min-h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                        <CardContent className="pt-10 pb-8 flex flex-col items-center justify-center gap-10 relative z-10 h-full">
                            {cleanPhone ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full flex flex-col items-center gap-8"
                                >
                                    {/* QR Engine */}
                                    <div className="p-6 bg-white rounded-[2rem] shadow-2xl shadow-black/20 group hover:scale-[1.02] transition-transform duration-500 relative">
                                        <div className="absolute -inset-1 bg-gradient-to-br from-primary to-white rounded-[2.2rem] opacity-20 blur-sm" />
                                        <QRCodeSVG
                                            value={whatsappUrl}
                                            size={180}
                                            level="H"
                                            includeMargin={false}
                                            className="relative z-10"
                                        />
                                    </div>

                                    <div className="text-center space-y-2 px-6">
                                        <div className="inline-block p-1 px-3 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black lowercase tracking-[0.2em] opacity-80 mb-2">
                                            wa.me linkage active
                                        </div>
                                        <p className="font-mono text-sm opacity-60 break-all line-clamp-2 max-w-[300px]">
                                            {whatsappUrl}
                                        </p>
                                    </div>

                                    <div className="w-full grid gap-4 px-6">
                                        <Button
                                            size="lg"
                                            className="h-16 bg-white text-primary hover:bg-white/90 text-xl font-black rounded-2xl shadow-xl active:scale-95 transition-all"
                                            onClick={openChat}
                                        >
                                            <MessageCircle className="w-6 h-6 mr-3 fill-primary" />
                                            OPEN CHAT
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="h-12 bg-black/10 hover:bg-black/20 text-white rounded-xl font-black uppercase tracking-widest text-[10px]"
                                            onClick={copyToClipboard}
                                        >
                                            {copied ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
                                            {copied ? "Link Encrypted to Clipboard" : "Copy Direct Link"}
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-center py-10 space-y-4 opacity-40">
                                    <MessageCircle className="w-24 h-24 mx-auto mb-4 stroke-[1px] animate-float" />
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black italic tracking-tighter">Connection Standby</h4>
                                        <p className="text-[10px] font-black uppercase tracking-widest">Awaiting destination digits</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <AnimatePresence>
                        {cleanPhone && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-4 p-4 bg-background/40 border border-white/5 rounded-2xl"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <p className="text-[11px] text-muted-foreground italic leading-tight">
                                    Your QR code is ready for print or digital scan. Use it to permit customers to message you instantly without typing your number.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ContentSection
                title="Direct Bridge Technology: WhatsApp Link & QR Connectivity"
                description="Removing friction from customer journeys is the most effective way to improve conversion rates. Our Premium WhatsApp Link & QR Generator provides an enterprise-standard way to bridge the gap between your physical marketing (flyers, business cards) and digital conversations."
                features={[
                    "🔗 **Instant wa.me Linking**: Industry-standard direct messaging links generated instantly with no ad redirects.",
                    "🔳 **High-Fidelity QR Engine**: Integrated QR code generation with level-H error correction for reliable scanning.",
                    "📝 **Pre-filled Context Mapping**: Define specific messages for different products or pages to know exactly why a user is messaging you.",
                    "🔒 **Privacy Isolation**: Your customer database stays with you. No phone numbers are logged, tracked, or shared.",
                    "📱 **Mobile First Optimization**: Every link produced is automatically optimized for both mobile WhatsApp and Desktop web sessions.",
                    "✨ **Neuromorphic Connectivity UI**: A beautiful, productive dashboard designed for modern entrepreneurs and social managers."
                ]}
                howToUse={[
                    "Input your **Phone Number** including the international country code (e.g., 1 for USA, 44 for UK).",
                    "Choose an optional **Pre-filled Message** like 'Hi, I saw your ad and have a question.' to give context.",
                    "Observe the real-time **Direct Link** and **Live QR Code** generation in the distribution panel.",
                    "Test the connection by clicking **OPEN CHAT** to ensure the number and message format are correct.",
                    "Copy the generated link or scan the QR code to deploy it in your social bio, website, or marketing materials."
                ]}
                faq={[
                    {
                        question: "Why do I need a country code?",
                        answer: "WhatsApp links (wa.me) require a full international format to correctly route the message globally. Without it, the link might fail for users in different regions."
                    },
                    {
                        question: "Do clients need to save my number first?",
                        answer: "No. This is the primary benefit of wa.me links. They allow a user to start a chat with you instantly without having to manually add you to their phone book first."
                    },
                    {
                        question: "Is this tool free for business use?",
                        answer: "Yes. OpenToolBox provides these connectivity utilities for free with no hidden tracking, ensuring your business operations remain private and cost-effective."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
