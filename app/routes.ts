import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("css", "./routes/css-playground/css-demo.tsx"),
  route("radix", "./routes/radix-playground/index.tsx"),
  route("gsap", "./routes/gsap-playground/gsap-demo.tsx"),
  // 捕获所有未匹配的路由（包括 Chrome DevTools 请求）
  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
