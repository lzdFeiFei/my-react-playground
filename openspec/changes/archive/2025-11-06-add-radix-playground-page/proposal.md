# Add Radix Playground Page

## Why
当前项目已有多个 Radix UI 组件示例(Accordion, Dialog, Tooltip 等),但缺少统一的展示页面。需要一个简洁的 playground 页面来浏览和查看这些组件效果。

## What Changes
- 添加 `/radix` 路由页面,使用左右分栏布局
- 左侧菜单栏列出所有 Radix 组件
- 右侧展示区域显示选中组件的 demo
- 使用 useState 管理选中状态(无需 URL 子路由)
- 单文件实现 + 单个 SCSS 文件,遵循项目 MVP-First 原则
- 目标代码量 <300 行

## Impact
- **新增规范**: radix-playground (新功能)
- **影响文件**:
  - 新增: `app/routes/radix-playground/index.tsx`
  - 新增: `app/styles/radix-playground.scss`
  - 修改: `app/routes.ts` (添加路由配置)
  - 修改: `app/styles/global.scss` (导入新样式)
- **依赖**: 无外部依赖,使用已有的 Radix 组件
