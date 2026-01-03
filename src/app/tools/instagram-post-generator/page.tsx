import { Metadata } from "next"
import InstagramPostGeneratorClient from "./client"

export const metadata: Metadata = {
    title: "Fake Instagram Post Generator | Create Instagram Mockups",
    description: "Create realistic fake Instagram posts for memes, pranks, or social media planning. 100% free and client-side.",
    keywords: ["fake instagram post", "instagram mockup generator", "social media simulator", "fake social media", "instagram post creator"]
}

export default function InstagramPostGeneratorPage() {
    return <InstagramPostGeneratorClient />
}
