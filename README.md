# vswift

A quick development package based on the monorepo architecture, mainly including @vswift/cli, @vswift/components, @vswift/utils.

- @vswift/cli - quick development scaffolding, including framework initialization, dynamic generation of pages and components.
- @vswift/components - a general component library, mainly based on the secondary development of [element-plus](https://element-plus.gitee.io/).
- @vswift/utils - public methods, methods commonly used in business development.

## Develop

When developing components run:

```
pnpm dev
```

When developing cli scaffolding run:

```
pnpm watch:cli
```

## Publish

- Run `pnpm build <-p | --pkg> <cli | utils | components>` command to build.
- Run `pnpm changeset` command and fill in the basic information.
- Run `pnpm changeset version` command to generate changelog information (CHANGELOG.md)
- Run `pnpm release <-p | --pkg> <cli | utils | components>` command to publish the selected package. You can also switch to the package directory you want to publish and run the pnpm release command.
