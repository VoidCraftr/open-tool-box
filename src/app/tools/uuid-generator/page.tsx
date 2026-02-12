import { constructMetadata } from "@/lib/seo"
import UuidGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "UUID Generator (v4)",
    description: "Generate random, unique, RFC-compliant UUIDs instantly. Ideal for developers needing test data or database keys.",
    keywords: ["uuid generator", "guid generator", "v4 uuid", "random uuid"]
})

export default function UuidGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"UUID Generator (v4)","description":"Generate random, unique, RFC-compliant UUIDs instantly. Ideal for developers needing test data or database keys.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <UuidGeneratorClient />
        </>
    )
}
