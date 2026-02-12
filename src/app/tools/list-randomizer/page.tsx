import { constructMetadata } from "@/lib/seo"
import ListRandomizerClient from "./client"

export const metadata = constructMetadata({
    title: "List Randomizer - Shuffle Lists Online",
    description: "Free online list randomizer. Shuffle lists, names, or choices instantly. Randomize the order of lines in a text file.",
    keywords: ["list randomizer", "shuffle list", "randomize list", "list shuffler", "random order generator", "text shuffler"]
})

export default function ListRandomizerPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"List Randomizer","description":"Free online list randomizer. Shuffle lists, names, or choices instantly. Randomize the order of lines in a text file.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <ListRandomizerClient />
        </>
    )
}
