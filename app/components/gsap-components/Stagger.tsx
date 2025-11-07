import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Stagger = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 网格交错动画
    gsap.from(".grid-item", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: {
        amount: 1.5, // 总交错时间
        from: "center", // 从中心开始
        grid: [4, 4], // 网格布局
      },
      ease: "back.out(1.7)",
    });

    // 列表交错动画
    gsap.from(".list-item", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: {
        each: 0.1, // 每个元素间隔 0.1 秒
        from: "start", // 从开始位置
      },
      ease: "power2.out",
    });
  }, []);

  const handleReplayGrid = () => {
    setIsPlaying(true);
    const tl = gsap.timeline({
      onComplete: () => setIsPlaying(false),
    });

    tl.to(".grid-item", {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: {
        amount: 0.5,
        from: "edges", // 从边缘开始
        grid: [4, 4],
      },
    }).to(".grid-item", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: {
        amount: 1,
        from: "random", // 随机顺序
        grid: [4, 4],
      },
      ease: "back.out(1.7)",
    });
  };

  const handleReplayList = () => {
    setIsPlaying(true);
    const tl = gsap.timeline({
      onComplete: () => setIsPlaying(false),
    });

    tl.to(".list-item", {
      x: 50,
      opacity: 0,
      duration: 0.3,
      stagger: {
        each: 0.05,
        from: "end", // 从末尾开始
      },
    }).to(".list-item", {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: {
        each: 0.1,
        from: "start",
      },
      ease: "power2.out",
    });
  };

  return (
    <div className="demo-container">
      <div className="demo-section">
        <h3>网格交错动画</h3>
        <button
          className="replay-btn"
          onClick={handleReplayGrid}
          disabled={isPlaying}
        >
          重播网格动画
        </button>
        <div className="demo-area">
          <div className="stagger-grid" ref={gridRef}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="grid-item gsap-box gsap-box--primary">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <pre className="code-snippet">
          {`gsap.from(".grid-item", {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  stagger: {
    amount: 1.5,
    from: "center", // "start" | "end" | "center" | "edges" | "random"
    grid: [4, 4],
  },
  ease: "back.out(1.7)"
})`}
        </pre>
      </div>

      <div className="demo-section">
        <h3>列表交错动画</h3>
        <button
          className="replay-btn"
          onClick={handleReplayList}
          disabled={isPlaying}
        >
          重播列表动画
        </button>
        <div className="demo-area">
          <div className="stagger-list" ref={listRef}>
            {["首页", "产品", "关于", "团队", "联系"].map((item, i) => (
              <div key={i} className="list-item">
                <span className="list-number">{i + 1}</span>
                <span className="list-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <pre className="code-snippet">
          {`gsap.from(".list-item", {
  x: -50,
  opacity: 0,
  duration: 0.8,
  stagger: {
    each: 0.1, // 每个元素间隔
    from: "start"
  },
  ease: "power2.out"
})`}
        </pre>
      </div>

      <div className="demo-tips">
        <h4>Stagger 交错参数：</h4>
        <ul>
          <li><strong>amount</strong>: 所有动画的总交错时间</li>
          <li><strong>each</strong>: 每个元素之间的间隔时间</li>
          <li><strong>from</strong>: 起始位置 (start, end, center, edges, random)</li>
          <li><strong>grid</strong>: 网格布局 [rows, columns]</li>
          <li><strong>axis</strong>: 网格轴向 ("x", "y")</li>
          <li><strong>ease</strong>: 交错的缓动函数</li>
        </ul>
      </div>
    </div>
  );
};

export default Stagger;
