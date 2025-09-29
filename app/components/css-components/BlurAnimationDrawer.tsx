import React, { useState } from "react";
import "../../styles/blur-animation-drawer.scss";

const BlurAnimationDrawer = () => {
  const [isDrawer1Open, setIsDrawer1Open] = useState(false);
  const [isDrawer2Open, setIsDrawer2Open] = useState(false);

  const toggleDrawer1 = () => {
    setIsDrawer1Open(!isDrawer1Open);
  };
  const toggleDrawer2 = () => {
    setIsDrawer2Open(!isDrawer2Open);
  };

  return (
    <div className="drawer-background">
      <div className={`drawer drawer1 ${isDrawer1Open ? "show" : ""}`}>
        <div className="drawer-content">
          <h1>Drawer1</h1>
          <p>这是左侧毛玻璃抽屉的内容，可以放导航、功能按钮等。</p>
        </div>
      </div>

      <div className={`drawer drawer2 ${isDrawer2Open ? "show" : ""}`}>
        <div className="drawer-overlay">
          <div className="drawer-content">
            <h1>Drawer2</h1>
            <p>这是左侧毛玻璃抽屉的内容，可以放导航、功能按钮等。</p>
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="button-group">
        <button className="toggle-btn" onClick={toggleDrawer1}>
          打开/关闭抽屉1
        </button>
        <button className="toggle-btn" onClick={toggleDrawer2}>
          打开/关闭抽屉2
        </button>
      </div>
    </div>
  );
};

export default BlurAnimationDrawer;
