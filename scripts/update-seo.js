const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const tools = fs.readdirSync(toolsDir).filter(file => fs.statSync(path.join(toolsDir, file)).isDirectory());

console.log(`Scanning ${tools.length} tools...`);

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

tools.forEach(tool => {
    if (tool === 'video-enhancer') return;

    const pagePath = path.join(toolsDir, tool, 'page.tsx');
    if (!fs.existsSync(pagePath)) return;

    let content = fs.readFileSync(pagePath, 'utf8');

    // Skip if already has JSON-LD
    if (content.includes('application/ld+json')) {
        skippedCount++;
        return;
    }

    // Parse metadata again
    let description = '';
    const descMatch = content.match(/description:\s*["']([^"']+)["']/);
    if (descMatch) description = descMatch[1];

    // Fallback title from directory name if not found/parsed
    let title = tool.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) title = titleMatch[1];

    const cleanTitle = title.split(' - ')[0];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": cleanTitle,
        "description": description || `${cleanTitle} tool`,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any (Web Browser)",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "featureList": [
            "Free Online Tool",
            "Client-side Processing",
            "No Registration Required",
            "Privacy Focused"
        ]
    };
    const jsonLdString = JSON.stringify(jsonLd);

    // Fix regex for Client import
    // Matches: import Client from "./client" OR import SomethingClient from "./client"
    const importMatch = content.match(/import\s+(\w+)\s+from\s+['"]\.\/client['"]/);

    if (importMatch) {
        const clientName = importMatch[1];

        // Find usages
        // <Client />
        // <Client
        const componentRegex = new RegExp(`<${clientName}(\\s|/|>)`);

        if (content.match(componentRegex)) {
            // Replace `return <Client` with `return (<><script.../><Client`
            // But we need to handle `return (`

            // Re-read content to ensure clean state

            // Strategy: replace the component tag with the wrapped version via function replacement
            // We use specific enough regex to match the start of the component

            // Handle: return <Client />
            // Handle: return (<Client />)

            // Robust approach: find the specific string `<Client` inside the return statement? 
            // Hard to identify return statement without parser.

            // Just replace the component globally in the file? 
            // Verify if it is used multiple times? Usually once in default export.

            // Regex to match the component start
            // capture the whole tag? No, just start.

            // We replace `<Client` with `<><script .../><Client`
            // AND we need to close it with `</>` after the component closes.
            // This is hard with regex because matching closing tag is hard.

            // Alternative: Inject BEFORE the component if inside a Fragment/Div?
            // Most pages are `return <Client />`.
            // So replacing `return <Client` with `return (<><script.../><Client` and appending `</>)` at the end of the return match?

            // START SIMPLE: 
            // If `return <Client ... />` (one line/simple)

            const simpleReturnRegex = new RegExp(`return\\s+<${clientName}([^>]*)/>`, 's');
            // Matches `return <Client />`

            const wrappedReturnRegex = new RegExp(`return\\s*\\(\\s*<${clientName}([^>]*)/>\\s*\\)`, 's');
            // Matches `return (<Client />)`

            if (content.match(simpleReturnRegex)) {
                const newContent = content.replace(simpleReturnRegex, `return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(${jsonLdString})
                }}
            />
            <${clientName}$1/>
        </>
    )`);
                fs.writeFileSync(pagePath, newContent);
                console.log(`[${tool}] UPDATED (Simple Return)`);
                updatedCount++;
            } else if (content.match(wrappedReturnRegex)) {
                const newContent = content.replace(wrappedReturnRegex, `return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(${jsonLdString})
                }}
            />
            <${clientName}$1/>
        </>
    )`);
                fs.writeFileSync(pagePath, newContent);
                console.log(`[${tool}] UPDATED (Wrapped Return)`);
                updatedCount++;
            } else {
                console.warn(`[${tool}] ERROR: Complex return statement`);
                errorCount++;
            }
        } else {
            console.warn(`[${tool}] ERROR: Component usage not found`);
            errorCount++;
        }
    } else {
        console.warn(`[${tool}] ERROR: Import not found`);
        errorCount++;
    }
});

console.log(`\nSummary:`);
console.log(`Updated: ${updatedCount}`);
console.log(`Skipped: ${skippedCount}`);
console.log(`Errors: ${errorCount}`);
