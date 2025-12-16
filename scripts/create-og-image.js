import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_IMAGE = path.join(__dirname, '../public/images/DSC03345.jpg');
const OUTPUT_IMAGE = path.join(__dirname, '../public/og-image.jpg');

async function createOgImage() {
  try {
    console.log('🖼️  Creating Open Graph image (1200x630)...\n');

    await sharp(INPUT_IMAGE)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: 90 })
      .toFile(OUTPUT_IMAGE);

    console.log('✅ Open Graph image created successfully!');
    console.log(`📁 Saved to: public/og-image.jpg`);
    console.log('📐 Size: 1200x630px (optimized for WhatsApp, Facebook, Twitter)');
  } catch (error) {
    console.error('❌ Failed to create og:image:', error.message);
  }
}

createOgImage();
