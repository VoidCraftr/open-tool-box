import { constructMetadata } from "@/lib/seo"
import ImageConverterClient from "./client"

export const metadata = constructMetadata({
    title: "Image Converter (JPG, PNG, WebP)",
    description: "Convert images between JPG, PNG, and WebP formats instantly in your browser. No upload, completely secure.",
    keywords: ["image converter", "png to jpg", "webp converter", "image optimization"]
})

export default function ImageConverterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Image Converter (JPG, PNG, WebP)","description":"Convert images between JPG, PNG, and WebP formats instantly in your browser. No upload, completely secure.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <ImageConverterClient />
        </>
    )
}
