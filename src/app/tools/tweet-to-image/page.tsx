import { constructMetadata } from "@/lib/seo"
import TweetToImageClient from "./client"

export const metadata = constructMetadata({
    title: "Fake Tweet Generator",
    description: "Create realistic fake tweets, replies, and threads. Perfect for memes and jokes. Customizable name, photo, and metrics.",
    keywords: ["fake tweet", "tweet generator", "twitter mockup", "social media simulator", "meme maker"]
})

export default function TweetToImagePage() {
    return <TweetToImageClient />
}
