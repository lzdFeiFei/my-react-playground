# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 技术栈

- **包管理工具**：pnpm
- **框架**：React 19 + TypeScript
- **路由**：React Router v7 (file-based routing)
- **构建工具**：Vite
- **样式**：SCSS

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器

# 构建
pnpm build            # TypeScript 编译 + Vite 构建

# 代码检查
pnpm lint             # 运行 ESLint

# 预览
pnpm preview          # 预览生产构建
```

## 项目架构

### 路由系统
- 使用 React Router v7 的文件路由配置（`app/routes.ts`）
- 路由文件位于 `app/routes/` 目录
- 根布局在 `app/root.tsx`，包含全局样式导入
- 404 路由使用通配符 `route("*", "./routes/404.tsx")` 捕获未匹配路由

### 样式组织
- 全局样式：`app/styles/global.scss` (在 `root.tsx` 中导入)
- 组件样式：每个 CSS 演示组件对应独立的 SCSS 文件（如 `blur-animation-drawer.scss`）
- 样式文件统一放在 `app/styles/` 目录

### 组件结构
- CSS 演示组件：`app/components/css-components/`
- 每个组件通常对应一个 SCSS 文件实现特定的 CSS 效果

## 开发约定

- 优先编辑现有文件而非创建新文件
- 不要创建不必要的文档或 README 文件
