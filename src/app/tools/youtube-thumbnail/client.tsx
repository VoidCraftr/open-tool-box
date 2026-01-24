"use client"

import { useState } from "react"
import { Download, Search, Youtube, Sparkles, Zap, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ContentSection } from "@/components/tools/ContentSection"
import { PrivacyBadge } from "@/components/common/PrivacyBadge"

export default function YoutubeThumbnailClient() {
    const [url, setUrl] = useState("")
    const [videoId, setVideoId] = useState<string | null>(null)
    const [isSimpleMode, setIsSimpleMode] = useState(true)

    const extractVideoId = (inputUrl: string) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = inputUrl.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    }

    const handleFetch = () => {
        const id = extractVideoId(url)
        if (id) {
            setVideoId(id)
        }
    }

    const thumbnailQualities = [
        { label: "Cinema Quality (HD)", key: "maxresdefault", size: "1280x720", best: true },
        { label: "Standard View", key: "sddefault", size: "640x480" },
        { label: "High Quality (Legacy)", key: "hqdefault", size: "480x360" },
        { label: "Compact Preview", key: "mqdefault", size: "320x180" },
    ]

    return (
        <ToolWrapper
            title={isSimpleMode ? "Grab Video Thumbnails" : "YouTube Asset Extractor"}
            description={isSimpleMode ? "Get the highest quality image from any YouTube video instantly. Just paste the link." : "Download high-quality thumbnails from any YouTube video in seconds."}
            toolSlug="youtube-thumbnail"
            className="max-w-6xl"
        >
            <div className="flex flex-col gap-10">
                {/* Mode Toggle */}
                <div className="flex justify-center">
                    <div className="flex items-center gap-3 p-1.5 liquid-glass border border-primary/20 rounded-full shadow-lg">
                        <button
                            onClick={() => setIsSimpleMode(true)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isSimpleMode ? "bg-primary text-primary-foreground shadow-md scale-105" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Quick Grab
                        </button>
                        <button
                            onClick={() => setIsSimpleMode(false)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${!isSimpleMode ? "bg-primary text-primary-foreground shadow-md scale-105" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            All Variants
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-primary/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                        <div className="relative liquid-glass border-2 border-white/5 p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1 w-full space-y-2">
                                <Label className="font-black text-xs uppercase tracking-widest text-red-500 mb-2 block flex items-center gap-2">
                                    <Youtube className="w-4 h-4" /> YouTube Link
                                </Label>
                                <div className="relative">
                                    <Input
                                        placeholder="Paste video URL (e.g., https://youtube.com/watch?v=...)"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                                        className="h-16 pl-6 pr-16 rounded-2xl bg-white/5 border-white/10 focus:border-red-500/50 text-lg font-medium"
                                    />
                                    <Button
                                        onClick={handleFetch}
                                        className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/20"
                                    >
                                        <ArrowRight className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <PrivacyBadge />
                    </div>

                    <AnimatePresence mode="wait">
                        {videoId && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid gap-8"
                            >
                                {isSimpleMode ? (
                                    <div className="max-w-4xl mx-auto w-full">
                                        <div className="relative group rounded-[2.5rem] overflow-hidden border-2 border-white/5 bg-black liquid-shadow">
                                            <div className="absolute top-6 left-6 z-10">
                                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest shadow-xl">
                                                    <Zap className="w-3 h-3 mr-2 fill-current" /> Best Quality Found
                                                </span>
                                            </div>
                                            <img
                                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                                alt="Best Quality"
                                                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                                                <Button size="lg" className="h-16 px-10 rounded-2xl premium-button text-lg w-full md:w-auto" asChild>
                                                    <a href={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} download="thumbnail.jpg" target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-3 h-6 w-6" /> Save Image
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                                        {thumbnailQualities.map((quality) => (
                                            <motion.div
                                                key={quality.key}
                                                layout
                                                className="group relative rounded-3xl overflow-hidden border border-white/5 bg-white/5 hover:border-primary/20 transition-all liquid-shadow"
                                            >
                                                <div className="aspect-video relative overflow-hidden bg-muted">
                                                    <img
                                                        src={`https://img.youtube.com/vi/${videoId}/${quality.key}.jpg`}
                                                        alt={quality.label}
                                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                        onError={(e) => {
                                                            if (quality.key === "maxresdefault") {
                                                                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                                            }
                                                        }}
                                                    />
                                                    {quality.best && <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-red-600 text-[10px] font-black uppercase text-white">Recommended</div>}
                                                </div>
                                                <div className="p-6 flex items-center justify-between gap-4">
                                                    <div>
                                                        <p className="font-bold text-lg">{quality.label}</p>
                                                        <p className="text-xs text-muted-foreground font-mono">{quality.size}</p>
                                                    </div>
                                                    <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-primary/10 text-primary" asChild>
                                                        <a href={`https://img.youtube.com/vi/${videoId}/${quality.key}.jpg`} download={`thumbnail-${quality.key}.jpg`} target="_blank" rel="noopener noreferrer">
                                                            <Download className="h-6 w-6" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ContentSection
                title="Unlock High-Definition YouTube Thumbnails"
                description={`Our studio-grade tool extracts the original high-resolution thumbnail images directly from YouTube's servers. \n\nWhether you need them for your own inspiration, archived projects, or social media sharing, we provide direct access to every quality variant—from standard previews to 4K cinematic covers.`}
                features={[
                    "✨ **Cinema Quality**: Access 1280x720 HD thumbnails instantly.",
                    "⚡ **Zero Lag**: Thumbnails are fetched directly via YouTube's CDN.",
                    "🔒 **Private & Secure**: We don't track what you watch or what you grab.",
                    "🎨 **Creator Ready**: Perfect for mood boards, presentation slides, or archives.",
                    "🚀 **One-Click Save**: No right-clicking or complicated inspectors needed."
                ]}
                howToUse={[
                    "Copy the **URL** of your favorite YouTube video.",
                    "Paste it into the **Search Box** above.",
                    "Hit the **Grab** button or press Enter.",
                    "Browse variants in **All Variants** mode if needed.",
                    "Click **Save Image** to download the file directly."
                ]}
                faq={[
                    {
                        question: "Is it legal to download thumbnails?",
                        answer: "Downloading a thumbnail for personal use, such as a reference or archive, is generally considered fair use. However, you should not use someone else's thumbnail for your own video without permission, as the artwork belongs to the creator."
                    },
                    {
                        question: "Why can't I find HD for some videos?",
                        answer: "Not all videos have HD thumbnails. Older videos or videos uploaded in low resolution may only have SD (640x480) or HQ (480x360) variants available."
                    },
                    {
                        question: "What is the best format?",
                        answer: "YouTube stores these as **JPEGs**. For the best result, always choose the 'Max Resolution' or 'Cinema Quality' variant if it's available."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
