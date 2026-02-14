import { constructMetadata } from "@/lib/seo"
import WordCounterClient from "./client"

export const metadata = constructMetadata({
    title: "Word Counter - Count Words, Characters & Sentences Online",
    description: "Free online word counter and character counter. Calculate reading time, speaking time, and keyword density instantly. Secure client-side analysis.",
    keywords: ["word counter", "character count", "sentence counter", "reading time calculator", "keyword density", "text analysis"]
})

export default function WordCounterPage() {
    return <WordCounterClient />
}
