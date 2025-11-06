const sharp = require('sharp');
const fs = require('fs');

const dir = './slides';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// 封面渐变背景 - 紫色渐变
const coverGradient = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="562.5">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g1)"/>
</svg>`;

// 内容页左侧色块渐变
const sidebarGradient = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="562.5">
  <defs>
    <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#764ba2"/>
      <stop offset="100%" style="stop-color:#667eea"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g2)"/>
</svg>`;

async function createGradients() {
  await sharp(Buffer.from(coverGradient))
    .png()
    .toFile(`${dir}/gradient-cover.png`);

  await sharp(Buffer.from(sidebarGradient))
    .png()
    .toFile(`${dir}/gradient-sidebar.png`);

  console.log('Gradients created successfully');
}

createGradients().catch(console.error);
