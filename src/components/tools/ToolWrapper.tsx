import { ShareButton } from "@/components/tools/ShareButton"
import { Separator } from "@/components/ui/separator"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { DonationSection } from "@/components/common/DonationSection"

import { cn } from "@/lib/utils"

interface ToolWrapperProps {
    title: string
    description: string
    children: React.ReactNode
    adSlot?: string
    toolSlug?: string
    className?: string // Added for width customization
}

export function ToolWrapper({
    title,
    description,
    children,
    adSlot = "1234567890",
    toolSlug,
    className,
}: ToolWrapperProps) {
    return (
        <div className={cn("mx-auto max-w-4xl space-y-2 md:space-y-6", className)}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-4 text-center md:text-left">
                    {toolSlug && (
                        <div className="flex justify-center md:justify-start">
                            <a
                                href="/tools"
                                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                Back to Tools
                            </a>
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold tracking-tighter md:text-4xl text-foreground">
                            {title}
                        </h1>
                        <p className="text-lg text-muted-foreground mt-2">{description}</p>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end shrink-0 pt-2">
                    <ShareButton title={title} text={description} />
                </div>
            </div>

            <Separator />

            <div className="min-w-0 space-y-6">
                {children}
            </div>

            {toolSlug && (
                <div className="mt-20">
                    <Separator className="mb-10" />
                    <RelatedTools currentSlug={toolSlug} />
                </div>
            )}

            <div className="mt-12">
                <DonationSection />
            </div>

            {/* <div className="mt-12">
                <AdBanner slot="bottom-ad" />
            </div> */}
        </div>
    )
}
