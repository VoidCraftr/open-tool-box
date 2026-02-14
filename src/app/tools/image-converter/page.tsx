import { constructMetadata } from "@/lib/seo"
import ImageConverterClient from "./client"

export const metadata = constructMetadata({
    title: "Image Converter (JPG, PNG, WebP)",
    description: "Convert images between JPG, PNG, and WebP formats instantly in your browser. No upload, completely secure.",
    keywords: ["image converter", "png to jpg", "webp converter", "image optimization"]
})

export default function ImageConverterPage() {
    return <ImageConverterClient />
}
