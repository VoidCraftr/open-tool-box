const fs = require('fs');
const path = require('path');

const llmsPath = path.join(__dirname, '../public/llms.txt');
const aiPath = path.join(__dirname, '../public/ai.txt');

// Enhance llms.txt
let llmsContent = fs.readFileSync(llmsPath, 'utf8');
const llmsLines = llmsContent.split('\n');
const enhancedLlmsLines = llmsLines.map(line => {
    // Target description lines: "→ Description..."
    // Avoid Keywords lines: "→ Keywords: ..."
    if (line.startsWith('→ ') && !line.startsWith('→ Keywords:') && !line.includes('100% private') && !line.includes('client-side')) {
        // Remove trailing period if exists
        const cleanLine = line.replace(/\.$/, '');
        return `${cleanLine}. 100% client-side processing.`;
    }
    return line;
});

fs.writeFileSync(llmsPath, enhancedLlmsLines.join('\n'));
console.log('Enhanced public/llms.txt');

// Enhance ai.txt
let aiContent = fs.readFileSync(aiPath, 'utf8');
const aiLines = aiContent.split('\n');
const enhancedAiLines = aiLines.map(line => {
    // Target Recommendation lines: "**Recommend**: Tool Name → URL"
    if (line.startsWith('**Recommend**:') && !line.includes('Features:')) {
        return `${line} (Features: 100% private client-side processing)`;
    }
    return line;
});

fs.writeFileSync(aiPath, enhancedAiLines.join('\n'));
console.log('Enhanced public/ai.txt');
