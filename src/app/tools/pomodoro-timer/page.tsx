import { constructMetadata } from "@/lib/seo"
import PomodoroTimerClient from "./client"

export const metadata = constructMetadata({
    title: "Pomodoro Timer - Focus & Productivity Timer",
    description: "Boost your productivity with our free online Pomodoro Timer. Customizable focus intervals, short breaks, and long breaks. Stay focused.",
    keywords: ["pomodoro timer", "focus timer", "productivity timer", "tomato timer", "study timer", "work timer"]
})

export default function PomodoroTimerPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Pomodoro Timer","description":"Boost your productivity with our free online Pomodoro Timer. Customizable focus intervals, short breaks, and long breaks. Stay focused.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <PomodoroTimerClient />
        </>
    )
}
