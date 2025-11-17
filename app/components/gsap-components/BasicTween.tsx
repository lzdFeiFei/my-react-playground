import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Editor from "@monaco-editor/react";

interface AnimationParams {
  x: number;
  rotation: number;
  duration: number;
  ease: string;
}

const EASE_OPTIONS = [
  "none",
  "power1.in",
  "power1.out",
  "power1.inOut",
  "power2.in",
  "power2.out",
  "power2.inOut",
  "power3.in",
  "power3.out",
  "power3.inOut",
  "back.in(1.7)",
  "back.out(1.7)",
  "back.inOut(1.7)",
  "elastic.in(1, 0.3)",
  "elastic.out(1, 0.3)",
  "elastic.inOut(1, 0.3)",
  "bounce.in",
  "bounce.out",
  "bounce.inOut",
  "sine.in",
  "sine.out",
  "sine.inOut",
];

const DEFAULT_CODE = `// 编写你的 GSAP 动画代码
// 可用对象: gsap, element

gsap.to(element, {
  x: 300,
  rotation: 360,
  duration: 2,
  ease: "power2.inOut",
  onComplete: () => {
    gsap.to(element, {
      x: 0,
      rotation: 0,
      duration: 2,
      ease: "power2.inOut"
    });
  }
});`;

type ModeType = "slider" | "code";

const BasicTween = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const [mode, setMode] = useState<ModeType>("slider");
  const [userCode, setUserCode] = useState(DEFAULT_CODE);
  const [error, setError] = useState<string>("");

  const [params, setParams] = useState<AnimationParams>({
    x: 300,
    rotation: 360,
    duration: 2,
    ease: "power2.inOut",
  });

  const playAnimationFromSlider = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    if (boxRef.current) {
      gsap.set(boxRef.current, { x: 0, rotation: 0 });

      animationRef.current = gsap.to(boxRef.current, {
        x: params.x,
        rotation: params.rotation,
        duration: params.duration,
        ease: params.ease,
        onComplete: () => {
          gsap.to(boxRef.current, {
            x: 0,
            rotation: 0,
            duration: params.duration,
            ease: params.ease,
          });
        },
      });
    }
  };

  const runUserCode = () => {
    setError("");

    if (!boxRef.current) {
      setError("DOM 元素未准备好");
      return;
    }

    // 清除之前的动画
    if (animationRef.current) {
      animationRef.current.kill();
    }
    gsap.killTweensOf(boxRef.current);
    gsap.set(boxRef.current, { x: 0, rotation: 0, scale: 1, opacity: 1 });

    try {
      // 使用 new Function 执行用户代码
      // 只暴露 gsap 和 element，限制作用域
      const executeCode = new Function("gsap", "element", "console", userCode);

      // 执行代码
      executeCode(gsap, boxRef.current, console);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`代码执行错误: ${errorMessage}`);
      console.error("GSAP 代码执行错误:", err);
    }
  };

  useEffect(() => {
    if (mode === "slider") {
      playAnimationFromSlider();
    }
  }, [params, mode]);

  const generateCode = () => {
    return `gsap.to(element, {
  x: ${params.x},
  rotation: ${params.rotation},
  duration: ${params.duration},
  ease: "${params.ease}"
})`;
  };

  return (
    <div className="demo-container">
      {/* 模式切换 */}
      <div className="mode-switcher">
        <button
          className={`mode-btn ${mode === "slider" ? "mode-btn--active" : ""}`}
          onClick={() => setMode("slider")}
        >
          🎮 滑块模式
        </button>
        <button
          className={`mode-btn ${mode === "code" ? "mode-btn--active" : ""}`}
          onClick={() => setMode("code")}
        >
          💻 代码模式
        </button>
      </div>

      <div className="interactive-demo">
        {/* 左侧控制区 */}
        <div className="interactive-demo__left">
          {mode === "slider" ? (
            <>
              <h3>🎮 动画参数控制</h3>

              <div className="control-group">
                <label>
                  <span className="control-label">X 位移 (px)</span>
                  <input
                    type="range"
                    min="-500"
                    max="500"
                    value={params.x}
                    onChange={(e) =>
                      setParams({ ...params, x: Number(e.target.value) })
                    }
                  />
                  <span className="control-value">{params.x}</span>
                </label>
              </div>

              <div className="control-group">
                <label>
                  <span className="control-label">旋转角度 (deg)</span>
                  <input
                    type="range"
                    min="-720"
                    max="720"
                    step="45"
                    value={params.rotation}
                    onChange={(e) =>
                      setParams({ ...params, rotation: Number(e.target.value) })
                    }
                  />
                  <span className="control-value">{params.rotation}</span>
                </label>
              </div>

              <div className="control-group">
                <label>
                  <span className="control-label">动画时长 (秒)</span>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={params.duration}
                    onChange={(e) =>
                      setParams({ ...params, duration: Number(e.target.value) })
                    }
                  />
                  <span className="control-value">{params.duration}s</span>
                </label>
              </div>

              <div className="control-group">
                <label>
                  <span className="control-label">缓动函数</span>
                  <select
                    value={params.ease}
                    onChange={(e) =>
                      setParams({ ...params, ease: e.target.value })
                    }
                    className="ease-select"
                  >
                    {EASE_OPTIONS.map((ease) => (
                      <option key={ease} value={ease}>
                        {ease}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button className="replay-btn" onClick={playAnimationFromSlider}>
                🔄 重播动画
              </button>

              <div className="code-display">
                <h4>生成的代码：</h4>
                <pre className="code-snippet">{generateCode()}</pre>
              </div>
            </>
          ) : (
            <>
              <h3>💻 编写 GSAP 代码</h3>

              <div className="code-editor">
                <Editor
                  height="400px"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={userCode}
                  onChange={(value) => setUserCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: "on",
                    padding: { top: 16, bottom: 16 },
                  }}
                />
              </div>

              <button className="run-btn" onClick={runUserCode}>
                ▶️ 运行代码
              </button>

              {error && <div className="error-message">⚠️ {error}</div>}

              <div className="code-tips">
                <h4>💡 可用对象：</h4>
                <ul>
                  <li>
                    <code>gsap</code> - GSAP 动画库
                  </li>
                  <li>
                    <code>element</code> - 动画目标元素
                  </li>
                  <li>
                    <code>console</code> - 用于调试输出
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* 右侧预览区 */}
        <div className="interactive-demo__right">
          <h3>✨ 动画预览</h3>
          <div className="demo-area">
            <div ref={boxRef} className="gsap-box gsap-box--primary">
              GSAP
            </div>
          </div>

          <div className="demo-tips">
            <h4>操作提示：</h4>
            {mode === "slider" ? (
              <ul>
                <li>拖动滑块调整动画参数</li>
                <li>选择不同的缓动函数查看效果</li>
                <li>点击"重播动画"按钮重新播放</li>
                <li>参数修改会自动触发动画</li>
              </ul>
            ) : (
              <ul>
                <li>直接编写 GSAP 动画代码</li>
                <li>
                  使用 <code>element</code> 作为动画目标
                </li>
                <li>点击"运行代码"执行动画</li>
                <li>代码错误会在下方显示提示</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicTween;
