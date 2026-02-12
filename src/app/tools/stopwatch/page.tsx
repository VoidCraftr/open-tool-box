import { constructMetadata } from "@/lib/seo"
import StopwatchClient from "./client"

export const metadata = constructMetadata({
    title: "Online Stopwatch & Timer - Countdown with Laps",
    description: "Free online precision stopwatch with lap tracking and customizable countdown timer. Accurate milliseconds timing for workouts and productivity.",
    keywords: ["online stopwatch", "countdown timer", "timer online", "stopwatch with laps", "pomodoro timer", "browser timer"]
})

export default function StopwatchPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Online Stopwatch & Timer","description":"Free online precision stopwatch with lap tracking and customizable countdown timer. Accurate milliseconds timing for workouts and productivity.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <StopwatchClient />
        </>
    )
}
