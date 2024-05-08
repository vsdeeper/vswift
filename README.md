# vswift

A quick development package based on the monorepo architecture, mainly including [@vswift/cli](https://github.com/vsdeeper/vswift/tree/master/packages/cli), [@vswift/components](https://github.com/vsdeeper/vswift/tree/master/packages/components), [@vswift/utils](https://github.com/vsdeeper/vswift/tree/master/packages/utils).

- @vswift/cli - Quick development scaffolding, including framework initialization, dynamic generation of pages and components.
- @vswift/components - A general component library, mainly based on the secondary development of [element-plus](https://element-plus.org).
- @vswift/utils - Public methods, methods commonly used in business development.

## Develop

Develop components
```sh
pnpm dev:com
```

Develop scaffolding

```sh
pnpm dev:cli
```
It will monitor the modification of the .ts file of cli folder, compile and generate the dist directory in real time. There is no need to build it again when publishing, just publish the compiled dist directory directly.

Develop unplugin

```sh
pnpm dev:upg
```
It will monitor the modification of the .ts file of unplugin folder, compile and generate the dist directory in real time. There is no need to build it again when publishing, just publish the compiled dist directory directly.

## Publish

- Run `pnpm build <-p | --pkg> <utils | components>` command to build package.
- Run `pnpm changeset` command and fill in the basic information.
- Run `pnpm changeset version` command to generate changelog information (CHANGELOG.md).
- Run `pnpm release <-p | --pkg> <cli | utils | components | unplugin>` command to publish the selected package.

## Play

### First, install `@vswift/cli` globally

```sh
npm install -g @vswift/cli
```
Run `vswift -v` command to check if `@vswift/cli` is installed successfully.

### Create your own initial project as needed

```sh
vswift create
```

## Todo

- Develop `unplugin-vswift/vite` and import plugins on demand.
- Organize common components.
- Develop dynamically generated program of `visual-development`.