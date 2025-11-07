import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const BasicTween = () => {
  const boxRef1 = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const boxRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.to() - 从当前状态到目标状态
    gsap.to(boxRef1.current, {
      x: 300,
      rotation: 360,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    // gsap.from() - 从指定状态到当前状态
    gsap.from(boxRef2.current, {
      opacity: 0,
      scale: 0,
      duration: 1.5,
      ease: "back.out(1.7)",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
    });

    // gsap.fromTo() - 明确指定起始和结束状态
    gsap.fromTo(
      boxRef3.current,
      {
        y: -50,
        backgroundColor: "#3498db",
      },
      {
        y: 50,
        backgroundColor: "#e74c3c",
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }
    );
  }, []);

  return (
    <div className="demo-container">
      <div className="demo-section">
        <h3>gsap.to() - 移动 + 旋转</h3>
        <div className="demo-area">
          <div ref={boxRef1} className="gsap-box gsap-box--primary">
            .to()
          </div>
        </div>
        <pre className="code-snippet">
          {`gsap.to(element, {
  x: 300,
  rotation: 360,
  duration: 2,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true
})`}
        </pre>
      </div>

      <div className="demo-section">
        <h3>gsap.from() - 缩放 + 淡入</h3>
        <div className="demo-area">
          <div ref={boxRef2} className="gsap-box gsap-box--success">
            .from()
          </div>
        </div>
        <pre className="code-snippet">
          {`gsap.from(element, {
  opacity: 0,
  scale: 0,
  duration: 1.5,
  ease: "back.out(1.7)",
  repeat: -1,
  yoyo: true
})`}
        </pre>
      </div>

      <div className="demo-section">
        <h3>gsap.fromTo() - 垂直移动 + 颜色变化</h3>
        <div className="demo-area">
          <div ref={boxRef3} className="gsap-box">
            .fromTo()
          </div>
        </div>
        <pre className="code-snippet">
          {`gsap.fromTo(element,
  { y: -50, backgroundColor: "#3498db" },
  { y: 50, backgroundColor: "#e74c3c",
    duration: 1, ease: "sine.inOut",
    repeat: -1, yoyo: true }
)`}
        </pre>
      </div>
    </div>
  );
};

export default BasicTween;
