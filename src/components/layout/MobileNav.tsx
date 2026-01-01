"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Package2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"

import { categories, tools } from "@/config/tools"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function MobileNav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 flex flex-col h-full w-[300px] sm:w-[350px]">
                <SheetHeader className="px-1">
                    <SheetTitle className="text-left">
                        <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                            <Package2 className="mr-2 h-4 w-4" />
                            <span className="font-bold">OpenToolbox</span>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto -ml-6 pl-6 pr-6 py-2">
                    <div className="flex flex-col space-y-4 pb-10">
                        {categories.map((category) => (
                            <div key={category.id} className="py-2">
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider">
                                    <category.icon className="h-4 w-4" /> {category.label}
                                </h4>
                                <div className="flex flex-col space-y-1 pl-4 border-l">
                                    {tools.filter(t => t.category === category.id).map(tool => (
                                        <Link
                                            key={tool.slug}
                                            href={`/tools/${tool.slug}`}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                "block py-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm",
                                                pathname.includes(tool.slug) && "text-primary font-medium"
                                            )}
                                        >
                                            {tool.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
