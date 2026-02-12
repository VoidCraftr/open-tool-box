import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Receipt Generator | OpenToolBox",
    description: "Create professional payment receipts for your business instantly. Free, private, and no signup required.",
}

export default function ReceiptGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Free Receipt Generator | OpenToolBox","description":"Create professional payment receipts for your business instantly. Free, private, and no signup required.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <Client />
        </>
    )
}
