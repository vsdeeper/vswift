# vswift

A quick development tool based on the monorepo architecture, mainly includes packages such as @vswift/cli, @vswift/utils, and project template such as vue-admin.

- [@vswift/cli](https://github.com/vsdeeper/vswift/tree/master/packages/cli) - Quick development scaffolding, including framework initialization, dynamic generation of pages and components.
- [@vswift/utils](https://github.com/vsdeeper/vswift/tree/master/packages/utils) - Public methods, methods commonly used in business development.
- [vue-admin](https://github.com/vsdeeper/vswift/tree/master/templates/vue-admin) - Admin template based on vue + vite.

## Develop

### Install dependencies

```sh
pnpm install
```

### Develop scaffold

```sh
pnpm dev:cli
```
The cli is the soul of the project. The command will monitor the modification of .ts files in the cli directory and compile in real time to generate the dist directory. If it is the first time to enter the project, it is necessary to execute `pnpm dev:cli` to generate dist first, because the package.json configuration entry file of cli must be a compiled js file. If it is not the first development and the dist directory of cli has been generated, you can also execute `pnpm dev -p cli` instead of `pnpm dev:cli`.

### Develop vue-admin template

```sh
pnpm dev --tpl vue-admin
```

--tpl can be abbreviated to -t .

## Publish

- Run `pnpm build <-p, --pkg> <cli, utils>` command to build package.
- Run `pnpm changeset` command and fill in the basic information.
- Run `pnpm changeset version` command to generate changelog information (CHANGELOG.md).
- Run `pnpm release <-p, --pkg> <cli, utils>` command to publish the selected package.

## Play

### Install `@vswift/cli` globally

```sh
npm install -g @vswift/cli
```
Run `vswift -v` command to check if `@vswift/cli` is installed successfully.

### Create your own initial project as needed

```sh
vswift create
```

### Generate code

```sh
vswift gen <-p, --path> <json file path>
```

Used in conjunction with [visual-development](https://github.com/vsdeeper/visual-development) to convert configuration data into code.

## Visual development

Visual development through visual configuration, follow these steps:

- Run `vsiwft create` to get the initial framework of the project you need, currently only supports vue-admin.
- Complete the visual configuration of the project [here](https://vsdeeper.github.io/visual-development/), or you can clone the [visual-development](https://github.com/vsdeeper/visual-development) and deploy it anywhere.
- The visual development platform generates json data through visual configuration, run `vswift gen <-p, --path> <json file path>` to convert configuration data into project code.