import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ToolsDashboard } from "./components/ToolsDashboard"

export const metadata = {
    title: "All Developer Tools - Dashboard | OpenToolBox",
    description: "Access our complete suite of developer utilities. Filter, search, and find the right tool instantly.",
}

export default function ToolsPage() {
    return (
        <ToolWrapper
            title="Tools Dashboard"
            description="Access our complete suite of 25+ developer utilities. Search, filter, and create."
            adSlot="tools-index"
            className="max-w-[1400px]" // Wider container for dashboard feel
        >
            <ToolsDashboard />
        </ToolWrapper>
    )
}
