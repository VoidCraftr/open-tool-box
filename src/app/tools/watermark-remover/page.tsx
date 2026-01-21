import { Metadata } from "next"
import WatermarkRemoverClient from "./client"

export const metadata: Metadata = {
    title: "Watermark Remover - Remove Watermarks from Photos & Videos Free",
    description: "Free watermark remover tool. Remove watermarks from images and videos online with AI-powered technology. Easy-to-use watermark eraser with 100% client-side processing.",
    keywords: [
        "watermark remover",
        "remove watermark",
        "erase watermark",
        "watermark eraser online",
        "remove watermark from image",
        "watermark removal tool",
        "delete watermark",
        "remove watermark from photo",
        "watermark eraser free",
        "remove logo from image",
        "erase watermark from picture",
        "online watermark remover",
        "free watermark remover",
        "remove text from image",
        "watermark cleaner",
        "remove watermark from video",
        "delete watermark online",
        "watermark removal app",
        "remove stamp from photo",
        "erase logo from image"
    ]
}

export default function WatermarkRemoverPage() {
    return <WatermarkRemoverClient />
}
