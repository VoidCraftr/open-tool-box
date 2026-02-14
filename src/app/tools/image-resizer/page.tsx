import { constructMetadata } from "@/lib/seo"
import ImageResizerClient from "./client"

export const metadata = constructMetadata({
    title: "Image Resizer - Resize JPG, PNG & WebP Online",
    description: "Free online image resizer. Resize images by pixel dimensions or percentage without losing quality. Secure local processing.",
    keywords: ["image resizer", "resize image", "photo resizer", "resize jpg", "resize png", "online image editor"]
})

export default function ImageResizerPage() {
    return <ImageResizerClient />
}
