import { useRef, useState } from "react";
import gsap from "gsap";

interface EasingOption {
  name: string;
  value: string;
  category: string;
}

const EASING_OPTIONS: EasingOption[] = [
  // Linear
  { name: "none (线性)", value: "none", category: "linear" },

  // Power
  { name: "power1.in", value: "power1.in", category: "power" },
  { name: "power1.out", value: "power1.out", category: "power" },
  { name: "power1.inOut", value: "power1.inOut", category: "power" },
  { name: "power2.in", value: "power2.in", category: "power" },
  { name: "power2.out", value: "power2.out", category: "power" },
  { name: "power2.inOut", value: "power2.inOut", category: "power" },
  { name: "power3.in", value: "power3.in", category: "power" },
  { name: "power3.out", value: "power3.out", category: "power" },
  { name: "power3.inOut", value: "power3.inOut", category: "power" },
  { name: "power4.in", value: "power4.in", category: "power" },
  { name: "power4.out", value: "power4.out", category: "power" },
  { name: "power4.inOut", value: "power4.inOut", category: "power" },

  // Back
  { name: "back.in", value: "back.in(1.7)", category: "back" },
  { name: "back.out", value: "back.out(1.7)", category: "back" },
  { name: "back.inOut", value: "back.inOut(1.7)", category: "back" },

  // Elastic
  { name: "elastic.in", value: "elastic.in(1, 0.3)", category: "elastic" },
  { name: "elastic.out", value: "elastic.out(1, 0.3)", category: "elastic" },
  { name: "elastic.inOut", value: "elastic.inOut(1, 0.3)", category: "elastic" },

  // Bounce
  { name: "bounce.in", value: "bounce.in", category: "bounce" },
  { name: "bounce.out", value: "bounce.out", category: "bounce" },
  { name: "bounce.inOut", value: "bounce.inOut", category: "bounce" },

  // Sine
  { name: "sine.in", value: "sine.in", category: "sine" },
  { name: "sine.out", value: "sine.out", category: "sine" },
  { name: "sine.inOut", value: "sine.inOut", category: "sine" },

  // Expo
  { name: "expo.in", value: "expo.in", category: "expo" },
  { name: "expo.out", value: "expo.out", category: "expo" },
  { name: "expo.inOut", value: "expo.inOut", category: "expo" },

  // Circ
  { name: "circ.in", value: "circ.in", category: "circ" },
  { name: "circ.out", value: "circ.out", category: "circ" },
  { name: "circ.inOut", value: "circ.inOut", category: "circ" },
];

const CATEGORY_COLORS: Record<string, string> = {
  linear: "#95a5a6",
  power: "#3498db",
  back: "#e74c3c",
  elastic: "#9b59b6",
  bounce: "#f39c12",
  sine: "#1abc9c",
  expo: "#e67e22",
  circ: "#34495e",
};

const CATEGORY_NAMES: Record<string, string> = {
  linear: "线性",
  power: "幂函数",
  back: "回弹",
  elastic: "弹性",
  bounce: "弹跳",
  sine: "正弦",
  expo: "指数",
  circ: "圆形",
};

