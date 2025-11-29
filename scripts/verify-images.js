const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const productsPath = path.join(projectRoot, 'src', 'data', 'products.json');
const publicImages = path.join(projectRoot, 'public', 'images');

if (!fs.existsSync(productsPath)) {
  console.error('products.json not found at', productsPath);
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const missing = [];

for (const p of products) {
  if (!p.image) continue;
  const filename = path.basename(p.image);
  const filePath = path.join(publicImages, filename);
  if (!fs.existsSync(filePath)) missing.push({ id: p.id, image: p.image, expectedPath: filePath });
}

if (missing.length === 0) {
  console.log('All product images found in', publicImages);
} else {
  console.log('Missing images:', missing);
  process.exit(2);
}
