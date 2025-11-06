import React, { useState } from "react";
import SimpleAccordion from "../../components/radix-components/components/Accordion/SimpleAccordion";
import MultiplePrimitives from "../../components/radix-components/multiple-primitives/MultiplePrimitives";
import PopoverDemo from "../../components/radix-components/popover-demo/PopoverDemo";

type ComponentName = "accordion" | "dialog-tooltip" | "popover";

interface ComponentItem {
  id: ComponentName;
  label: string;
  component: React.ReactNode;
}

const COMPONENTS: ComponentItem[] = [
  {
    id: "accordion",
    label: "Accordion",
    component: <SimpleAccordion />,
  },
  {
    id: "dialog-tooltip",
    label: "Dialog + Tooltip",
    component: <MultiplePrimitives />,
  },
  {
    id: "popover",
    label: "Popover",
    component: <PopoverDemo />,
  },
];

const RadixPlayground = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentName>("accordion");

  const currentComponent =
    COMPONENTS.find((item) => item.id === selectedComponent)?.component || null;

  return (
    <div className="radix-playground">
      {/* 左侧菜单栏 */}
      <aside className="radix-playground__sidebar">
        <h2 className="radix-playground__title">Radix Components</h2>
        <nav className="radix-playground__menu">
          {COMPONENTS.map((item) => (
            <button
              key={item.id}
              className={`radix-playground__menu-item ${
                selectedComponent === item.id
                  ? "radix-playground__menu-item--active"
                  : ""
              }`}
              onClick={() => setSelectedComponent(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* 右侧展示区域 */}
      <main className="radix-playground__content">
        <div className="radix-playground__demo">{currentComponent}</div>
      </main>
    </div>
  );
};

export default RadixPlayground;
