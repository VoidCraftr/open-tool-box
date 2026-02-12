import { constructMetadata } from "@/lib/seo"
import ImageToPdfClient from "./client"

export const metadata = constructMetadata({
    title: "Image to PDF Converter - JPG & PNG to PDF",
    description: "Convert multiple JPG, PNG, or WEBP images into a single high-quality PDF document. Free, secure, and client-side only.",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert image to pdf", "photos to pdf", "free pdf converter"]
})

export default function ImageToPdfPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Image to PDF Converter","description":"Convert multiple JPG, PNG, or WEBP images into a single high-quality PDF document. Free, secure, and client-side only.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <ImageToPdfClient />
        </>
    )
}
