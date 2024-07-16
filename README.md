# vswift

A quick development package based on the monorepo architecture, mainly including @vswift/cli, @vswift/utils.

- [@vswift/cli](https://github.com/vsdeeper/vswift/tree/master/packages/cli) - Quick development scaffolding, including framework initialization, dynamic generation of pages and components.
- [@vswift/utils](https://github.com/vsdeeper/vswift/tree/master/packages/utils) - Public methods, methods commonly used in business development.

## Develop

#### Develop scaffolding

```sh
pnpm dev:cli
```
It will monitor the modification of the .ts file of cli folder, compile and generate the dist directory in real time. There is no need to build it again when publishing, just publish the compiled dist directory directly.

## Publish

- Run `pnpm build <-p | --pkg> <cli | utils>` command to build package.
- Run `pnpm changeset` command and fill in the basic information.
- Run `pnpm changeset version` command to generate changelog information (CHANGELOG.md).
- Run `pnpm release <-p | --pkg> <cli | utils>` command to publish the selected package.

## Play

#### Install `@vswift/cli` globally

```sh
npm install -g @vswift/cli
```
Run `vswift -v` command to check if `@vswift/cli` is installed successfully.

#### Create your own initial project as needed

```sh
vswift create
```

## Todo

- Read json file from hard disk path, e.g. `fs.readFileSync('/Users/como/Downloads/test.json', 'utf-8')`.
- Develop `unplugin-vswift/vite` and import plugins on demand.
- Develop dynamically generated program of `visual-development`.