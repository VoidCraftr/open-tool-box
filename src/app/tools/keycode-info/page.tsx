import { constructMetadata } from "@/lib/seo"
import KeycodeInfoClient from "./client"

export const metadata = constructMetadata({
    title: "Keycode Info - JavaScript Event KeyCodes & Key Values",
    description: "Get JavaScript event keycodes, key values, and code properties instantly by pressing any key. Essential tool for web developers.",
    keywords: ["keycode info", "javascript keycode", "event keycode", "keyboard event", "key value", "javascript key event"]
})

export default function KeycodeInfoPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Keycode Info","description":"Get JavaScript event keycodes, key values, and code properties instantly by pressing any key. Essential tool for web developers.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <KeycodeInfoClient />
        </>
    )
}
