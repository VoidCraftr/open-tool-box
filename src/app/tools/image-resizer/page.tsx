import { constructMetadata } from "@/lib/seo"
import ImageResizerClient from "./client"

export const metadata = constructMetadata({
    title: "Image Resizer - Resize JPG, PNG & WebP Online",
    description: "Free online image resizer. Resize images by pixel dimensions or percentage without losing quality. Secure local processing.",
    keywords: ["image resizer", "resize image", "photo resizer", "resize jpg", "resize png", "online image editor"]
})

export default function ImageResizerPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Image Resizer","description":"Free online image resizer. Resize images by pixel dimensions or percentage without losing quality. Secure local processing.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <ImageResizerClient />
        </>
    )
}
