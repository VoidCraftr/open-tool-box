import { Metadata } from "next"
import PhotoEnhancerClient from "./client"

export const metadata: Metadata = {
    title: "Photo Enhancer AI - Improve Image Quality Online Free",
    description: "Free AI-powered photo enhancer tool. Auto enhance photos, improve image quality, sharpen, denoise, and upscale images online. 100% client-side processing for privacy.",
    keywords: [
        "photo enhancer",
        "enhance photo",
        "improve image quality",
        "ai photo enhancement",
        "photo quality improver",
        "enhance image online",
        "image enhancer ai",
        "auto enhance photo",
        "sharpen image online",
        "denoise photo",
        "photo editor online",
        "improve picture quality",
        "enhance photo quality free",
        "image quality enhancer",
        "photo sharpening tool",
        "brighten photo online",
        "color correction tool",
        "photo saturation adjuster",
        "free photo enhancer",
        "enhance blurry photo",
        "fix photo quality",
        "upscale photo online"
    ]
}

export default function PhotoEnhancerPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Photo Enhancer AI","description":"Free AI-powered photo enhancer tool. Auto enhance photos, improve image quality, sharpen, denoise, and upscale images online. 100% client-side processing for privacy.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <PhotoEnhancerClient />
        </>
    )
}
