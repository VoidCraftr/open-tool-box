import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Scientific Calculator | OpenToolBox",
    description: "Advanced scientific calculator with history and trigonometry. Free, clean math tool.",
}

export default function ScientificCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Free Scientific Calculator | OpenToolBox","description":"Advanced scientific calculator with history and trigonometry. Free, clean math tool.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <Client />
        </>
    )
}
