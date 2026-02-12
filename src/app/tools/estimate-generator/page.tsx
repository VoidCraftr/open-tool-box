import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Estimate Generator | OpenToolBox",
    description: "Create professional project estimates and quotes for your clients. Free, private, and simple.",
}

export default function EstimateGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Free Estimate Generator | OpenToolBox","description":"Create professional project estimates and quotes for your clients. Free, private, and simple.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <Client />
        </>
    )
}
