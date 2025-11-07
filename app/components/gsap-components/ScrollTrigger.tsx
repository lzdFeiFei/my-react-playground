import { useEffect, useRef } from "react";
import gsap from "gsap";

const ScrollTrigger = () => {
  const triggerRef1 = useRef<HTMLDivElement>(null);
  const triggerRef2 = useRef<HTMLDivElement>(null);
  const triggerRef3 = useRef<HTMLDivElement>(null);
  const boxRef1 = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const boxRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 在客户端动态导入并注册 ScrollTrigger 插件
    import("gsap/ScrollTrigger").then(({ ScrollTrigger: ScrollTriggerPlugin }) => {
      gsap.registerPlugin(ScrollTriggerPlugin);
      // 基础滚动触发
      gsap.from(boxRef1.current, {
        scrollTrigger: {
          trigger: triggerRef1.current,
          start: "top 80%", // 当元素顶部到达视口 80% 位置时触发
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          markers: true, // 显示调试标记
        },
        x: -200,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // 滚动进度动画
      gsap.to(boxRef2.current, {
        scrollTrigger: {
          trigger: triggerRef2.current,
          start: "top center",
          end: "bottom center",
          scrub: 1, // 跟随滚动进度
          markers: true,
        },
        rotation: 720,
        scale: 1.5,
        backgroundColor: "#e74c3c",
      });

      // Pin 固定效果
      gsap.to(boxRef3.current, {
        scrollTrigger: {
          trigger: triggerRef3.current,
          start: "top top",
          end: "+=500", // 固定 500px 的滚动距离
          pin: true, // 固定元素
          scrub: true,
          markers: true,
        },
        x: 300,
        rotation: 360,
      });
    });

    return () => {
      // 清理所有 ScrollTrigger 实例
      import("gsap/ScrollTrigger").then(({ ScrollTrigger: ScrollTriggerPlugin }) => {
        ScrollTriggerPlugin.getAll().forEach((trigger) => trigger.kill());
      });
    };
  }, []);

  return (
    <div className="demo-container scroll-trigger-demo">
      <div className="scroll-hint">向下滚动查看效果 ↓</div>

      {/* 示例 1: 基础滚动触发 */}
      <div className="scroll-section" ref={triggerRef1}>
        <h3>基础滚动触发</h3>
        <div className="demo-area">
          <div ref={boxRef1} className="gsap-box gsap-box--primary">
            滚动进入视口
          </div>
        </div>
        <pre className="code-snippet">
          {`gsap.from(element, {
  scrollTrigger: {
    trigger: element,
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  x: -200,
  opacity: 0
})`}
        </pre>
      </div>

      {/* 示例 2: 跟随滚动进度 */}
      <div className="scroll-section" ref={triggerRef2}>
        <h3>跟随滚动进度 (Scrub)</h3>
        <div className="demo-area">
          <div ref={boxRef2} className="gsap-box gsap-box--success">
            跟随滚动
          </div>
        </div>
        <pre className="code-snippet">
          {`gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    scrub: 1, // 跟随滚动
    start: "top center",
    end: "bottom center"
  },
  rotation: 720,
  scale: 1.5
})`}
        </pre>
      </div>

      {/* 示例 3: Pin 固定 */}
      <div className="scroll-section" ref={triggerRef3}>
        <h3>Pin 固定效果</h3>
        <div className="demo-area">
          <div ref={boxRef3} className="gsap-box gsap-box--warning">
            滚动时固定
          </div>
        </div>
        <pre className="code-snippet">
          {`gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    pin: true, // 固定元素
    scrub: true,
    start: "top top",
    end: "+=500"
  },
  x: 300,
  rotation: 360
})`}
        </pre>
      </div>

      <div className="scroll-spacer"></div>

      <div className="demo-tips">
        <h4>ScrollTrigger 关键参数：</h4>
        <ul>
          <li><strong>trigger</strong>: 触发动画的元素</li>
          <li><strong>start</strong>: 开始位置 (trigger position viewport position)</li>
          <li><strong>end</strong>: 结束位置</li>
          <li><strong>scrub</strong>: 跟随滚动进度 (true 或数字表示平滑时间)</li>
          <li><strong>pin</strong>: 固定元素在视口中</li>
          <li><strong>toggleActions</strong>: "onEnter onLeave onEnterBack onLeaveBack"</li>
          <li><strong>markers</strong>: 显示调试标记</li>
        </ul>
      </div>
    </div>
  );
};

export default ScrollTrigger;
