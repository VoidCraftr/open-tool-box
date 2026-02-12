"use client";

import Link from "next/link";

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
        },
        {
            name: "GoodFirms",
            url: "https://www.goodfirms.co/software/opentoolbox",
            color: "hover:text-[#DBB879]", // GoodFirms Gold
            logo: (
                <svg viewBox="0 0 144 144" fill="none" className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.4072 46.9577H72.1071H113.807V32.6438C113.807 27.7387 109.825 23.77 104.903 23.77C104.903 23.77 80.2949 24.5727 72.1071 24.5727C63.9192 24.5727 39.311 23.77 39.311 23.77C34.3893 23.77 30.4072 27.7387 30.4072 32.6438V46.9577Z" fill="#DBB879" />
                    <path d="M41.4586 104.658L56.2683 115.449C65.7089 122.317 78.55 122.317 87.9906 115.449L102.8 104.658C109.735 99.6194 113.852 91.5929 113.852 83.0313V32.286C113.852 27.3809 109.825 23.5461 104.948 23.769L98.2814 24.5271C80.9213 26.4891 63.3823 26.4891 46.0223 24.5271L39.311 23.769C34.434 23.5906 30.4072 27.4255 30.4072 32.286V82.9867C30.4072 91.5483 34.5235 99.6194 41.4586 104.658Z" fill="url(#paint0_linear_1174_12757)" />
                    <g opacity="0.2">
                        <path d="M89.5261 63.6343L81.7857 71.1703L83.6202 81.7831C83.7096 82.2291 83.4859 82.7196 83.128 82.9871C82.9043 83.1655 82.6358 83.2101 82.4121 83.2101C82.2331 83.2101 82.0094 83.1655 81.8305 83.0763L72.2556 78.082L62.636 83.0763C62.2333 83.2993 61.6964 83.2547 61.3385 82.9871C60.9358 82.7196 60.7568 82.2291 60.8463 81.7831L62.6807 71.1703L54.9403 63.6343C54.5824 63.3222 54.4929 62.8317 54.6271 62.3858C54.7613 61.9399 55.164 61.6277 55.6114 61.5385L66.3049 59.9778L71.0923 50.3014C71.495 49.4542 72.882 49.4542 73.3294 50.3014L78.1169 59.9778L88.8103 61.5385C89.2577 61.6277 89.6604 61.9399 89.7946 62.3858C89.9736 62.8317 89.8393 63.3222 89.5261 63.6343Z" fill="black" />
                    </g>
                    <path d="M89.5261 61.8507L81.7857 69.3866L83.6202 79.9995C83.7096 80.4454 83.4859 80.9359 83.128 81.2034C82.9043 81.3818 82.6358 81.4264 82.4121 81.4264C82.2331 81.4264 82.0094 81.3818 81.8305 81.2926L72.2556 76.2983L62.636 81.2926C62.2333 81.5156 61.6964 81.471 61.3385 81.2034C60.9358 80.9359 60.7568 80.4454 60.8463 79.9995L62.6807 69.3866L54.9403 61.8507C54.5824 61.5385 54.4929 61.048 54.6271 60.6021C54.7613 60.1562 55.164 59.844 55.6114 59.7548L66.3049 58.1941L71.0923 48.5178C71.495 47.6705 72.882 47.6705 73.3294 48.5178L78.1169 58.1941L88.8103 59.7548C89.2577 59.844 89.6604 60.1562 89.7946 60.6021C89.9736 61.048 89.8393 61.5385 89.5261 61.8507Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_1174_12757" x1="30.4072" y1="72.1762" x2="113.834" y2="72.1762" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#DCB45A" />
                            <stop offset="0.1499" stopColor="#CFA84F" />
                            <stop offset="0.4257" stopColor="#AD8733" />
                            <stop offset="0.5" stopColor="#A37D2B" />
                            <stop offset="0.5833" stopColor="#AD8634" />
                            <stop offset="0.8439" stopColor="#C69F4A" />
                            <stop offset="1" stopColor="#D0A853" />
                        </linearGradient>
                    </defs>
                </svg>

            )
        }
    ];

    // Repeat content enough times to ensure it fills widespread screens before looping
    const marqueeGroup = [...launches, ...launches, ...launches, ...launches];

    return (
        <section className="py-10 md:py-20 overflow-hidden bg-muted/5 border-y border-white/5 relative">
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
