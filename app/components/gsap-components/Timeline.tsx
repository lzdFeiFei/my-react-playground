import { useEffect, useRef } from "react";
import gsap from "gsap";

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const box4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 创建时间轴
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });

    // 添加动画到时间轴
    tl.from(box1Ref.current, {
      x: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
      .from(box2Ref.current, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "+=0.2") // 0.2秒延迟
      .from(box3Ref.current, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "+=0.2")
      .from(box4Ref.current, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "+=0.2")
      .to([box1Ref.current, box2Ref.current, box3Ref.current, box4Ref.current], {
        rotation: 360,
        scale: 1.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1, // 交错延迟
      })
      .to([box1Ref.current, box2Ref.current, box3Ref.current, box4Ref.current], {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.1,
      });

    return () => {
      tl.kill();
    };
  }, []);

  const handleReplay = () => {
    const tl = gsap.timeline();
    tl.restart();
  };

  return (
    <div className="demo-container">
      <div className="demo-section">
        <h3>时间轴动画序列</h3>
        <div className="demo-area timeline-demo" ref={containerRef}>
          <div ref={box1Ref} className="gsap-box gsap-box--primary timeline-box">
            1
          </div>
          <div ref={box2Ref} className="gsap-box gsap-box--success timeline-box">
            2
          </div>
          <div ref={box3Ref} className="gsap-box gsap-box--warning timeline-box">
            3
          </div>
          <div ref={box4Ref} className="gsap-box gsap-box--danger timeline-box">
            4
          </div>
        </div>

        <pre className="code-snippet">
          {`const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 1
});

tl.from(box1, { x: -100, opacity: 0, duration: 0.5 })
  .from(box2, { x: -100, opacity: 0, duration: 0.5 }, "+=0.2")
  .from(box3, { x: -100, opacity: 0, duration: 0.5 }, "+=0.2")
  .from(box4, { x: -100, opacity: 0, duration: 0.5 }, "+=0.2")
  .to([box1, box2, box3, box4], {
    rotation: 360,
    scale: 1.2,
    duration: 0.8,
    stagger: 0.1
  })
  .to([box1, box2, box3, box4], {
    x: 100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1
  });`}
        </pre>

        <div className="demo-tips">
          <h4>关键概念：</h4>
          <ul>
            <li><strong>gsap.timeline()</strong>: 创建一个时间轴来管理多个动画</li>
            <li><strong>"+="</strong>: 相对延迟，在上一个动画结束后延迟指定时间</li>
            <li><strong>"-="</strong>: 在上一个动画结束前指定时间开始</li>
            <li><strong>stagger</strong>: 为多个元素创建交错效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
