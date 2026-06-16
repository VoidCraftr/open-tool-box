export function AdBanner({
    slot,
    responsive = true,
    className = "",
}: {
    slot: string
    responsive?: boolean
    className?: string
}) {
    return (
        <div
            className={`relative my-8 overflow-hidden rounded-lg border bg-muted/50 p-4 text-center ${className}`}
        >
            <div className="flex min-h-[100px] w-full items-center justify-center text-sm text-muted-foreground">
                <span className="block">Ad Space (Slot: {slot})</span>
            </div>
            {/* 
        Actual AdSense Code Implementation Guide:
        1. Script is usually placed in layout or via next/script
        2. Here we would render the <ins> tag
      */}
            {/* <ins 
         className="adsbygoogle"
         style={{ display: "block" }}
         data-ad-client="ca-pub-XXXXXXXXXXXXX"
         data-ad-slot={slot}
         data-full-width-responsive={responsive}
      /> */}
        </div>
    )
}
