const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const srcDir = path.join(projectRoot, 'src', 'images');
const outDir = path.join(projectRoot, 'public', 'images');

if (!fs.existsSync(srcDir)) {
  console.error('Source images folder not found:', srcDir);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => fs.statSync(path.join(srcDir, f)).isFile());
if (files.length === 0) {
  console.log('No files to copy from', srcDir);
  process.exit(0);
}

let copied = 0;
for (const file of files) {
  const src = path.join(srcDir, file);
  const dest = path.join(outDir, file);
  try {
    fs.copyFileSync(src, dest);
    copied++;
  } catch (err) {
    console.error('Failed to copy', file, err.message);
  }
}
console.log(`Copied ${copied}/${files.length} files to ${outDir}`);
