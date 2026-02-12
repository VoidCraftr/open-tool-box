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
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "AI Video Enhancer",
                        "description": "Free online video enhancer tool using WebGPU. Upscale video resolution, reduce noise, and improve quality directly in your browser without uploading files.",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "Any (Web Browser with WebGPU support)",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "featureList": [
                            "2x Video Upscaling",
                            "Noise Reduction",
                            "Client-side WebGPU Processing",
                            "No Server Uploads",
                            "MP4 and WebM Support"
                        ]
                    })
                }}
            />
            <VideoEnhancerClient />
        </>
    )
}
