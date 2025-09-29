import React, { useState } from "react";

const BlurAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleAnimationToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* 控制按钮 */}
      <button
        onClick={handleAnimationToggle}
        style={{
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "30px",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#5a67d8";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#667eea";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {isVisible ? "Hide Animation" : "Show Animation"}
      </button>

      {/* 动画容器 */}
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "300px",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0) scale(1)"
            : "translateY(30px) scale(0.9)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* 模糊背景 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            background: "rgba(255, 255, 255, 0.1)",
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />

        {/* 半透明覆盖层 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
          }}
        />

        {/* 内容区域 */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "40px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "16px",
              textAlign: "center",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            Blur Background Animation - Hot Reload Test
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
              textAlign: "center",
              lineHeight: "1.5",
              textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            A beautiful component with blur background and fade-in animation
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlurAnimation;
