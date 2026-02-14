import { Metadata } from "next"
import LinkedinPostGeneratorClient from "./client"

export const metadata: Metadata = {
    title: "Fake LinkedIn Post Generator | Create LinkedIn Mockups",
    description: "Create realistic fake LinkedIn posts for memes, pranks, or social media planning. Customize text, images, reactions, and connections.",
    keywords: ["fake linkedin post", "linkedin mockup generator", "social media simulator", "fake social media", "linkedin post creator"]
}

export default function LinkedinPostGeneratorPage() {
    return <LinkedinPostGeneratorClient />
}
