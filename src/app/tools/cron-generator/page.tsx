import { CronGeneratorClient } from "./client"
import { constructMetadata } from "@/lib/seo"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export const metadata = constructMetadata({
    title: "Cron Expression Generator - OpenToolbox",
    description: "Create, explain, and schedule cron jobs with our interactive Cron Expression Generator. Preview next run dates instantly.",
    keywords: ["cron generator", "cron schedule", "cron expression", "crontab generator", "cron parser", "cron job"],
})

export default function CronGeneratorPage() {
    return (
        <ToolWrapper
            toolSlug="cron-generator"
            title="Cron Expression Generator"
            description="Create, explain, and schedule cron jobs with our interactive Cron Expression Generator."
        >
            <CronGeneratorClient />
        </ToolWrapper>
    )
}
