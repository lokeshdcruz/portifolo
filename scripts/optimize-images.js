import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images-optimized');
const MAX_WIDTH = 2560; // Max width for images (higher resolution)
const MAX_HEIGHT = 1440; // Max height for images (higher resolution)
const QUALITY = 92; // JPEG quality (0-100) - higher quality

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    await sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)}`);
    console.log(`  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
    
    return { originalSize, newSize, savings };
  } catch (error) {
    console.error(`✗ Failed to optimize ${path.basename(inputPath)}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting image optimization...\n');

  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );

  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${imageFiles.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let successCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file.replace(/\.(png|jpeg)$/i, '.jpg'));

    const result = await optimizeImage(inputPath, outputPath);
    
    if (result) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      successCount++;
    }
    console.log('');
  }

  const totalSavings = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);

  console.log('═══════════════════════════════════════');
  console.log('✨ Optimization Complete!\n');
  console.log(`📊 Results:`);
  console.log(`   Images processed: ${successCount}/${imageFiles.length}`);
  console.log(`   Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Optimized size: ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Total savings: ${totalSavings}% (${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)}MB saved)`);
  console.log('\n📁 Optimized images saved to: public/images-optimized/');
  console.log('\n⚠️  Next steps:');
  console.log('   1. Review the optimized images');
  console.log('   2. If satisfied, backup your originals');
  console.log('   3. Replace public/images/ with optimized versions');
  console.log('   4. Delete public/images-optimized/ folder');
}

optimizeAllImages().catch(console.error);
