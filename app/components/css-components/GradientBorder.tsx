import React from "react";
import "../../styles/gradient-border.scss";

const GradientBorder = () => {
  return (
    <div className="wrapper">
      <div className="frosted-card">我是渐变边框1</div>
      <div className="gradient-border">
        <div className="content">圆角 + 渐变边框</div>
      </div>
      <div className="border">圆角 + 渐变边框 + 半透明背景</div>
    </div>
  );
};

export default GradientBorder;
