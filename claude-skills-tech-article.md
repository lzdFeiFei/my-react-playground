# Claude Skills 完整指南:让 AI 记住你的工作规范

**一句话总结:** Skills = 可被 AI 自主调用的专业指令集,按需加载,无需重复说明。

## 核心概念

**问题:** 每次让 AI 帮忙都要重复项目规范、编码标准、工作流程。

**解决:** 创建 Skills 文件,AI 自动识别并应用相关规范。

**本质:** 把"临时提示词"变成"可复用知识库"。

## Skills 工作机制

```
启动时
  ↓
预加载所有 Skills 的 name + description (仅元数据)
  ↓
用户发起请求
  ↓
AI 分析任务 → 匹配相关 Skills → 加载完整指令 → 执行任务
```

**关键特性:**
- ⚡ **按需加载**: 仅加载相关 Skills,Token 效率提升 60-80%
- 🧠 **自主判断**: AI 自动决定何时用哪个 Skill
- 🔄 **跨平台**: 网页/Code/API 无缝复用

## 最小可用示例

### 创建 Skill

**1. 创建目录:**
```bash
# 项目专属
mkdir -p .claude/skills/my-skill

# 全局通用
mkdir -p ~/.claude/skills/my-skill
```

**2. 编写 SKILL.md:**
```markdown
---
name: react-standards
description: React 团队开发规范
---

# React 开发规范

## 组件规则
- 函数组件 + Hooks
- Props 必须有 TypeScript 接口
- 单文件不超过 500 行

## 命名规范
- 组件: PascalCase
- Hooks: camelCase + use 前缀
- 事件: handle 前缀

## 样式方案
- 使用 SCSS 模块
- 避免内联样式
```

**3. 重启 Claude Code** - 自动生效

### 测试效果

```
你: 创建一个用户列表组件

AI 自动应用 react-standards:
- 生成函数组件
- 包含 TypeScript 接口
- 使用 SCSS 样式
- 遵循命名规范
```

**无需手动触发,AI 自动识别场景并应用。**

## Skills vs MCP 对比

| 维度 | Skills | MCP |
|------|--------|-----|
| **定位** | 教 AI "怎么做" | 让 AI "能做" |
| **功能** | 标准化工作流程 | 连接外部系统 |
| **调用** | AI 自主按需加载 | 明确触发 |
| **Token** | 极高效(按需) | 中等(前置) |
| **难度** | Markdown 即可 | 需要编程 |
| **场景** | 规范/流程/标准 | 工具/API/数据 |

**类比:** MCP = 装工具(手脚), Skills = 注入知识(大脑)

**协同案例:**
```
任务: GitHub 代码审查
├── MCP: 连接 GitHub API,读取代码/PR
└── Skills: 应用团队审查标准(安全/性能/规范)
```

## 实际应用数据

### 效率提升

| 场景 | 传统方式 | 使用 Skills | 提升 |
|------|---------|------------|------|
| 财务报表生成 | 8小时 | 1小时 | 87.5% |
| 代码规范检查 | 手动重复说明 | 自动应用 | 100% |
| 文档标准化 | 每次调整格式 | 统一模板 | 70% |

**数据来源:** Rakuten 实际案例

### Token 效率

| 场景 | 前置加载 | Skills 按需 | 节省 |
|------|---------|------------|------|
| 多规范项目 | 5000+ tokens | 1000-2000 | 60-80% |
| 跨领域任务 | 重复说明 | 自动组合 | 50-70% |

## 高级用法

### 1. Skills 组合

**策略:** 小而专,自动组合

```
.claude/skills/
├── architecture/      # 架构设计原则
├── testing/          # 测试策略
├── security/         # 安全检查
├── performance/      # 性能优化
└── documentation/    # 文档标准
```

**效果:** AI 根据任务自动组合相关 Skills

### 2. 包含可执行脚本

```
my-skill/
├── SKILL.md
├── scripts/
│   ├── validate.py    # 代码验证
│   └── format.sh      # 格式化
└── templates/
    └── component.tsx  # 组件模板
```

**SKILL.md 中引用:**
```markdown
验证代码时执行: `scripts/validate.py`
创建组件时使用: `templates/component.tsx`
```

### 3. 动态上下文

```markdown
## 路径感知规则

- `src/components/`: 强调可复用性
- `src/services/`: 强调错误处理
- `src/utils/`: 强调纯函数
- `src/hooks/`: 强调性能优化
```

AI 根据当前文件路径自动应用对应规则。

## 最佳实践

### ✅ 推荐

1. **精准 description**
   ```yaml
   # ❌ 模糊
   description: React 开发相关

   # ✅ 精准
   description: React 19 + TypeScript 组件开发规范和 Hooks 最佳实践
   ```

2. **专注单一领域**
   - 一个 Skill 解决一类问题
   - 不要创建"万能 Skill"

3. **提供代码示例**
   ```markdown
   ## 命名规范

   **❌ 错误:**
   ```typescript
   const data = fetchData();  // 模糊
   ```

   **✅ 正确:**
   ```typescript
   const userList = fetchUserList();  // 清晰
   ```
   ```

4. **版本控制**
   ```bash
   git add .claude/skills/
   git commit -m "feat: 添加 React 开发规范 Skill"
   ```

### ❌ 避免

