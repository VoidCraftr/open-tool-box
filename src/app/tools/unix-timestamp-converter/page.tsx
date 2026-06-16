import { constructMetadata } from "@/lib/seo"
import UnixTimestampClient from "./client"

export const metadata = constructMetadata({
    title: "Unix Timestamp Converter - Epoch to ISO8601 Online",
    description: "Free online Unix timestamp converter. Convert epoch seconds, milliseconds, or microseconds to human-readable dates (ISO8601) and vice-versa instantly.",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "unix time to iso8601", "developer tools", "epoch time"]
})

export default function UnixTimestampPage() {
    return <UnixTimestampClient />
}
