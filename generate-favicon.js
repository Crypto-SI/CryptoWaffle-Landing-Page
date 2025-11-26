const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source logo path - using the webp file directly since the png is empty
const sourcePath = path.join(__dirname, 'public', 'images', 'crypto waffle logo.webp');

// Check if source file exists
if (!fs.existsSync(sourcePath)) {
  console.error('Logo file not found!');
  process.exit(1);
}

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Sizes for different favicon versions
const sizes = [16, 32, 48, 57, 60, 72, 76, 96, 114, 120, 144, 152, 180, 192, 512];

// Generate favicon in different sizes
async function generateFavicons() {
  try {
    // Read the source image
    const sourceBuffer = fs.readFileSync(sourcePath);
    
    // Create a base favicon.ico (16x16 and 32x32)
    await sharp(sourceBuffer)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    console.log('Generated favicon.ico');
    
    // Generate different sizes
    for (const size of sizes) {
      await sharp(sourceBuffer)
        .resize(size, size)
        .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
      
      console.log(`Generated favicon-${size}x${size}.png`);
    }
    
    // Generate apple-touch-icon
    await sharp(sourceBuffer)
      .resize(180, 180)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    console.log('Generated apple-touch-icon.png');
    
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

// Run the function
generateFavicons(); 