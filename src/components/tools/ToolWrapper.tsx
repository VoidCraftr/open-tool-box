import { Separator } from "@/components/ui/separator"
import { AdBanner } from "@/components/ads/AdBanner"
import { RelatedTools } from "@/components/tools/RelatedTools"

interface ToolWrapperProps {
    title: string
    description: string
    children: React.ReactNode
    adSlot?: string
    toolSlug?: string // Added for RelatedTools
}

export function ToolWrapper({
    title,
    description,
    children,
    adSlot = "1234567890", // Default test slot
    toolSlug,
}: ToolWrapperProps) {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="space-y-2 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {title}
                </h1>
                <p className="text-lg text-muted-foreground">{description}</p>
            </div>

            <Separator />

            <div className="min-w-0 space-y-6">
                {children}
            </div>

            {toolSlug && (
                <div className="mt-16">
                    <RelatedTools currentSlug={toolSlug} />
                </div>
            )}

            {/* <div className="mt-12">
                <AdBanner slot="bottom-ad" />
            </div> */}
        </div>
    )
}
