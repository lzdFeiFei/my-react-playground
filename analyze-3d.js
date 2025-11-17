// Ink Games 3D 效果分析脚本
// 在 inkgames.com 的开发者工具 Console 中运行此脚本

(function() {
  console.log('🔍 开始分析 3D 效果实现...\n');

  const results = {
    step1_findElement: {},
    step2_canvasInfo: {},
    step3_libraries: {},
    step4_networkResources: {},
    step5_scripts: {}
  };

  // ========== 步骤 1: 查找 CardsMain 元素 ==========
  console.log('📍 步骤 1: 查找 CardsMain 元素');
  const cardsMainElement = document.querySelector('[class*="CardsMain"]');

  if (cardsMainElement) {
    results.step1_findElement = {
      found: true,
      className: cardsMainElement.className,
      tagName: cardsMainElement.tagName,
      innerHTML: cardsMainElement.innerHTML.substring(0, 500) + '...',
      childrenCount: cardsMainElement.children.length,
      childrenTags: Array.from(cardsMainElement.children).map(c => ({
        tag: c.tagName,
        class: c.className,
        id: c.id
      }))
    };
    console.log('✅ 找到 CardsMain 元素:', results.step1_findElement);
  } else {
    results.step1_findElement = { found: false };
    console.log('❌ 未找到 CardsMain 元素');
  }

  // ========== 步骤 2: 检查 Canvas/Iframe ==========
  console.log('\n📍 步骤 2: 检查 Canvas 和 Iframe');

  const canvas = cardsMainElement?.querySelector('canvas');
  const iframe = cardsMainElement?.querySelector('iframe');
  const allCanvas = document.querySelectorAll('canvas');
  const allIframes = document.querySelectorAll('iframe');

  results.step2_canvasInfo = {
    hasCanvasInCardsMain: !!canvas,
    hasIframeInCardsMain: !!iframe,
    totalCanvasCount: allCanvas.length,
    totalIframeCount: allIframes.length,
    canvasDetails: Array.from(allCanvas).map(c => ({
      width: c.width,
      height: c.height,
      id: c.id,
      class: c.className,
      context: c.getContext ? 'available' : 'not available'
    })),
    iframeDetails: Array.from(allIframes).map(i => ({
      src: i.src,
      id: i.id,
      class: i.className
    }))
  };

  console.log('Canvas 信息:', results.step2_canvasInfo);

  // ========== 步骤 3: 检测 3D 库 ==========
  console.log('\n📍 步骤 3: 检测 3D 库的使用');

  results.step3_libraries = {
    threejs: typeof THREE !== 'undefined',
    spline: typeof window.Spline !== 'undefined' ||
            typeof window.Application !== 'undefined',
    babylonjs: typeof BABYLON !== 'undefined',
    playcanvas: typeof pc !== 'undefined',
    webgl: !!document.querySelector('canvas')?.getContext?.('webgl')
  };

  // 检查全局对象
  const globalObjects = Object.keys(window).filter(key =>
    key.toLowerCase().includes('three') ||
    key.toLowerCase().includes('spline') ||
    key.toLowerCase().includes('webgl') ||
    key.toLowerCase().includes('scene')
  );

  results.step3_libraries.globalObjects = globalObjects;
  console.log('3D 库检测:', results.step3_libraries);

  // ========== 步骤 4: 查找网络资源 ==========
  console.log('\n📍 步骤 4: 查找 3D 资源文件 (需要查看 Network 标签)');

  // 提示用户在 Network 标签中查找
  const searchKeywords = ['.glb', '.gltf', '.splinecode', '.obj', '.fbx', 'spline', 'three'];
  results.step4_networkResources = {
    keywords: searchKeywords,
    instruction: '请在 Network 标签中搜索这些关键词: ' + searchKeywords.join(', ')
  };

  console.log('⚠️ 网络资源需要手动检查 Network 标签');
  console.log('搜索关键词:', searchKeywords);

  // ========== 步骤 5: 查找引用的脚本 ==========
  console.log('\n📍 步骤 5: 查找引用的 JavaScript 文件');

  const scripts = Array.from(document.querySelectorAll('script')).map(s => ({
    src: s.src,
    hasInlineCode: !s.src && s.textContent.length > 0,
    inlineCodeSnippet: !s.src ? s.textContent.substring(0, 200) : null
  }));

  const relevantScripts = scripts.filter(s =>
    s.src && (
      s.src.includes('three') ||
      s.src.includes('spline') ||
      s.src.includes('webgl') ||
      s.src.includes('babylon') ||
      s.src.includes('playcanvas')
    )
  );

  results.step5_scripts = {
    totalScripts: scripts.length,
    relevantScripts: relevantScripts,
    allScripts: scripts
  };

  console.log('找到相关脚本:', relevantScripts);

  // ========== 额外检查: 查找 Spline 特征 ==========
  console.log('\n📍 额外检查: Spline 特征');

  const splineIframe = Array.from(document.querySelectorAll('iframe')).find(i =>
    i.src.includes('spline') || i.src.includes('splinecode')
  );

  const splineCanvas = Array.from(document.querySelectorAll('canvas')).find(c => {
    const parent = c.parentElement;
    return parent && (
      parent.className.includes('spline') ||
      parent.id.includes('spline')
    );
  });

  results.splineFeatures = {
    hasSplineIframe: !!splineIframe,
    splineIframeSrc: splineIframe?.src,
    hasSplineCanvas: !!splineCanvas,
    splineCanvasParent: splineCanvas?.parentElement?.outerHTML
  };

  console.log('Spline 特征:', results.splineFeatures);

  // ========== 输出最终结果 ==========
  console.log('\n' + '='.repeat(60));
  console.log('📊 完整分析结果:');
  console.log('='.repeat(60));
  console.log(JSON.stringify(results, null, 2));
  console.log('='.repeat(60));

  // 生成诊断
  console.log('\n💡 诊断建议:');
  if (results.step2_canvasInfo.totalCanvasCount > 0) {
    console.log('✅ 页面使用了 Canvas 元素，很可能是 WebGL 渲染');
  }
  if (results.step3_libraries.threejs) {
    console.log('✅ 检测到 Three.js 库');
  }
  if (results.step3_libraries.spline) {
    console.log('✅ 检测到 Spline 库');
  }
  if (results.splineFeatures.hasSplineIframe) {
    console.log('✅ 检测到 Spline Iframe 嵌入');
  }
  if (relevantScripts.length > 0) {
    console.log('✅ 找到 ' + relevantScripts.length + ' 个相关的 3D 库脚本');
  }

  // 返回结果供复制
  return results;
})();