1. **过长 Skill** - 超过 1000 行影响加载性能
2. **重复基础知识** - AI 已掌握的通用内容无需重写
3. **硬编码敏感信息** - 使用环境变量
4. **冲突规则** - 多个 Skills 给出矛盾指令
5. **忽略维护** - 过时的 Skill 比没有更糟

## Skills vs CLAUDE.md

| 特性 | CLAUDE.md | Skills |
|------|-----------|--------|
| **用途** | 项目全局配置 | 模块化专业知识 |
| **加载** | 总是加载 | 按需加载 |
| **内容** | 技术栈、架构概览 | 具体领域深度指令 |
| **Token** | 持续占用 | 仅使用时占用 |
| **复用** | 项目绑定 | 跨项目 |

### 组合策略

**CLAUDE.md:**
```markdown
# 项目信息
- 技术栈: React 19 + TypeScript
- 包管理: pnpm
- 样式: SCSS

# 通用规范
- 回复用中文
- 不要 build
```

**Skills:**
```
.claude/skills/
├── react-developer/      # React 专业规范
├── typescript-expert/    # TS 高级模式
└── code-reviewer/        # 代码审查标准
```

**效果:** CLAUDE.md 提供基础上下文,Skills 提供专业知识,Token 效率最大化。

## 完整示例: TypeScript Skill

```markdown
---
name: typescript-expert
description: TypeScript 5.0+ 高级开发和类型系统最佳实践
---

# TypeScript 高级开发规范

## 类型定义原则

1. **优先 `type` 而非 `interface`**
   - 场景: 除非需要声明合并

2. **使用 `unknown` 而非 `any`**
   ```typescript
   // ❌ 不安全
   function parse(data: any) { }

   // ✅ 安全
   function parse(data: unknown) {
     if (typeof data === 'string') { }
   }
   ```

3. **善用 const assertions**
   ```typescript
   // ❌ 类型推断为 string
   const method = 'GET';

   // ✅ 类型推断为 'GET'
   const method = 'GET' as const;
   ```

## 常见模式

### 条件类型
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

### 映射类型
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## 性能优化

- ❌ 避免深层类型嵌套 (> 5 层)
- ✅ 使用类型别名简化
- ✅ 合理使用泛型约束

## 版本要求

- TypeScript: 5.0+
- 支持特性: 装饰器、const 类型参数

## 检查命令

\```bash
tsc --noEmit  # 类型检查
tsc --version  # 查看版本
\```
```

## 常见问题

### Q1: 如何调试 Skill 是否生效?

**方法 1: 观察 AI 行为**
```
测试前: AI 不遵循特定规范
创建 Skill 后: AI 自动应用规范
```

**方法 2: 查看日志**
```bash
# Claude Code 启动日志会显示加载的 Skills
# 检查目录结构
ls .claude/skills/
```

### Q2: 多个 Skills 冲突怎么办?

**原则:** 避免矛盾规则

**解决:**
```markdown
# Skill A: react-standards
组件文件不超过 500 行

# Skill B: performance-rules
组件文件不超过 300 行

# ❌ 冲突! AI 会困惑
```

**正确做法:**
```markdown
# 合并为一个 Skill 或明确优先级
组件文件不超过 300 行(性能优先)
或使用 500 行(标准规范)
```

### Q3: Skills 能否访问网络?

**当前:** Skills 是静态指令集,不能直接访问网络

**配合 MCP:**
```
MCP 工具获取网络数据
↓
Skills 定义如何处理数据
```

### Q4: 如何更新 Skill?

```bash
# 1. 编辑 SKILL.md
vim .claude/skills/my-skill/SKILL.md

# 2. 重启 Claude Code
# AI 自动加载最新版本
```

## 社区资源

- **官方仓库**: [github.com/anthropics/skills](https://github.com/anthropics/skills)
- **社区精选**: [github.com/travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)
- **官方文档**: [docs.claude.com/en/docs/claude-code/skills](https://docs.claude.com/en/docs/claude-code/skills)

## 2025 年路线图

| 时间 | 功能 | 说明 |
|------|------|------|
| Q1 | Skills 市场 | 上传/下载/评分 |
| Q2 | 开发工具链 | IDE 插件、测试框架 |
| Q3 | 企业管理 | 私有仓库、权限控制 |
| Q4 | 跨平台标准 | 兼容其他 AI 平台 |

## 快速上手清单

- [ ] 创建第一个 Skill 目录
- [ ] 编写 SKILL.md (name + description + 指令)
- [ ] 重启 Claude Code
- [ ] 测试 AI 是否自动应用
- [ ] 根据效果迭代优化
- [ ] 提交到版本控制
- [ ] 团队共享

## 总结

**Skills 解决的核心问题:**
- ❌ 重复说明 → ✅ 自动应用
- ❌ 通用助手 → ✅ 领域专家
- ❌ 临时提示 → ✅ 知识资产

**三个关键价值:**
1. **效率**: Token 节省 60-80%,任务速度提升 87.5%
2. **标准**: 团队规范统一,新人快速上手
3. **复用**: 跨项目/平台,持续发挥价值

**立即行动:**
```bash
# 1. 创建你的第一个 Skill
mkdir -p .claude/skills/my-first-skill
vim .claude/skills/my-first-skill/SKILL.md

# 2. 写下最常重复的规范
# 3. 重启测试
# 4. 持续优化
```

**记住:** 一个 Markdown 文件,就能让 AI 记住你的工作方式。

---

**环境:** Claude Skills 2025.10 | Anthropic

**更新:** 2025-10-29
