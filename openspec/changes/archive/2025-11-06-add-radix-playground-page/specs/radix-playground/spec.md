# Radix Playground Specification

## ADDED Requirements

### Requirement: Radix Playground Page Layout
系统 SHALL 提供一个 Radix UI 组件展示页面,采用左右分栏布局,左侧显示组件菜单,右侧显示选中组件的演示效果。

#### Scenario: 访问 Radix Playground 页面
- **WHEN** 用户访问 `/radix` 路由
- **THEN** 显示左右分栏布局的页面
- **AND** 左侧显示组件菜单列表
- **AND** 右侧显示默认选中组件的演示内容

#### Scenario: 左侧菜单默认展示
- **WHEN** 页面加载完成
- **THEN** 左侧菜单列出所有可用的 Radix 组件
- **AND** 包含 Accordion、Dialog + Tooltip、Popover 等组件
- **AND** 第一个组件默认被选中高亮

### Requirement: 组件切换交互
用户 MUST 能够通过点击左侧菜单项切换右侧展示的组件内容。

#### Scenario: 点击菜单项切换组件
- **WHEN** 用户点击左侧菜单中的组件名称
- **THEN** 该菜单项高亮显示
- **AND** 右侧展示区域切换为对应组件的演示内容
- **AND** 之前选中的菜单项取消高亮

#### Scenario: 组件演示正常渲染
- **WHEN** 右侧展示区域加载组件
- **THEN** 组件按照原有样式和交互正常渲染
- **AND** 组件的所有功能可正常使用

### Requirement: 简洁实现约束
页面实现 MUST 遵循项目的 MVP-First 和简洁性原则。

#### Scenario: 单文件实现
- **WHEN** 开发人员实现该功能
- **THEN** 主逻辑在单个 TSX 文件中完成
- **AND** 代码行数不超过 300 行
- **AND** 不创建不必要的组件抽象

#### Scenario: 单 SCSS 文件样式
- **WHEN** 编写样式代码
- **THEN** 使用单个 SCSS 文件 (`radix-playground.scss`)
- **AND** 使用 Flexbox 布局而非 fixed 定位
- **AND** 避免复杂的 z-index 层级
- **AND** 选择器嵌套不超过 3 层

#### Scenario: 状态管理简化
- **WHEN** 管理组件选中状态
- **THEN** 使用 React useState Hook
- **AND** 不使用 URL 子路由或复杂状态管理库
- **AND** 状态仅在当前页面内有效

### Requirement: 布局规范
页面布局 MUST 采用文档流方式,避免固定定位导致的交互问题。

#### Scenario: 左右分栏布局
- **WHEN** 页面渲染
- **THEN** 使用 Flexbox 实现左右分栏
- **AND** 左侧菜单固定宽度(如 280px)
- **AND** 右侧内容区域自适应剩余宽度
- **AND** 不使用 `position: fixed` 或 `position: absolute` 作为主布局方式

#### Scenario: 避免点击事件阻塞
- **WHEN** 用户与页面交互
- **THEN** 所有可点击元素正常响应
- **AND** 不存在因 z-index 或定位导致的事件阻塞问题
