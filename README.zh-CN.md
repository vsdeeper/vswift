# vswift

一个基于 monorepo 架构的快速开发工具。

## 开发

### 安装依赖

```sh
pnpm install
```

### Dev-cli

```sh
pnpm dev:cli
```

Dev-cli 是 vswift 内部使用的开发脚手架，不会发布到 npm。它负责其他包的打包与发布，以及模板运行。在运行时，它会监听 dev-cli 目录中 `.ts` 文件的变更并编译到 `dist` 目录。如果你要开发 vswift，需要先运行它。

### Cli

```sh
pnpm dev --pkg cli
```

`--pkg` 可以简写为 `-p`。

Cli 对应 npm 包 `@vswift/cli` 的目录。它会监听 cli 目录中 `.ts` 文件的变更并编译到 `dist` 目录。在开发阶段进行调试时，需要运行该命令。

### 开发 vue-admin 模板

```sh
pnpm dev --tpl vue-admin
```

`--tpl` 可以简写为 `-t`。

运行 vue-admin 模板，便于在模板开发阶段进行调试。

## 发布

- 运行 `pnpm build <-p, --pkg> <cli, utils>` 命令构建包。
- 运行 `pnpm changeset` 命令并填写基本信息。
- 运行 `pnpm changeset version` 命令生成变更日志（`CHANGELOG.md`）。
- 运行 `pnpm release <-p, --pkg> <cli, utils>` 命令发布指定包。
