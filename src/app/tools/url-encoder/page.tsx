import { constructMetadata } from "@/lib/seo"
import UrlEncoderClient from "./client"

export const metadata = constructMetadata({
    title: "URL Encoder / Decoder - Encode & Decode URLs Online",
    description: "Free online URL encoder and decoder. Convert text to percent-encoded format and back. Essential tool for web developers.",
    keywords: ["url encoder", "url decoder", "percent encoding", "encode url", "decode url", "url escape"]
})

export default function UrlEncoderPage() {
    return <UrlEncoderClient />
}
