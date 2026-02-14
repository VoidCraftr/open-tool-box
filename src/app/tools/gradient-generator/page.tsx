import { constructMetadata } from "@/lib/seo"
import GradientGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "CSS Gradient Generator - Linear & Radial Gradients",
    description: "Create beautiful CSS gradients visually. Generate code for linear and radial gradients. Randomize colors for inspiration.",
    keywords: ["css gradient generator", "gradient generator", "css background generator", "css gradient maker", "web design tools", "linear gradient"]
})

export default function GradientGeneratorPage() {
    return <GradientGeneratorClient />
}
