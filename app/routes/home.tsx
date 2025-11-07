import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div onClick={() => alert("Home")}>Home2</div>
      <Link to="/css">
        <button>跳转到 CSS 演示</button>
      </Link>
      <Link to="/radix">
        <button>跳转到 Radix Playground</button>
      </Link>
      <Link to="/gsap">
        <button>跳转到 GSAP Playground</button>
      </Link>
    </div>
  );
};

export default Home;
