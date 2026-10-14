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
      results = results.concat(getFiles(fullPath));
    } else {
      results.push({ path: fullPath, size: s.size });
    }
  }
  return results;
}

const imageFiles = getFiles('public/images');
console.log(`Total image files found in public/images: ${imageFiles.length}`);

// Sort descending by size
imageFiles.sort((a, b) => b.size - a.size);

console.log('\nTop 10 Largest Images in public/images/:');
imageFiles.slice(0, 10).forEach((img, i) => {
  const rel = path.relative('public', img.path).replace(/\\/g, '/');
  const kb = (img.size / 1024).toFixed(1);
  console.log(`${i + 1}. ${rel} — ${kb} KB (${img.size} bytes)`);
});

// Check properties dataset image references
const propertiesFile = fs.readFileSync('src/data/properties.ts', 'utf-8');
const imageMatches = propertiesFile.match(/\/images\/properties\/[^'"]+/g) || [];
const uniqueRefs = [...new Set(imageMatches)];

console.log(`\nUnique image references in src/data/properties.ts: ${uniqueRefs.length}`);

let missingCount = 0;
for (const ref of uniqueRefs) {
  const localPath = path.join('public', ref.replace(/^\//, ''));
  if (!fs.existsSync(localPath)) {
    console.log(`[MISSING]: ${ref} (expected at ${localPath})`);
    missingCount++;
  }
}

if (missingCount === 0) {
  console.log(`[PASS] All ${uniqueRefs.length} referenced property images exist locally on disk!`);
} else {
  console.log(`[FAIL] ${missingCount} property images are missing!`);
}
