import React, { useState } from "react";
import BasicTween from "../../components/gsap-components/BasicTween.tsx";
import Timeline from "../../components/gsap-components/Timeline.tsx";
import ScrollTrigger from "../../components/gsap-components/ScrollTrigger.tsx";
import Stagger from "../../components/gsap-components/Stagger.tsx";
import "../../styles/gsap-demo.scss";

type DemoName = "basic-tween" | "timeline" | "scroll-trigger" | "stagger";

interface DemoItem {
  id: DemoName;
  label: string;
  description: string;
  component: React.ReactNode;
}

const DEMOS: DemoItem[] = [
  {
    id: "basic-tween",
    label: "基础补间动画",
    description: "学习 gsap.to(), gsap.from(), gsap.fromTo() 的基础用法",
    component: <BasicTween />,
  },
  {
    id: "timeline",
    label: "时间轴动画",
    description: "使用 Timeline 创建连续的动画序列",
    component: <Timeline />,
  },
  {
    id: "scroll-trigger",
    label: "滚动触发",
    description: "基于滚动位置触发动画效果",
    component: <ScrollTrigger />,
  },
  {
    id: "stagger",
    label: "交错动画",
    description: "为多个元素创建交错的动画效果",
    component: <Stagger />,
  },
];

const GsapDemo = () => {
  const [selectedDemo, setSelectedDemo] = useState<DemoName>("basic-tween");

  const currentDemo =
    DEMOS.find((item) => item.id === selectedDemo) || DEMOS[0];

  return (
    <div className="gsap-playground">
      {/* 左侧菜单栏 */}
      <aside className="gsap-playground__sidebar">
        <h1 className="gsap-playground__title">GSAP 学习</h1>
        <nav className="gsap-playground__menu">
          {DEMOS.map((item) => (
            <button
              key={item.id}
              className={`gsap-playground__menu-item ${
                selectedDemo === item.id
                  ? "gsap-playground__menu-item--active"
                  : ""
              }`}
              onClick={() => setSelectedDemo(item.id)}
            >
              <div className="gsap-playground__menu-label">{item.label}</div>
              <div className="gsap-playground__menu-desc">
                {item.description}
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* 右侧展示区域 */}
      <main className="gsap-playground__content">
        <div className="gsap-playground__demo-header">
          <h2>{currentDemo.label}</h2>
          <p>{currentDemo.description}</p>
        </div>
        <div className="gsap-playground__demo">{currentDemo.component}</div>
      </main>
    </div>
  );
};

export default GsapDemo;
