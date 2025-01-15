# vswift

A quick development tool based on the monorepo architecture, mainly includes [visual-development](https://github.com/vsdeeper/visual-development), [vswift-form](https://github.com/vsdeeper/vswift-form), and [vue-admin](https://github.com/vsdeeper/vswift/tree/master/templates/vue-admin).

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

### Create initial project

```sh
vswift create
```

### Generate as needed

You need to configure the project and view data on the visual development platform first, and then export the json data. The following has a introduction to visual development platform.

#### Visual development platform

The visual development platform completes the data configuration of projects and views and provides them to vswift for use. View the project [here](https://github.com/vsdeeper/visual-development), preview [here](https://vsdeeper.github.io/visual-development/).

#### Configure directory

Configure the json file directory exported from the visual development platform, that is, the browser download directory.

```sh
vswift config set configFileDir "<dir>"
```

Example: `$ vswift config set configFileDir "C:\Users\Administrator\Downloads"`
Run `vswift config list` to see if the setting is successful.

#### Generate project as needed

```sh
vswift generate project <name>
```

Note: `name` does not need the .json suffix.

#### Generate view as needed

```sh
vswift generate view <name1[,name2[,name3[...]]]>
```

Note: `name` does not need the .json suffix, `,` separate multiple names to generate multiple views at the same time.
