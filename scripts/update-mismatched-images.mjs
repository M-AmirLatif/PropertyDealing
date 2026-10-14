import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const manifestPath = path.join(__dirname, 'image-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const replacements = {
  'p005-1': {
    unsplashId: 'photo-1756706718604-ef4af3970e33',
    photographer: 'POOJAN THANEKAR',
    unsplashUrl: 'https://unsplash.com/photos/modern-concrete-and-wood-house-with-trees-F-slnkFvcag',
    alt: 'Modern 5 Marla double-storey house exterior with gate and paved street in Johar Town',
    position: '50% 50%',
  },
  'p005-2': {
    unsplashId: 'photo-1759580974069-cab494998fa3',
    photographer: 'Imran Hossain',
    unsplashUrl: 'https://unsplash.com/photos/modern-living-room-with-marble-accents-and-comfortable-seating-FAxzZGeCjhM',
    alt: 'Central family TV lounge with ceiling fan, marble wall and dining area',
    position: '50% 50%',
  },
  'p005-3': {
    unsplashId: 'photo-1785232273548-4beae5334903',
    photographer: 'Home Makers Interior',
    unsplashUrl: 'https://unsplash.com/photos/modern-bedroom-with-bed-wardrobe-window-and-stylish-lighting-oKCZ-yw2Bn0',
    alt: 'Comfortable ground-floor bedroom with sliding wardrobe and ceiling fan',
    position: '50% 50%',
  },
  'p012-1': {
    unsplashId: 'photo-1696220659653-f11d376a7dd5',
    photographer: 'Budi Puspa Wijaya',
    unsplashUrl: 'https://unsplash.com/photos/a-couple-of-chairs-sitting-on-top-of-a-balcony-3Xw3fAIVFQQ',
    alt: '5 Marla upper portion private sunlit balcony with seating in Wapda Town',
    position: '50% 50%',
  },
  'p015-1': {
    unsplashId: 'photo-1715593949273-09009558300a',
    photographer: 'Musemind UX Agency',
    unsplashUrl: 'https://unsplash.com/photos/a-room-with-a-desk-and-a-chair-srTPWPbK0Dg',
    alt: 'Corporate executive office suite with director desk and conference screen in DHA Phase 6',
    position: '50% 50%',
  },
};

// Update manifest
for (const item of manifest) {
  if (replacements[item.id]) {
    Object.assign(item, replacements[item.id]);
  }
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('Updated image-manifest.json');

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

// Download replacements
for (const [id, rep] of Object.entries(replacements)) {
  const item = manifest.find((m) => m.id === id);
  const targetDir = path.join(projectRoot, 'public', 'images', 'properties', item.propertyId);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const largeFile = path.join(targetDir, `${item.filename}.webp`);
  const smallFile = path.join(targetDir, `${item.filename}-sm.webp`);

  const largeUrl = `https://images.unsplash.com/${item.unsplashId}?auto=format&fit=crop&w=1600&q=75&fm=webp`;
  const smallUrl = `https://images.unsplash.com/${item.unsplashId}?auto=format&fit=crop&w=800&q=75&fm=webp`;

  console.log(`Downloading [${item.propertyId}] ${item.filename} (large & small)...`);
  await downloadImage(largeUrl, largeFile);
  await downloadImage(smallUrl, smallFile);
}

// Re-generate src/data/image-credits.md
const creditsMarkdown = `# Image Credits & Unsplash Attribution

All photography used in this demonstration is sourced from [Unsplash](https://unsplash.com) under the free [Unsplash License](https://unsplash.com/license) (free for commercial and non-commercial use, no attribution required, but credited here for transparency).

| Property / Section | Filename | Role | Photographer | Source Link |
| :--- | :--- | :--- | :--- | :--- |
${manifest
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
console.log(`Updated credits at ${creditsPath}`);
console.log('All replacements downloaded successfully!');
