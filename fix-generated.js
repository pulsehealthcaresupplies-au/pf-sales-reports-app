const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/graphql/generated/hooks.ts');

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove existing 'use client' directives
    content = content.replace(/'use client';/g, '');
    content = content.replace(/"use client";/g, '');

    // Prepend 'use client'
    content = "'use client';\n" + content;

    fs.writeFileSync(filePath, content);
    console.log('Fixed use client directive in hooks.ts');
} else {
    console.log('hooks.ts not found');
}
