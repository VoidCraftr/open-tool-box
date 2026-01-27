"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function LaunchShowcase() {
    const launches = [
        {
            name: "Peerlist",
            url: "https://peerlist.io/satyamagarwalin/project/opentoolbox",
            color: "hover:text-[#00aa45]",
            logo: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                    <path d="M21.6 0H2.4C1.08 0 0 1.08 0 2.4v19.2C0 22.92 1.08 24 2.4 24h19.2c1.32 0 2.4-1.08 2.4-2.4V2.4C24 1.08 22.92 0 21.6 0zM12 18h-3v-3h3v3zm0-4.5h-3v-3h3v3zm0-4.5h-3V6h3v3z" fill="#00AA45" />
                    {/* Fallback geometric iconic P style or specific simple shape if exact logo path is unavailable/copyrighted - simple geometric abstraction */}
                    <rect x="2" y="2" width="20" height="20" rx="4" fill="#00aa45" />
                    <path d="M16 8H8v8h3v-2.5h2.5c1.38 0 2.5-1.12 2.5-2.5S14.88 8 13.5 8z" fill="white" />
                </svg>
            )
        },
        {
            name: "Product Hunt",
            url: "https://producthunt.com/products/opentoolbox",
            color: "hover:text-[#DA552F]",
            logo: (
                <svg viewBox="0 0 40 40" className="h-8 w-8 fill-[#DA552F]">
                    <path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20zm-20-8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 12c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
                </svg>
            )
        },
        {
            name: "SaaSHub",
            url: "https://www.saashub.com/opentoolbox-alternatives",
            color: "hover:text-[#2d3388]",
            logo: (
                <svg viewBox="0 0 76 76" className="h-8 w-8 fill-[#2d3388]">
                    <path d="M57.7 54.7c-5.8 4.7-14 4.5-19.4 0l-3.2-2.7c-2.7-2.2-6.5-2.2-9.2 0l-3.2 2.7c-5.4 4.5-13.6 4.7-19.4 0-5.8-4.7-5.8-12.3 0-17l3.2-2.7c2.7-2.2 6.5-2.2 9.2 0l3.2 2.7c5.4-4.5 13.6-4.7 19.4 0 2.2 1.8 3.8 4.2 4.6 6.9 1.1-.9 2.3-1.7 3.6-2.3-1.3-4.5-4-8.5-7.7-11.6-9.1-7.4-23.2-7.4-32.3 0-9.1 7.4-9.1 19.4 0 26.8 9.1 7.4 23.2 7.4 32.3 0 1.2-1 2.4-2.1 3.4-3.3-1.5-1-2.9-2.1-4.3-3.4 0 0-.1 0 0 .9z" />
                    <path d="M38 0C17 0 0 17 0 38s17 38 38 38 38-17 38-38S59 0 38 0zm0 66.5C22.3 66.5 9.5 53.7 9.5 38S22.3 9.5 38 9.5 66.5 22.3 66.5 38 53.7 66.5 38 66.5z" />
                </svg>
            )
        },
        {
            name: "DevHunt",
            url: "https://devhunt.org/tool/opentoolbox",
            color: "hover:text-[#3b82f6]", // Standard DevHunt Blue/Purple
            logo: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5L3 8.75v10.5l9 4.5 9-4.5V8.75L12 13.5z" />
                    {/* Simplified "Cube/Box" logo representing dev tools/packages if exact logo unavailable, or a rocket icon */}
                </svg>
            )
        }
    ];

    // Repeat content enough times to ensure it fills widespread screens before looping
    const marqueeGroup = [...launches, ...launches, ...launches, ...launches];

    return (
        <section className="py-20 overflow-hidden bg-muted/5 border-y border-white/5 relative">
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div className="container px-4 mx-auto text-center mb-10 relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Launch Partners
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured On</h2>
            </div>

            <div className="flex overflow-hidden mask-gradient-x select-none">
                {/* Track 1 */}
                <div className="flex shrink-0 animate-scroll py-4 items-center min-w-full justify-around">
                    {marqueeGroup.map((item, index) => (
                        <Link
                            key={`t1-${index}`}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mx-8 flex items-center gap-3 text-2xl font-bold text-muted-foreground transition-all duration-300 ${item.color} grayscale hover:grayscale-0 hover:scale-105`}
                        >
                            {item.logo}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
                {/* Track 2 */}
                <div className="flex shrink-0 animate-scroll py-4 items-center min-w-full justify-around" aria-hidden="true">
                    {marqueeGroup.map((item, index) => (
                        <Link
                            key={`t2-${index}`}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mx-8 flex items-center gap-3 text-2xl font-bold text-muted-foreground transition-all duration-300 ${item.color} grayscale hover:grayscale-0 hover:scale-105`}
                        >
                            {item.logo}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
