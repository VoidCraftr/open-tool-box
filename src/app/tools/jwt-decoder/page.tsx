import { constructMetadata } from "@/lib/seo"
import JwtDecoderClient from "./client"

export const metadata = constructMetadata({
    title: "JWT Decoder - Decode JSON Web Tokens Online",
    description: "Decode JWT header and payload instantly. Debug JSON Web Tokens securely in your browser. No server-side processing.",
    keywords: ["jwt decoder", "decode jwt", "json web token", "jwt debugger", "jwt tool", "jwt claim viewer"]
})

export default function JwtDecoderPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"JWT Decoder","description":"Decode JWT header and payload instantly. Debug JSON Web Tokens securely in your browser. No server-side processing.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <JwtDecoderClient />
        </>
    )
}
