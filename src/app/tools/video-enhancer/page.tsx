import { Metadata } from "next"
import VideoEnhancerClient from "./client"

export const metadata: Metadata = {
    title: "AI Video Enhancer - Upscale & Improve Video Quality Online Free",
    description: "Free online video enhancer tool. Upscale video resolution, reduce noise, stabilize footage, and improve video quality with AI-powered enhancement. 100% client-side processing.",
    keywords: [
        "video enhancer",
        "enhance video quality",
        "upscale video",
        "video quality improver",
        "improve video quality online",
        "video upscaler",
        "ai video enhancer",
        "video noise reduction",
        "stabilize video online",
        "video enhancement tool",
        "free video enhancer",
        "enhance video online free",
        "video quality enhancement",
        "upscale video resolution",
        "improve video clarity",
        "video sharpening tool",
        "enhance blurry video",
        "video quality fixer",
        "hd video enhancer",
        "4k video upscaler"
    ]
}

export default function VideoEnhancerPage() {
    return <VideoEnhancerClient />
}
