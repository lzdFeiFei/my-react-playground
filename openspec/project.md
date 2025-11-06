# Project Context

## Purpose
一个 React 技术演示和实验项目，用于展示和测试各种 CSS 效果、React 组件模式和前端技术方案。项目专注于前端技术探索和最佳实践验证。

## Tech Stack
- **包管理工具**: pnpm
- **核心框架**: React 19 + TypeScript
- **路由系统**: React Router v7 (file-based routing)
- **构建工具**: Vite
- **样式方案**: SCSS
- **代码检查**: ESLint

## Project Conventions

### Code Style
- 使用 TypeScript 严格模式
- 组件使用函数式组件 + React Hooks
- 优先使用描述性的长变量名而非简短模糊的名称（提升代码可读性）
- 单个代码文件推荐 500 行左右，可接受 600 行，但绝对不超过 800 行
- 避免硬编码值，使用具名常量提高代码清晰度和可维护性
- 遵循项目现有代码风格，保持一致性

### Architecture Patterns
- **路由架构**:
  - 使用 React Router v7 文件路由配置（`app/routes.ts`）
  - 路由文件位于 `app/routes/` 目录
  - 根布局在 `app/root.tsx`，包含全局样式导入
  - 404 路由使用通配符 `route("*", "./routes/404.tsx")` 捕获未匹配路由

- **组件结构**:
  - CSS 演示组件放在 `app/components/css-components/`
  - 每个组件通常对应一个 SCSS 文件实现特定的 CSS 效果

- **样式组织**:
  - 全局样式: `app/styles/global.scss` (在 `root.tsx` 中导入)
  - 组件样式: 每个 CSS 演示组件对应独立的 SCSS 文件（如 `blur-animation-drawer.scss`）
  - 样式文件统一放在 `app/styles/` 目录

- **设计原则**:
  - 高内聚低耦合，倡导模块化设计
  - 优先编辑现有文件而非创建新文件
  - 对于同一文件的修改，一次性完成而非分多步骤

### Implementation Strategy (实施策略)

**Core Principle**: YAGNI (You Aren't Gonna Need It) + MVP-First

#### MVP-First Approach
1. **Start Simple**: 单文件实现,<300行代码
2. **Validate**: 用户确认核心功能可用
3. **Enhance**: 根据实际需求渐进优化

#### Preferred Patterns for Small Features
- **Styles**: **SCSS文件优先** (项目规范,必须遵循)
  - 单个SCSS文件 > 多个SCSS文件
  - 扁平选择器 > 深度嵌套 (避免超过3层)
  - Flexbox/Grid布局 > fixed定位
  - BEM命名或简单类名
- **Layout**: 文档流布局 > 绝对/固定定位
- **State**: useState > URL routing (除非明确需要书签/分享)
- **Components**: 内联组件 > 独立文件 (除非复用3次以上)

#### SCSS Guidelines (Critical)
**项目要求使用SCSS,但要避免以下陷阱**:

✅ **推荐做法**:
- 使用Flexbox/Grid实现响应式布局
- BEM命名或简单类名
- CSS变量管理主题值
- 相对定位为主,绝对定位为辅

❌ **反模式** (本项目实际遇到的问题):
- `position: fixed` + 多层z-index (导致点击事件被阻塞)
- 选择器嵌套超过3层
- 为小功能创建4+个独立SCSS文件
- 过度使用绝对定位构建布局

**教训**: 简单的Flexbox布局 + 扁平的SCSS结构 是最可靠的方案

#### Complexity Gates
只在以下情况添加复杂度:
- 性能数据证明当前方案太慢
- 明确的扩展需求 (如>50个组件需要注册系统)
- 代码超过500行需要拆分

#### Anti-Patterns to Avoid
- ❌ 固定定位 + 复杂z-index层级 (易导致事件阻塞)
- ❌ 为未来可能的需求预先设计架构
- ❌ 在桌面版本未验证前实现响应式设计
- ❌ 多层组件抽象 (除非每层都有明确的复用场景)

### Testing Strategy
- 每次修改代码后必须进行彻底的静态代码检查，确保修改无误
- 使用 ESLint 进行代码质量检查 (`pnpm lint`)
- 考虑边缘情况，实现逻辑时始终处理可能的边界条件
- 在可能的地方使用断言来验证假设并及早发现潜在错误
- **注意**: 开发过程中不主动执行 build 操作

### Git Workflow
- 使用传统的 commit message 格式：
  - `feat:` 新功能
  - `fix:` 修复问题
  - `chore:` 杂项（如清理、配置）
  - `docs:` 文档相关
  - `refactor:` 重构
- 每次提交附带 Claude Code 签名
- 不考虑向后兼容，可以大胆修改代码
- 优先编辑现有文件而非创建新文件
- 不主动创建不必要的文档或 README 文件

## Domain Context
这是一个前端技术演示项目，核心关注点：
- **CSS 技术**: 各种 CSS 动画效果、视觉特效的实现和演示
- **React 模式**: React 组件的最佳实践、Hooks 使用模式
- **现代工具链**: Vite、pnpm、React Router v7 等现代前端工具的应用

项目特点：
- 实验性质，用于技术验证和学习
- 注重代码质量和性能
- 不需要考虑生产环境的向后兼容性

## Important Constraints
- **简单性优先**: **先实现最简单可工作的版本**,避免过早优化和过度设计
- **YAGNI原则**: 不为"可能"的需求编写代码,只实现当前明确需要的功能
- **渐进增强**: MVP验证 → 核心功能 → 可选优化,每个阶段都需要用户确认
- **性能优先**: 建议修改时始终将代码性能作为重要考量因素
- **安全第一**: 修改或建议代码变更时，始终考虑安全影响，避免 XSS、SQL 注入等 OWASP Top 10 漏洞
- **无向后兼容**: 不需要考虑向后兼容或历史版本兼容，可以大胆修改代码
- **错误处理**: 必要时实现健壮的错误处理和日志记录
- **代码复用**: 避免硬编码值，使用具名常量
- **文件大小**: 严格控制单文件代码行数，超过阈值时按当前架构拆分

## External Dependencies
- 无关键外部服务或 API 依赖
- 项目完全可在本地开发环境运行
- 所有依赖通过 pnpm 管理，定义在 `package.json` 中
