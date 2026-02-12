import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Business Quote Generator | OpenToolBox",
    description: "Generate professional business quotes and proposals. Free, fast, and 100% private.",
}

export default function BusinessQuoteGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Free Business Quote Generator | OpenToolBox","description":"Generate professional business quotes and proposals. Free, fast, and 100% private.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <Client />
        </>
    )
}
