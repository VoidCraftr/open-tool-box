import { Metadata } from "next"
import InstagramPostGeneratorClient from "./client"

export const metadata: Metadata = {
    title: "Fake Instagram Post Generator | Create Instagram Mockups",
    description: "Create realistic fake Instagram posts for memes, pranks, or social media planning. 100% free and client-side.",
    keywords: ["fake instagram post", "instagram mockup generator", "social media simulator", "fake social media", "instagram post creator"]
}

export default function InstagramPostGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Fake Instagram Post Generator | Create Instagram Mockups","description":"Create realistic fake Instagram posts for memes, pranks, or social media planning. 100% free and client-side.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <InstagramPostGeneratorClient />
        </>
    )
}
