import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const manifestPath = path.join(__dirname, 'image-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log(`Starting image download pipeline for ${manifest.length} manifest entries...`);

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: HTTP ${res.status} ${res.statusText}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`Invalid content-type for ${url}: expected image/*, received ${contentType}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function run() {
  let successCount = 0;
  const credits = [];

  for (const item of manifest) {
    const isSite = item.propertyId === 'site';
    const targetDir = isSite
      ? path.join(projectRoot, 'public', 'images', 'site')
      : path.join(projectRoot, 'public', 'images', 'properties', item.propertyId);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const largeFile = path.join(targetDir, `${item.filename}.webp`);
    const smallFile = path.join(targetDir, `${item.filename}-sm.webp`);

    const largeUrl = `https://images.unsplash.com/${item.unsplashId}?auto=format&fit=crop&w=1600&q=75&fm=webp`;
    const smallUrl = `https://images.unsplash.com/${item.unsplashId}?auto=format&fit=crop&w=800&q=75&fm=webp`;

    console.log(`[${item.propertyId}] Downloading ${item.filename} (large & small)...`);

    try {
      await downloadImage(largeUrl, largeFile);
      await downloadImage(smallUrl, smallFile);
      successCount++;
    } catch (err) {
      console.error(`Error downloading image for ${item.id} (${item.unsplashId}):`, err.message);
      process.exit(1);
    }

    credits.push({
      propertyId: item.propertyId,
      filename: item.filename,
      role: item.role,
      photographer: item.photographer,
      unsplashUrl: item.unsplashUrl,
      alt: item.alt,
    });
  }

  // Generate src/data/image-credits.md
  const creditsMarkdown = `# Image Credits & Unsplash Attribution

All photography used in this demonstration is sourced from [Unsplash](https://unsplash.com) under the free [Unsplash License](https://unsplash.com/license) (free for commercial and non-commercial use, no attribution required, but credited here for transparency).

| Property / Section | Filename | Role | Photographer | Source Link |
| :--- | :--- | :--- | :--- | :--- |
${credits
  .map(
    (c) =>
      `| \`${c.propertyId}\` | \`${c.filename}.webp\` | ${c.role} | ${c.photographer} | [Unsplash Photo](${c.unsplashUrl}) |`
  )
  .join('\n')}

---

*Pipeline generated on ${new Date().toISOString().split('T')[0]} using \`scripts/fetch-images.mjs\`.*
`;

  const creditsPath = path.join(projectRoot, 'src', 'data', 'image-credits.md');
  fs.writeFileSync(creditsPath, creditsMarkdown, 'utf8');
  console.log(`Generated credits file at ${creditsPath}`);
  console.log(`Successfully downloaded all ${successCount * 2} files for ${successCount} entries!`);
}

run().catch((err) => {
  console.error('Pipeline execution error:', err);
  process.exit(1);
});
