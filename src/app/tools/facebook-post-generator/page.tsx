import { Metadata } from "next"
import FacebookPostGeneratorClient from "./client"

export const metadata: Metadata = {
    title: "Fake Facebook Post Generator | Create Facebook Mockups",
    description: "Create realistic fake Facebook posts for memes, pranks, or social media planning. Customize text, images, reactions, and comments.",
    keywords: ["fake facebook post", "facebook mockup generator", "social media simulator", "fake social media", "facebook post creator"]
}

export default function FacebookPostGeneratorPage() {
    return <FacebookPostGeneratorClient />
}
