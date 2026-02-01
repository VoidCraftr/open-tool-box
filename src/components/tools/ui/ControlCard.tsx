import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface ControlCardProps {
    title: string
    icon?: LucideIcon
    description?: string
    children: React.ReactNode
    className?: string
    contentClassName?: string
    rightElement?: React.ReactNode
}

export function ControlCard({
    title,
    icon: Icon,
    description,
    children,
    className,
    contentClassName,
    rightElement
}: ControlCardProps) {
    return (
        <Card className={cn("liquid-glass border-white/20 shadow-liquid overflow-hidden", className)}>
            <CardHeader className="pb-4 border-b border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground mr-2">
                        {Icon && <Icon className="w-4 h-4 text-primary" />}
                        {title}
                    </CardTitle>
                    {rightElement}
                </div>
                {description && <p className="text-[10px] text-muted-foreground font-medium">{description}</p>}
            </CardHeader>
            <CardContent className={cn("space-y-4 pt-4", contentClassName)}>
                {children}
            </CardContent>
        </Card>
    )
}