const Easing = () => {
  const boxRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [selectedEasing, setSelectedEasing] = useState<string>("power2.inOut");
  const [duration, setDuration] = useState<number>(1.5);
  const [showCategory, setShowCategory] = useState<string>("all");
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const playAnimation = (ease: string) => {
    const box = boxRefs.current[ease];
    if (!box) return;

    gsap.killTweensOf(box);
    gsap.set(box, { x: 0 });

    gsap.to(box, {
      x: 400,
      duration: duration,
      ease: ease,
      onComplete: () => {
        gsap.to(box, {
          x: 0,
          duration: duration,
          ease: ease,
        });
      },
    });
  };

  const playAllAnimations = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const filteredOptions = getFilteredOptions();

    filteredOptions.forEach((option) => {
      playAnimation(option.value);
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, duration * 2000);
  };

  const playSingleAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    playAnimation(selectedEasing);

    setTimeout(() => {
      setIsAnimating(false);
    }, duration * 2000);
  };

  const getFilteredOptions = () => {
    if (showCategory === "all") {
      return EASING_OPTIONS;
    }
    return EASING_OPTIONS.filter((opt) => opt.category === showCategory);
  };

  const categories = Array.from(new Set(EASING_OPTIONS.map((opt) => opt.category)));

  return (
    <div className="demo-container">
      <div className="easing-controls">
        {/* 模式切换 */}
        <div className="mode-switcher">
          <button
            className={`mode-btn ${!compareMode ? "mode-btn--active" : ""}`}
            onClick={() => setCompareMode(false)}
          >
            🎯 单个预览
          </button>
          <button
            className={`mode-btn ${compareMode ? "mode-btn--active" : ""}`}
            onClick={() => setCompareMode(true)}
          >
            🔄 对比模式
          </button>
        </div>

        {/* 全局控制 */}
        <div className="control-group">
          <label>
            <span className="control-label">动画时长 (秒)</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
            <span className="control-value">{duration}s</span>
          </label>
        </div>

        {compareMode && (
          <div className="category-filter">
            <label className="control-label">筛选分类：</label>
            <div className="category-buttons">
              <button
                className={`category-btn ${showCategory === "all" ? "category-btn--active" : ""}`}
                onClick={() => setShowCategory("all")}
              >
                全部
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${showCategory === cat ? "category-btn--active" : ""}`}
                  style={{
                    borderColor: CATEGORY_COLORS[cat],
                    color: showCategory === cat ? "white" : CATEGORY_COLORS[cat],
                    background: showCategory === cat ? CATEGORY_COLORS[cat] : "transparent",
                  }}
                  onClick={() => setShowCategory(cat)}
                >
                  {CATEGORY_NAMES[cat]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {!compareMode ? (
        // 单个预览模式
        <div className="interactive-demo">
          <div className="interactive-demo__left">
            <h3>🎮 选择 Easing 函数</h3>
            <div className="easing-list">
              {EASING_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`easing-item ${
                    selectedEasing === option.value ? "easing-item--active" : ""
                  }`}
                  style={{
                    borderLeftColor: CATEGORY_COLORS[option.category],
                  }}
                  onClick={() => setSelectedEasing(option.value)}
                >
                  <span className="easing-name">{option.name}</span>
                  <span
                    className="easing-category"
                    style={{ color: CATEGORY_COLORS[option.category] }}
                  >
                    {CATEGORY_NAMES[option.category]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="interactive-demo__right">
            <h3>✨ 动画预览</h3>
            <div className="demo-area">
              <div
                ref={(el) => (boxRefs.current[selectedEasing] = el)}
                className="gsap-box gsap-box--primary"
                style={{ fontSize: "0.8rem", textAlign: "center" }}
              >
                {selectedEasing}
              </div>
            </div>

            <button
              className="replay-btn"
              onClick={playSingleAnimation}
              disabled={isAnimating}
            >
              {isAnimating ? "⏳ 播放中..." : "▶️ 播放动画"}
            </button>

            <div className="demo-tips">
              <h4>💡 关于 {selectedEasing}</h4>
              <ul>
                <li>
                  分类：
                  <strong style={{ color: CATEGORY_COLORS[EASING_OPTIONS.find(e => e.value === selectedEasing)?.category || ""] }}>
                    {CATEGORY_NAMES[EASING_OPTIONS.find(e => e.value === selectedEasing)?.category || ""]}
                  </strong>
                </li>
                <li>点击左侧列表选择不同的 easing 函数</li>
                <li>调整时长滑块可以改变动画速度</li>
                <li>切换到对比模式可以同时查看多个 easing</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // 对比模式
        <div className="compare-mode">
          <div className="compare-header">
            <h3>🔄 Easing 函数对比</h3>
            <button
              className="replay-btn"
              onClick={playAllAnimations}
              disabled={isAnimating}
            >
              {isAnimating ? "⏳ 播放中..." : "▶️ 播放全部"}
            </button>
          </div>

          <div className="compare-list">
            {getFilteredOptions().map((option) => (
              <div key={option.value} className="compare-item">
                <div className="compare-label">
                  <span
                    className="compare-dot"
                    style={{ background: CATEGORY_COLORS[option.category] }}
                  />
                  <span className="compare-name">{option.name}</span>
                </div>
                <div className="compare-track">
                  <div
                    ref={(el) => (boxRefs.current[option.value] = el)}
                    className="compare-box"
                    style={{
                      background: CATEGORY_COLORS[option.category],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="demo-tips" style={{ marginTop: "2rem" }}>
            <h4>💡 使用提示</h4>
            <ul>
              <li>点击"播放全部"按钮同时查看所有 easing 效果</li>
              <li>使用分类筛选器快速定位特定类型的 easing</li>
              <li>观察不同 easing 函数的速度曲线差异</li>
              <li>
                <strong>in</strong> 表示缓入，<strong>out</strong> 表示缓出，
                <strong>inOut</strong> 表示缓入缓出
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Easing;
