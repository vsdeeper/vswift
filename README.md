# vswift

A quick development tool based on the monorepo architecture.

## Develop

### Install dependencies

```sh
pnpm install
```

### Dev-cli

```sh
pnpm dev:cli
```

Dev-cli is the development scaffolding inside vswift, it will not be published to npm. It is responsible for packaging and publishing other packages and running templates. During runtime, it will monitor the modification of .ts files in dev-cli directory and compile them to the dist directory. If you want to develop vswift, you must first run it.

### Cli

```sh
pnpm dev --pkg cli
```

--tpl can be abbreviated to -p .

Cli is the directory of the npm package @vswift/cli. It will monitor the .ts changes in the cli directory and compile them to the dist directory. It is necessary to run it during debugging in the development phase.

### Develop vue-admin template

```sh
pnpm dev --tpl vue-admin
```

--tpl can be abbreviated to -t .

Run the vue-admin template to facilitate debugging during template development.

## Publish

- Run `pnpm build <-p, --pkg> <cli, utils>` command to build package.
- Run `pnpm changeset` command and fill in the basic information.
- Run `pnpm changeset version` command to generate changelog information (CHANGELOG.md).
- Run `pnpm release <-p, --pkg> <cli, utils>` command to publish the selected package.
