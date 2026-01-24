"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { tools, categories } from "@/config/tools"

interface CommandMenuProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function CommandMenu({ open: externalOpen, onOpenChange: externalOnOpenChange }: CommandMenuProps) {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const router = useRouter()

    const open = externalOpen ?? internalOpen
    const setOpen = externalOnOpenChange ?? setInternalOpen

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(!open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [setOpen, open]) // Added open to dependency array

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [setOpen])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Tools">
                    {tools.map((tool) => (
                        <CommandItem
                            key={tool.slug}
                            value={tool.name}
                            onSelect={() => {
                                runCommand(() => router.push(`/tools/${tool.slug}`))
                            }}
                        >
                            <tool.icon className="mr-2 h-4 w-4" />
                            <span>{tool.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Categories">
                    {categories.map((cat) => (
                        <CommandItem
                            key={cat.id}
                            onSelect={() => {
                                runCommand(() => router.push(`/tools#${cat.id}`))
                            }}
                        >
                            <cat.icon className="mr-2 h-4 w-4" />
                            <span>{cat.label}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
