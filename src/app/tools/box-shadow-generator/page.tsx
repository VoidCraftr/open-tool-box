import { constructMetadata } from "@/lib/seo"
import BoxShadowGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "CSS Box Shadow Generator - Visual CSS Shadow Tool",
    description: "Create beautiful CSS box shadows visually. Customizable blur, spread, color, and opacity. Generate CSS shadow code instantly.",
    keywords: ["box shadow generator", "css box shadow", "css shadow generator", "shadow maker", "web design tools", "css generator"]
})

export default function BoxShadowGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"CSS Box Shadow Generator","description":"Create beautiful CSS box shadows visually. Customizable blur, spread, color, and opacity. Generate CSS shadow code instantly.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <BoxShadowGeneratorClient />
        </>
    )
}
