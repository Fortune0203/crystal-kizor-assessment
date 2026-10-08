// Builds every brand asset from the assessment asset pack (not committed to git):
//  - responsive AVIF/WebP photos in public/images + app/assets/images.json (intrinsic sizes)
//  - Crystal Kizor marks cut from the logo sheet in public/brand
//  - favicon, apple-touch-icon and social share image
// Usage: ASSETS_DIR="/path/to/drive-download" npm run images
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const SRC = process.env.ASSETS_DIR
if (!SRC) throw new Error('Set ASSETS_DIR to the folder containing "Crystal_s pictures" and "Other assets"')

const OUT = 'public/images'
const WIDTHS = [480, 800, 1200, 1800]

const images = {
  'crystal-hero': 'Crystal_s pictures/Architectural Studio Portrait.png',
  'crystal-editorial': 'Crystal_s pictures/Earthy Editorial Portrait by African Architecture.png',
  'crystal-podcast': 'Crystal_s pictures/Cozy Architecture Podcast Workspace.png',
  'crystal-blazer': 'Crystal_s pictures/Confident Designer in Studio Workspace.png',
  'crystal-desk': 'Crystal_s pictures/Poised in a Warm Design Studio.png',
  'crystal-desk-white': 'Crystal_s pictures/Architectural Designer in Her Studio.png',
  'nature-home-front': 'Other assets/Nature Home/Front View with Tree shade.jpeg',
  'nature-home-cantilever': 'Other assets/Nature Home/Shade with Cantilevers.jpeg',
  'nature-home-garden': 'Other assets/Nature Home/New tree_back garden.jpeg',
  'nature-home-dividers': 'Other assets/Nature Home/Dividers.jpeg',
  'nature-home-sitting': 'Other assets/Nature Home/Family Sitting Room 2.jpeg',
  'nature-home-study': 'Other assets/Nature Home/27F5948D-36C1-4A55-84AA-0641349797D2_1_105_c.jpeg',
  'nature-home-exterior': 'Other assets/Nature Home/7292B8D4-723A-4F36-AA1C-51F390A3813B_1_105_c 2 2.jpeg',
  'nature-home-ii-exterior': 'Other assets/Nature Home 2/1.png',
  'nature-home-ii-dining': 'Other assets/Nature Home 2/2.jpeg',
  'nature-home-ii-kitchen': 'Other assets/Nature Home 2/3.jpeg',
  'nature-home-ii-bedroom': 'Other assets/Nature Home 2/4.jpeg',
  'nature-home-ii-bath': 'Other assets/Nature Home 2/6.jpeg',
  'community-centre-exterior': 'Other assets/Community Centre Project/IMG_2102 2.PNG',
  'community-centre-courtyard': 'Other assets/Community Centre Project/IMG_2105 2.JPG',
  'community-centre-gallery': 'Other assets/Community Centre Project/IMG_2103 2.PNG',
  'community-centre-hall': 'Other assets/Community Centre Project/IMG_2041 2.PNG',
}

await fs.mkdir(OUT, { recursive: true })
const manifest = {}

for (const [name, rel] of Object.entries(images)) {
  const input = sharp(path.join(SRC, rel)).rotate() // respect EXIF orientation
  const meta = await input.metadata()
  const w = meta.autoOrient?.width ?? meta.width
  const h = meta.autoOrient?.height ?? meta.height
  const widths = WIDTHS.filter((x) => x < w).concat(Math.min(w, WIDTHS.at(-1)))
  const unique = [...new Set(widths)]
  for (const width of unique) {
    const base = input.clone().resize({ width })
    await base.clone().avif({ quality: 50, effort: 5 }).toFile(`${OUT}/${name}-${width}.avif`)
    await base.clone().webp({ quality: 72 }).toFile(`${OUT}/${name}-${width}.webp`)
  }
  manifest[name] = { width: w, height: h, widths: unique }
  console.log(name, w, 'x', h, unique.join(','))
}

// Social share image
await sharp(path.join(SRC, images['crystal-editorial']))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 80 })
  .toFile('public/og-image.jpg')

await fs.mkdir('app/assets', { recursive: true })
await fs.writeFile('app/assets/images.json', JSON.stringify(manifest, null, 2))

// Logo marks: cut from the logo sheet, and luminance turned into alpha so each
// mark can be recoloured with a CSS mask (see BrandMark.vue).
const LOGO_SHEET = path.join(SRC, 'Other assets/Crystal Kizor Logo Collection.png')
const marks = {
  wordmark: [60, 150, 820, 380],
  monogram: [1080, 70, 220, 175],
  signature: [970, 430, 520, 200],
  horizontal: [1520, 130, 600, 80],
}
await fs.mkdir('public/brand', { recursive: true })
for (const [name, [left, top, width, height]] of Object.entries(marks)) {
  const alpha = await sharp(LOGO_SHEET).extract({ left, top, width, height }).greyscale().negate().linear(1.6, -60).toBuffer()
  const mark = await sharp({ create: { width, height, channels: 3, background: '#2A1A12' } }).joinChannel(alpha).png().toBuffer()
  await sharp(mark).trim({ threshold: 5 }).png({ compressionLevel: 9 }).toFile(`public/brand/ck-${name}.png`)
}

// Favicons from the monogram
for (const [size, file] of [[64, 'favicon.png'], [180, 'apple-touch-icon.png']]) {
  const inner = Math.round(size * 0.62)
  const icon = await sharp('public/brand/ck-monogram.png')
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: '#F6F1EA' } })
    .composite([{ input: icon, gravity: 'center' }])
    .png()
    .toFile(`public/${file}`)
}
console.log('brand marks and favicons written')
