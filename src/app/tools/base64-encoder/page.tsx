import { constructMetadata } from "@/lib/seo"
import Base64EncoderClient from "./client"

export const metadata = constructMetadata({
    title: "Base64 Encoder / Decoder - Decode and Encode Online",
    description: "Free online Base64 encoder and decoder. Convert text to Base64 and Base64 to text instantly. Secure client-side processing.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "encode base64", "decode base64", "developer tools"]
})

export default function Base64EncoderPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Base64 Encoder / Decoder","description":"Free online Base64 encoder and decoder. Convert text to Base64 and Base64 to text instantly. Secure client-side processing.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <Base64EncoderClient />
        </>
    )
}
