import { constructMetadata } from "@/lib/seo"
import ImageToPdfClient from "./client"

export const metadata = constructMetadata({
    title: "Image to PDF Converter - JPG & PNG to PDF",
    description: "Convert multiple JPG, PNG, or WEBP images into a single high-quality PDF document. Free, secure, and client-side only.",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert image to pdf", "photos to pdf", "free pdf converter"]
})

export default function ImageToPdfPage() {
    return <ImageToPdfClient />
}
