import React, { useState } from "react";
import BlurAnimation from "../../components/css-components/BlurAnimation";
import BlurAnimationDrawer from "../../components/css-components/BlurAnimationDrawer";
import "../../styles/css-demo-layout.scss";

// 菜单项类型定义
interface MenuItem {
  id: string;
  label: string;
  component: React.ComponentType;
}

// 菜单配置
const menuItems: MenuItem[] = [
  {
    id: "blur-animation",
    label: "模糊动画",
    component: BlurAnimation,
  },
  {
    id: "blur-animation-drawer",
    label: "毛玻璃抽屉",
    component: BlurAnimationDrawer,
  },
];

const CssDemo = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>(menuItems[0].id);

  // 获取当前激活的组件
  const getCurrentComponent = () => {
    const activeItem = menuItems.find(item => item.id === activeMenuItem);
    if (activeItem) {
      const Component = activeItem.component;
      return <Component />;
    }
    return <div>组件未找到</div>;
  };

  // 获取当前激活菜单的标题
  const getCurrentTitle = () => {
    const activeItem = menuItems.find(item => item.id === activeMenuItem);
    return activeItem ? activeItem.label : "CSS 演示";
  };

  return (
    <div className="css-demo-layout">
      {/* 左侧菜单 */}
      <div className="sidebar">
        <div className="sidebar-header">
          CSS 组件演示
        </div>
        <div className="menu-list">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activeMenuItem === item.id ? "active" : ""}`}
              onClick={() => setActiveMenuItem(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="content-area">
        <div className="content-header">
          <h2>{getCurrentTitle()}</h2>
        </div>
        <div className="content-body">
          {getCurrentComponent()}
        </div>
      </div>
    </div>
  );
};

export default CssDemo;
