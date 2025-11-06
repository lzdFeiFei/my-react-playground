# Implementation Tasks

## 1. 路由配置
- [ ] 1.1 在 `app/routes.ts` 中添加 `/radix` 路由
- [ ] 1.2 创建路由目录 `app/routes/radix-playground/`

## 2. 样式文件
- [ ] 2.1 创建 `app/styles/radix-playground.scss`
- [ ] 2.2 在 `app/styles/global.scss` 中导入新样式
- [ ] 2.3 实现 Flexbox 左右分栏布局(避免 fixed 定位)

## 3. 主页面实现
- [ ] 3.1 创建 `app/routes/radix-playground/index.tsx`
- [ ] 3.2 实现左侧菜单栏组件列表
- [ ] 3.3 实现右侧展示区域
- [ ] 3.4 使用 useState 管理选中的组件

## 4. 组件集成
- [ ] 4.1 导入现有的 Radix 组件示例
  - Accordion (SimpleAccordion, Accordion)
  - MultiplePrimitives (Dialog + Tooltip)
  - PopoverDemo
- [ ] 4.2 为每个组件添加菜单项和展示逻辑

## 5. 验证
- [ ] 5.1 运行 `pnpm lint` 检查代码质量
- [ ] 5.2 手动测试所有菜单项切换
- [ ] 5.3 验证代码量在 300 行以内
- [ ] 5.4 确保布局响应正常,无点击事件阻塞问题
