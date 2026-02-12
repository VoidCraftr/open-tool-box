import { Metadata } from "next"
import LinkedinPostGeneratorClient from "./client"

export const metadata: Metadata = {
    title: "Fake LinkedIn Post Generator | Create LinkedIn Mockups",
    description: "Create realistic fake LinkedIn posts for memes, pranks, or social media planning. Customize text, images, reactions, and connections.",
    keywords: ["fake linkedin post", "linkedin mockup generator", "social media simulator", "fake social media", "linkedin post creator"]
}

export default function LinkedinPostGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Fake LinkedIn Post Generator | Create LinkedIn Mockups","description":"Create realistic fake LinkedIn posts for memes, pranks, or social media planning. Customize text, images, reactions, and connections.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <LinkedinPostGeneratorClient />
        </>
    )
}
