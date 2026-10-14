import fs from 'fs';
import path from 'path';

const roots = ['src', 'public', 'index.html'];

const forbiddenTerms = [
  'fetch(',
  'axios',
  'XMLHttpRequest',
  'WebSocket',
  'EventSource',
  'firebase',
  'supabase',
  'prisma',
  'express',
  'localhost:',
  'apiKey',
  'secret',
  'token',
  'process.env',
  'mailto:',
  'http://',
  'unsplash.com',
  'USD',
  'award',
  'years of experience',
  'happy clients',
  '5-star',
  'trusted by',
  'licensed',
  'verified',
  'guaranteed',
  '#1',
];

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const stat = fs.statSync(dir);
  if (!stat.isDirectory()) return [dir];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const s = fs.statSync(fullPath);
    if (s.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        results = results.concat(getFiles(fullPath));
      }
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = [];
for (const r of roots) {
  allFiles.push(...getFiles(r));
}

console.log(`Scanning ${allFiles.length} files across src/, public/, index.html...\n`);

const findings = {};

for (const term of forbiddenTerms) {
  findings[term] = [];
}

const currencyDollarFindings = [];

for (const file of allFiles) {
  // Only scan text files
  const ext = path.extname(file).toLowerCase();
  if (!['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.json', '.svg'].includes(ext)) {
    continue;
  }

  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Check forbidden terms (case-insensitive for claims)
    for (const term of forbiddenTerms) {
      const isCaseInsensitive = ['award', 'years of experience', 'happy clients', '5-star', 'trusted by', 'licensed', 'verified', 'guaranteed', '#1', 'usd'].includes(term.toLowerCase());
      const matched = isCaseInsensitive
        ? line.toLowerCase().includes(term.toLowerCase())
        : line.includes(term);

      if (matched) {
        // Exclude svg xmlns or harmless xml schemas if http://www.w3.org
        if (term === 'http://' && line.includes('http://www.w3.org/2000/svg')) {
          continue;
        }
        findings[term].push({ file, line: idx + 1, text: line.trim() });
      }
    }

    // Check $ sign: look for currency usage like $100, $ 100, $50k etc. (exclude JS template literals ${...})
    const dollarMatches = line.match(/\$[0-9]/g);
    if (dollarMatches) {
      currencyDollarFindings.push({ file, line: idx + 1, text: line.trim() });
    }
  });
}

console.log('=== FORBIDDEN TERM SCAN RESULTS ===');
let totalHits = 0;
for (const [term, hits] of Object.entries(findings)) {
  if (hits.length > 0) {
    console.log(`\n[!] "${term}": ${hits.length} hit(s)`);
    hits.forEach(h => console.log(`   ${h.file}:${h.line} -> ${h.text}`));
    totalHits += hits.length;
  } else {
    console.log(`[PASS] "${term}": 0 hits`);
  }
}

console.log('\n=== CURRENCY $ SIGN SCAN (e.g. $100) ===');
if (currencyDollarFindings.length > 0) {
  console.log(`Found ${currencyDollarFindings.length} currency dollar occurrences:`);
  currencyDollarFindings.forEach(h => console.log(`   ${h.file}:${h.line} -> ${h.text}`));
  totalHits += currencyDollarFindings.length;
} else {
  console.log('[PASS] Currency $ sign: 0 hits');
}

console.log(`\nScan complete. Total potential violations: ${totalHits}`);
