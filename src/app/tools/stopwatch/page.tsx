import { constructMetadata } from "@/lib/seo"
import StopwatchClient from "./client"

export const metadata = constructMetadata({
    title: "Online Stopwatch & Timer - Countdown with Laps",
    description: "Free online precision stopwatch with lap tracking and customizable countdown timer. Accurate milliseconds timing for workouts and productivity.",
    keywords: ["online stopwatch", "countdown timer", "timer online", "stopwatch with laps", "pomodoro timer", "browser timer"]
})

export default function StopwatchPage() {
    return <StopwatchClient />
}
