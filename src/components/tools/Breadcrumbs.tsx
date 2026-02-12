"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { tools, categories } from "@/config/tools"

interface BreadcrumbsProps {
    toolSlug: string
}

export function Breadcrumbs({ toolSlug }: BreadcrumbsProps) {
    const tool = tools.find(t => t.slug === toolSlug)
    const category = tool ? categories.find(c => c.id === tool.category) : null

    if (!tool) return null

    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center text-sm text-muted-foreground"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
        >
            <div
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/ListItem"
                className="flex items-center"
            >
                <Link
                    href="/"
                    itemProp="item"
                    className="flex items-center hover:text-primary transition-colors"
                >
                    <Home className="h-3.5 w-3.5" />
                    <span itemProp="name" className="sr-only">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
            </div>

            <ChevronRight className="h-3.5 w-3.5 mx-2 text-muted-foreground/50" />

            <div
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/ListItem"
                className="flex items-center"
            >
                <Link
                    href="/tools"
                    itemProp="item"
                    className="hover:text-primary transition-colors"
                >
                    <span itemProp="name">Tools</span>
                </Link>
                <meta itemProp="position" content="2" />
            </div>

            {category && (
                <>
                    <ChevronRight className="h-3.5 w-3.5 mx-2 text-muted-foreground/50" />
                    <div
                        itemScope
                        itemProp="itemListElement"
                        itemType="https://schema.org/ListItem"
                        className="flex items-center"
                    >
                        <Link
                            href={`/tools#${category.id}`}
                            itemProp="item"
                            className="hover:text-primary transition-colors"
                        >
                            <span itemProp="name">{category.label}</span>
                        </Link>
                        <meta itemProp="position" content="3" />
                    </div>
                </>
            )}

            <ChevronRight className="h-3.5 w-3.5 mx-2 text-muted-foreground/50" />

            <div
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/ListItem"
                className="flex items-center"
            >
                <span itemProp="name" className="font-medium text-foreground">
                    {tool.name}
                </span>
                <meta itemProp="position" content={category ? "4" : "3"} />
            </div>
        </nav>
    )
}
