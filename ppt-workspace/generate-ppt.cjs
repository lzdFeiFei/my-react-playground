const pptxgen = require('pptxgenjs');
const html2pptx = require('./html2pptx.cjs');
const path = require('path');

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'AI协同团队';
  pptx.title = 'AI协同：工作方式的革命';

  const slidesDir = path.join(__dirname, 'slides');

  // Slide 1: 封面
  await html2pptx(path.join(slidesDir, 'slide01-cover.html'), pptx);

  // Slide 2: 工作方式正在改变
  await html2pptx(path.join(slidesDir, 'slide02-change.html'), pptx);

  // Slide 3: 传统vs AI协同对比 - 带表格
  const { slide: slide3, placeholders: ph3 } = await html2pptx(path.join(slidesDir, 'slide03-comparison.html'), pptx);

  if (ph3.length > 0) {
    const comparisonData = [
      [
        { text: '传统开发流程', options: { fill: { color: '667eea' }, color: 'FFFFFF', bold: true, fontSize: 14 } },
        { text: 'AI协同流程', options: { fill: { color: '764ba2' }, color: 'FFFFFF', bold: true, fontSize: 14 } },
        { text: '效率提升', options: { fill: { color: '00d4aa' }, color: 'FFFFFF', bold: true, fontSize: 14 } }
      ],
      ['📝 写需求文档（1天）', '💬 对话描述需求（10分钟）', '12x'],
      ['💻 编写代码（2天）', '🤖 AI生成代码（5分钟）', '100x'],
      ['🐛 调试修复（1天）', '👀 验证+AI修复（30分钟）', '16x'],
      ['📄 编写文档（半天）', '📋 AI生成文档（5分钟）', '50x'],
      [
        { text: '总计：4.5天', options: { bold: true, fontSize: 12 } },
        { text: '总计：1小时', options: { bold: true, fontSize: 12, color: '00d4aa' } },
        { text: '40倍+', options: { bold: true, fontSize: 14, color: 'f093fb' } }
      ]
    ];

    slide3.addTable(comparisonData, {
      ...ph3[0],
      border: { pt: 1, color: '555555' },
      fill: { color: '2d2d44' },
      color: 'ffffff',
      align: 'center',
      valign: 'middle',
      fontSize: 11,
      colW: [ph3[0].w * 0.35, ph3[0].w * 0.4, ph3[0].w * 0.25]
    });
  }

  // Slide 4: 核心思想一
  await html2pptx(path.join(slidesDir, 'slide04-idea1.html'), pptx);

  // Slide 5: 核心思想二 - 带流程图
  const { slide: slide5, placeholders: ph5 } = await html2pptx(path.join(slidesDir, 'slide05-idea2.html'), pptx);

  if (ph5.length > 0) {
    // 使用形状+文本的方式展示流程
    const steps = [
      { text: '想清楚要什么', color: '667eea', isArrow: false },
      { text: '↓', color: 'f093fb', isArrow: true },
      { text: '描述给AI', color: '667eea', isArrow: false },
      { text: '↓', color: 'f093fb', isArrow: true },
      { text: 'AI快速实现', color: '667eea', isArrow: false },
      { text: '↓', color: 'f093fb', isArrow: true },
      { text: '验证效果', color: '667eea', isArrow: false },
      { text: '↓', color: 'f093fb', isArrow: true },
      { text: '满意？否则返回修改', color: '00d4aa', isArrow: false },
      { text: '↓', color: 'f093fb', isArrow: true },
      { text: '✅ 完成', color: '764ba2', isArrow: false }
    ];

    const startX = ph5[0].x + ph5[0].w * 0.3;
    const boxWidth = ph5[0].w * 0.4;
    let currentY = ph5[0].y + 0.15;

    steps.forEach(step => {
      if (step.isArrow) {
        slide5.addText(step.text, {
          x: startX,
          y: currentY,
          w: boxWidth,
          h: 0.25,
          fontSize: 18,
          bold: true,
          color: step.color,
          align: 'center'
        });
        currentY += 0.3;
      } else {
        slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: startX,
          y: currentY,
          w: boxWidth,
          h: 0.45,
          fill: { color: step.color },
          line: { color: step.color, width: 1 },
          rectRadius: 0.05
        });
        slide5.addText(step.text, {
          x: startX,
          y: currentY,
          w: boxWidth,
          h: 0.45,
          fontSize: 13,
          bold: true,
          color: 'ffffff',
          align: 'center',
          valign: 'middle'
        });
        currentY += 0.5;
      }
    });
  }

  // Slide 6: 核心思想三
  await html2pptx(path.join(slidesDir, 'slide06-idea3.html'), pptx);

  // Slide 7: 实战案例
  await html2pptx(path.join(slidesDir, 'slide07-case.html'), pptx);

  // Slide 8: 各岗位应用 - 带表格
  const { slide: slide8, placeholders: ph8 } = await html2pptx(path.join(slidesDir, 'slide08-roles.html'), pptx);

  if (ph8.length > 0) {
    const rolesData = [
      [
        { text: '岗位', options: { fill: { color: '667eea' }, color: 'FFFFFF', bold: true } },
        { text: 'AI协助的工作', options: { fill: { color: '667eea' }, color: 'FFFFFF', bold: true } },
        { text: '效率提升', options: { fill: { color: '667eea' }, color: 'FFFFFF', bold: true } }
      ],
      ['📊 产品经理', '写PRD、画原型、生成测试用例', '3-5倍'],
      ['🎨 设计师', '生成初版设计、批量变体、设计系统', '5-10倍'],
      ['📢 运营/市场', '写文案、活动方案、数据分析报告', '5-8倍'],
      ['💼 销售', '客户提案、竞品分析、话术优化', '3-5倍'],
      ['💻 技术', '写代码、写文档、代码审查', '10-50倍']
    ];

    slide8.addTable(rolesData, {
      ...ph8[0],
      border: { pt: 1, color: '555555' },
      fill: { color: '2d2d44' },
      color: 'ffffff',
      align: 'left',
      valign: 'middle',
      fontSize: 11,
      colW: [ph8[0].w * 0.2, ph8[0].w * 0.55, ph8[0].w * 0.25]
    });
  }

  // Slide 9: 公司层面机会
  await html2pptx(path.join(slidesDir, 'slide09-company.html'), pptx);

  // Slide 10: 最后想说的
  await html2pptx(path.join(slidesDir, 'slide10-closing.html'), pptx);

  // Slide 11: Q&A
  await html2pptx(path.join(slidesDir, 'slide11-qa.html'), pptx);

  // 保存
  await pptx.writeFile({ fileName: 'AI协同工作新范式.pptx' });
  console.log('PPT生成成功！文件：AI协同工作新范式.pptx');
}

createPresentation().catch(console.error);
