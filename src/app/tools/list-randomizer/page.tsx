import { constructMetadata } from "@/lib/seo"
import ListRandomizerClient from "./client"

export const metadata = constructMetadata({
    title: "List Randomizer - Shuffle Lists Online",
    description: "Free online list randomizer. Shuffle lists, names, or choices instantly. Randomize the order of lines in a text file.",
    keywords: ["list randomizer", "shuffle list", "randomize list", "list shuffler", "random order generator", "text shuffler"]
})

export default function ListRandomizerPage() {
    return <ListRandomizerClient />
}
