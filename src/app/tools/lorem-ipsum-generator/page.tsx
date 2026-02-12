import { constructMetadata } from "@/lib/seo"
import LoremIpsumGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "Lorem Ipsum Generator - Placeholder Text",
    description: "Free online Lorem Ipsum generator. Create dummy text for your designs, layouts, and mockups. Generate paragraphs, sentences, or words.",
    keywords: ["lorem ipsum generator", "dummy text generator", "placeholder text", "lipsum", "text generator", "web design tools"]
})

export default function LoremIpsumGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Lorem Ipsum Generator","description":"Free online Lorem Ipsum generator. Create dummy text for your designs, layouts, and mockups. Generate paragraphs, sentences, or words.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <LoremIpsumGeneratorClient />
        </>
    )
}
