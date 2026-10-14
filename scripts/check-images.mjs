import fs from 'fs';
import path from 'path';

// Load properties.ts
const propertiesFilePath = path.resolve('src/data/properties.ts');
const propertiesFile = fs.readFileSync(propertiesFilePath, 'utf8');

// Extract all image objects from properties.ts
const matches = [...propertiesFile.matchAll(/src:\s*'([^']+)',\s*srcSmall:\s*'([^']+)'/g)];

console.log(`Auditing ${matches.length} property images in src/data/properties.ts...`);

const failures = [];
let audited = 0;

function checkWebpFile(relPath, label) {
  audited++;
  const fullPath = path.resolve('public' + relPath);
  if (!fs.existsSync(fullPath)) {
    failures.push({ path: relPath, label, reason: 'File does not exist' });
    return;
  }
  const stat = fs.statSync(fullPath);
  if (stat.size === 0) {
    failures.push({ path: relPath, label, reason: 'File is 0 bytes' });
    return;
  }
  const fd = fs.openSync(fullPath, 'r');
  const buffer = Buffer.alloc(12);
  fs.readSync(fd, buffer, 0, 12, 0);
  fs.closeSync(fd);

  // Check WebP RIFF header: "RIFF" at 0..4 and "WEBP" at 8..12
  const isRiff = buffer.toString('ascii', 0, 4) === 'RIFF';
  const isWebp = buffer.toString('ascii', 8, 12) === 'WEBP';
  if (!isRiff || !isWebp) {
    failures.push({ path: relPath, label, reason: 'Invalid WebP header (not RIFF...WEBP)' });
  }
}

// 1. Audit all properties
for (const match of matches) {
  const [, src, srcSmall] = match;
  checkWebpFile(src, 'src');
  checkWebpFile(srcSmall, 'srcSmall');
}

// 2. Audit site images in public/images/site
const siteImages = [
  '/images/site/hero.webp',
  '/images/site/hero-sm.webp',
];
for (const img of siteImages) {
  checkWebpFile(img, 'site');
}

// 3. Check property folder names match P-001 ... P-015
const propertiesDir = path.resolve('public/images/properties');
const folders = fs.readdirSync(propertiesDir);
const expectedFolders = Array.from({ length: 15 }, (_, i) => `P-${String(i + 1).padStart(3, '0')}`);

for (const expected of expectedFolders) {
  if (!folders.includes(expected)) {
    failures.push({ path: `/images/properties/${expected}`, label: 'folder', reason: 'Missing folder for property' });
  }
}

console.log(`\nAudited ${audited} image files.`);
if (failures.length > 0) {
  console.error('\nFAILURE TABLE:');
  console.table(failures);
  process.exit(1);
} else {
  console.log('✓ All image files exist, have non-zero size, and have valid RIFF....WEBP headers.');
  console.log('✓ All property folders P-001 through P-015 exist.');
}
