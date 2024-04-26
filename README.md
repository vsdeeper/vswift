# vswift

基于 monorepo 架构的快捷开发包，主要包含 @vswift/cli, @vswift/components, @vswift/utils。

- @vswift/cli - 快捷开发脚手架，包含框架初始化、页面组件动态生成。
- @vswift/components - 通用组件库，主要基于element-plus组件的二次封装。
- @vswift/utils - 公用方法，业务开发中常用的方法。

## 打包发布

- 运行 pnpm build <-p | --pkg> <components | utils> 命令，打包选择的 package
- 运行 pnpm changeset 命令，填写基本信息
- 运行 pnpm changeset version 命令生成 changelog 信息（CHANGELOG.md）
- 运行 pnpm release <-p | --pkg> <components | utils> 命令，发布选择的 package，也可切换到想要发布的 package 目录，运行 pnpm release 命令
