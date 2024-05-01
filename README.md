# vswift

A quick development package based on the monorepo architecture, mainly including [@vswift/cli](https://github.com/vsdeeper/vswift/tree/master/packages/cli), [@vswift/components](https://github.com/vsdeeper/vswift/tree/master/packages/components), [@vswift/utils](https://github.com/vsdeeper/vswift/tree/master/packages/utils).

- @vswift/cli - Quick development scaffolding, including framework initialization, dynamic generation of pages and components.
- @vswift/components - A general component library, mainly based on the secondary development of [element-plus](https://element-plus.gitee.io/).
- @vswift/utils - Public methods, methods commonly used in business development.

## Develop

Install dependencies
```
pnpm install
```

Develop components
```
pnpm dev:com
```

Develop scaffolding

```
pnpm dev:cli
```

It will monitor the modification of the cli file and compile and generate the dist file in real time. There is no need to build it again when publishing, just publish the compiled dist directory directly.

## Publish

- Run `pnpm build <-p | --pkg> <utils | components>` command to build package.
- Run `pnpm changeset` command and fill in the basic information.
- Run `pnpm changeset version` command to generate changelog information (CHANGELOG.md)
- Run `pnpm release <-p | --pkg> <cli | utils | components>` command to publish the selected package.

## Todo

- Develop `unplugin-vswift/vite` and import plugins on demand.
- Organize common components.
- Develop dynamically generated program of `visual-development`.