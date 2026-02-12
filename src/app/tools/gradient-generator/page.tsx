import { constructMetadata } from "@/lib/seo"
import GradientGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "CSS Gradient Generator - Linear & Radial Gradients",
    description: "Create beautiful CSS gradients visually. Generate code for linear and radial gradients. Randomize colors for inspiration.",
    keywords: ["css gradient generator", "gradient generator", "css background generator", "css gradient maker", "web design tools", "linear gradient"]
})

export default function GradientGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"CSS Gradient Generator","description":"Create beautiful CSS gradients visually. Generate code for linear and radial gradients. Randomize colors for inspiration.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <GradientGeneratorClient />
        </>
    )
}
