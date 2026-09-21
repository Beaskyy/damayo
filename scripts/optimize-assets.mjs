import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve('public/assets');
const ORIGINALS_DIR = path.resolve('public/assets/_originals');
const IMAGES_DIR = path.resolve('public/assets/images');
const ORIGINALS_IMAGES_DIR = path.resolve('public/assets/_originals/images');

async function optimizeImages() {
  console.log('--- Optimizing Gallery Images ---');
  const galleryFiles = fs.readdirSync(ORIGINALS_IMAGES_DIR).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of galleryFiles) {
    const inputPath = path.join(ORIGINALS_IMAGES_DIR, file);
    const outputPath = path.join(IMAGES_DIR, file);
    const statBefore = fs.statSync(inputPath).size;
    totalBefore += statBefore;

    // Gallery cards are 240px wide x 340px high.
    // 800px width provides >3x resolution for super crisp Retina rendering.
    await sharp(inputPath)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(outputPath);

    const statAfter = fs.statSync(outputPath).size;
    totalAfter += statAfter;
    console.log(`[Gallery] ${file}: ${(statBefore / 1024).toFixed(1)} KB -> ${(statAfter / 1024).toFixed(1)} KB (-${(((statBefore - statAfter) / statBefore) * 100).toFixed(1)}%)`);
  }

  console.log(`Gallery total: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB -> ${(totalAfter / 1024).toFixed(1)} KB (-${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)\n`);

  console.log('--- Optimizing Root Illustrations and Textures ---');
  const rootFiles = fs.readdirSync(ORIGINALS_DIR).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

  let rootBefore = 0;
  let rootAfter = 0;

  for (const file of rootFiles) {
    const inputPath = path.join(ORIGINALS_DIR, file);
    const outputPath = path.join(ASSETS_DIR, file);
    const statBefore = fs.statSync(inputPath).size;
    rootBefore += statBefore;

    if (file.endsWith('.jpg')) {
      // JPG assets (e.g. intro poster, gallery thumbnails if any)
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true, progressive: true })
        .toFile(outputPath);
    } else if (file.endsWith('.png')) {
      // PNG assets
      let maxW = 1000;
      if (file.includes('sunday-lunch') || file.includes('teacup')) {
        maxW = 400; // Small card illustrations
      } else if (file.includes('white-textured-paper')) {
        maxW = 768; // Paper background texture
      } else if (file.includes('venue-hedsor')) {
        maxW = 1200; // Venue photos
      }

      await sharp(inputPath)
        .resize({ width: maxW, withoutEnlargement: true })
        .png({ compressionLevel: 9, quality: 78, palette: true, effort: 8 })
        .toFile(outputPath);
    }

    const statAfter = fs.statSync(outputPath).size;
    rootAfter += statAfter;
    console.log(`[Asset] ${file}: ${(statBefore / 1024).toFixed(1)} KB -> ${(statAfter / 1024).toFixed(1)} KB (-${(((statBefore - statAfter) / statBefore) * 100).toFixed(1)}%)`);
  }

  console.log(`\nAssets total: ${(rootBefore / (1024 * 1024)).toFixed(2)} MB -> ${(rootAfter / (1024 * 1024)).toFixed(2)} MB (-${(((rootBefore - rootAfter) / rootBefore) * 100).toFixed(1)}%)`);
  console.log(`\nGRAND TOTAL: ${((totalBefore + rootBefore) / (1024 * 1024)).toFixed(2)} MB -> ${((totalAfter + rootAfter) / (1024 * 1024)).toFixed(2)} MB (-${((((totalBefore + rootBefore) - (totalAfter + rootAfter)) / (totalBefore + rootBefore)) * 100).toFixed(1)}%)`);
}

optimizeImages().catch(console.error);
