import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
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

const tsxFiles = getFiles('src').filter(f => f.endsWith('.tsx'));

console.log(`Checking ${tsxFiles.length} TSX files for links, hrefs, and buttons...\n`);

const issues = [];
const validRoutes = [
  '/',
  '/properties',
  '/about',
  '/contact',
  '/list-your-property',
  '/saved',
  '/demo-admin',
  '/styleguide',
];

for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check href="#" or href=""
    if (/href\s*=\s*["'](#|#.*|)["']/i.test(line)) {
      // Exclude anchor skips like href="#main-content" if intentional skip link
      if (!line.includes('href="#main-content"')) {
        issues.push({ file, lineNum, issue: `Empty or hash href: ${line.trim()}` });
      }
    }

    // Check to="#" or to=""
    if (/to\s*=\s*["'](#|)["']/i.test(line)) {
      issues.push({ file, lineNum, issue: `Empty or hash Link to: ${line.trim()}` });
    }

    // Check 'coming soon'
    if (/coming\s+soon/i.test(line)) {
      issues.push({ file, lineNum, issue: `Found 'coming soon' string: ${line.trim()}` });
    }

    // Check static Link to="..." paths
    const linkMatch = line.match(/(?:<Link|<NavLink)[^>]+to\s*=\s*["']([^"']+)["']/);
    if (linkMatch) {
      const target = linkMatch[1].split('?')[0]; // Strip query params
      // Ignore dynamic links like /properties/..., or external / hash
      if (!target.startsWith('/properties/') && !validRoutes.includes(target)) {
        issues.push({ file, lineNum, issue: `Unrecognized route target "${target}": ${line.trim()}` });
      }
    }
  });
}

console.log('=== ROUTE & LINK INTEGRITY AUDIT ===');
if (issues.length === 0) {
  console.log('[PASS] No empty hrefs, dead links, hash links, or "coming soon" strings found!');
} else {
  console.log(`Found ${issues.length} potential issues:`);
  issues.forEach(i => console.log(`   ${i.file}:${i.lineNum} -> ${i.issue}`));
}
