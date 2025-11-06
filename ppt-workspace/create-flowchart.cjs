const sharp = require('sharp');

async function createFlowchart() {
  // 创建横向流程图SVG
  const width = 1400;
  const height = 200;
  const boxWidth = 180;
  const boxHeight = 80;
  const arrowWidth = 50;
  const startY = (height - boxHeight) / 2;
  let currentX = 30;

  const steps = [
    { text: '想清楚要什么', color: '#667eea' },
    { text: '描述给AI', color: '#667eea' },
    { text: 'AI快速实现', color: '#667eea' },
    { text: '验证效果', color: '#667eea' },
    { text: '满意？\n否则返回修改', color: '#00d4aa' },
    { text: '✅ 完成', color: '#764ba2' }
  ];

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <style>
        .box-text {
          font-family: Arial, sans-serif;
          font-size: 16px;
          font-weight: bold;
          fill: #ffffff;
          text-anchor: middle;
        }
        .arrow-text {
          font-family: Arial, sans-serif;
          font-size: 28px;
          font-weight: bold;
          fill: #f093fb;
          text-anchor: middle;
        }
      </style>
    </defs>
    <rect width="${width}" height="${height}" fill="#1a1a2e"/>
  `;

  steps.forEach((step, index) => {
    // 绘制圆角矩形
    svgContent += `
      <rect x="${currentX}" y="${startY}"
            width="${boxWidth}" height="${boxHeight}"
            rx="8" ry="8"
            fill="${step.color}"
            stroke="${step.color}"
            stroke-width="2"/>
    `;

    // 处理文本（支持换行）
    const lines = step.text.split('\n');
    if (lines.length === 1) {
      svgContent += `
        <text x="${currentX + boxWidth / 2}" y="${startY + boxHeight / 2 + 6}"
              class="box-text">${step.text}</text>
      `;
    } else {
      // 多行文本
      lines.forEach((line, lineIndex) => {
        const lineY = startY + boxHeight / 2 - (lines.length - 1) * 10 + lineIndex * 20 + 6;
        svgContent += `
          <text x="${currentX + boxWidth / 2}" y="${lineY}"
                class="box-text">${line}</text>
        `;
      });
    }

    currentX += boxWidth;

    // 绘制箭头（除了最后一个）
    if (index < steps.length - 1) {
      svgContent += `
        <text x="${currentX + arrowWidth / 2}" y="${startY + boxHeight / 2 + 10}"
              class="arrow-text">→</text>
      `;
      currentX += arrowWidth;
    }
  });

  svgContent += '</svg>';

  // 转换为PNG
  await sharp(Buffer.from(svgContent))
    .png()
    .toFile('flowchart.png');

  console.log('横向流程图已生成：flowchart.png');
}

createFlowchart().catch(console.error);
