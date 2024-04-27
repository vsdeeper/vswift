# vswift

A quick development package based on the monorepo architecture, mainly including @vswift/cli, @vswift/components, @vswift/utils.

- @vswift/cli - quick development scaffolding, including framework initialization, dynamic generation of pages and components.
- @vswift/components - a general component library, mainly based on the secondary development of element-plus.
- @vswift/utils - public methods, methods commonly used in business development.

## Develop

when developing components run:

```
pnpm dev
```

when developing cli scaffolding run:

```
pnpm watch:cli
```

## Publish

- 运行 pnpm build <-p | --pkg> <cli | utils | components> 命令，打包选择的 package
- 运行 pnpm changeset 命令，填写基本信息
- 运行 pnpm changeset version 命令生成 changelog 信息（CHANGELOG.md）
- 运行 pnpm release <-p | --pkg> <cli | utils | components> 命令，发布选择的 package，也可切换到想要发布的 package 目录，运行 pnpm release 命令
