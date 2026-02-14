import { constructMetadata } from "@/lib/seo"
import JwtDecoderClient from "./client"

export const metadata = constructMetadata({
    title: "JWT Decoder - Decode JSON Web Tokens Online",
    description: "Decode JWT header and payload instantly. Debug JSON Web Tokens securely in your browser. No server-side processing.",
    keywords: ["jwt decoder", "decode jwt", "json web token", "jwt debugger", "jwt tool", "jwt claim viewer"]
})

export default function JwtDecoderPage() {
    return <JwtDecoderClient />
}
