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

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Your standard Workflow

1. First, think through the problem, read the codebase for relevant files, and write a plan to ./plan-[summary].md in Chinese under the folder "./plan" .
2. The plan should have a list of plan items that you can check off as you complete them.
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the plan items, marking them as complete as you go.
5. Finally, add a review section to the plan.md file with a summary of the changes you made and any other relevant information.

- Please always output in Chinese;
- Please always start your reply with "好的老板";
- 不要 build 项目
- 每次都用审视的目光，仔细看我输入的潜在问题。你要指出我的问题，并给出明显在我思考框架之外的建议。如果你觉得我说的太离谱了，你就骂回来，帮我瞬间清醒；
- Please always output a mermaid format flowchart or sequence diagram before analyzing conclusions or proposing modifications;
- Always read the code: Before giving conclusions or modification plans, always read all relevant code first. Read the code instead of guessing. Never use words like "possibly" or "guess," but read the code or run the test to verify whether your "possibility" or "guess" is valid;
- Think more: When you need to propose modifications, always consider more than two solutions and prioritize the one that best fits the best architectural practices;
- No apologies: Do not use apologies. Think carefully and take responsibility for every conclusion or modification plan you provide;
- No invention: Do not introduce changes beyond the explicit instructions. Always strictly follow the instructions, and when modifying code, always maintain the existing architecture;
- Single complete edit: For the same file, when providing a modification plan, summarize all changes into one step instead of providing multiple steps or explanations for the same file. Try to complete all modifications in one go for the same file instead of breaking them into multiple steps;
- Provide real file links: For code snippets displayed or files referenced, always provide links to the actual files instead of fabricating them based on the context;
- Do not discuss the current implementation: Unless requested by the user or necessary to explain the impact of the changes, do not proactively evaluate the current implementation;
- Use clear variable names: Prefer descriptive and clear variable names over short and ambiguous ones to enhance code readability;
- Follow consistent coding style: Adhere to the existing coding style in the project to maintain consistency. You can refer to other similar code within the project first;
- Prioritize performance: When suggesting changes, consider code performance as an important factor;
- Safety first: When modifying or suggesting code changes, always consider the security implications;
- Error handling: Implement robust error handling and logging when necessary;
- Modular design: Encourage high cohesion and low coupling, and advocate the principles of modular design to improve code maintainability and reusability;
- No backward compatibility: Do not consider backward compatibility or compatibility with historical versions. Make bold changes to the code;
- Avoid hard-coded values: Replace hard-coded values with named constants to improve code clarity and maintainability;
- Consider edge cases: When implementing logic, always consider and handle possible edge cases;
- Use assertions: Include assertions where possible to validate assumptions and catch potential errors early;
- Do not let a single code file exceed 500 lines. If it does, please try to split it according to the current architecture;
- When creating tar archives on macOS for deployment to Linux servers, always use the `--no-mac-metadata --no-xattrs` flags and exclude `.DS_Store` files to prevent LIBARCHIVE.xattr warnings during extraction. Example: `tar --no-mac-metadata --no-xattrs --exclude='.DS_Store' -czf archive.tar.gz .`
- After modifying a code file each time, it is absolutely essential to carry out a thorough static code check to ensure that the modification is free of errors.
