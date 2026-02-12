import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import QuoteGeneratorClient from "./client"

export const metadata: Metadata = {
    title: "Quote Post Generator | Create Cinematic Quote Images | OpenToolBox",
    description: "Convert your favorite quotes into beautiful, shareable images for social media. Choose from premium backgrounds, mesh gradients, and designer typography.",
    keywords: ["quote generator", "quote maker", "instagram quote creator", "cinematic quotes", "quote to image"],
}

export default function QuoteGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Quote Post Generator | Create Cinematic Quote Images | OpenToolBox","description":"Convert your favorite quotes into beautiful, shareable images for social media. Choose from premium backgrounds, mesh gradients, and designer typography.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <QuoteGeneratorClient />
        </>
    )
}
