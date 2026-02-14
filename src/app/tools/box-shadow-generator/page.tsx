import { constructMetadata } from "@/lib/seo"
import BoxShadowGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "CSS Box Shadow Generator - Visual CSS Shadow Tool",
    description: "Create beautiful CSS box shadows visually. Customizable blur, spread, color, and opacity. Generate CSS shadow code instantly.",
    keywords: ["box shadow generator", "css box shadow", "css shadow generator", "shadow maker", "web design tools", "css generator"]
})

export default function BoxShadowGeneratorPage() {
    return <BoxShadowGeneratorClient />
}
