import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import MemeGeneratorClient from "./client"

export const metadata: Metadata = {
    title: "Meme Generator | Create Viral Memes Online | OpenToolBox",
    description: "Create funny memes with our free online meme maker. Thousands of templates, custom image uploads, and premium font customization without watermarks.",
    keywords: ["meme generator", "online meme maker", "free meme creator", "custom memes", "trending meme templates"],
}

export default function MemeGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Meme Generator | Create Viral Memes Online | OpenToolBox","description":"Create funny memes with our free online meme maker. Thousands of templates, custom image uploads, and premium font customization without watermarks.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <MemeGeneratorClient />
        </>
    )
}
