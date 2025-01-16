# @vswift/cli

Quick development scaffolding.

# Install

```sh
npm install -g @vswift/cli
```

Run `vswift -v` command to check if `@vswift/cli` is installed successfully, run `vswift -h` to see how to use it.

# Create initial project

```sh
vswift create
```

# Generate as needed

You need to configure the project and view data on the visual development platform first, and then export the json data. The following has a introduction to visual development platform.

## Visual development platform

The visual development platform completes the data configuration of projects and views and provides them to vswift for use. View the project [here](https://github.com/vsdeeper/visual-development), preview [here](https://vsdeeper.github.io/visual-development/).

## Configure directory

Configure the json file directory exported from the visual development platform, that is, the browser download directory.

```sh
vswift config set configFileDir "<dir>"
```

Example: `$ vswift config set configFileDir "C:\Users\Administrator\Downloads"`
Run `vswift config list` to see if the setting is successful.

## Generate project as needed

```sh
vswift generate project <name>
```

Note: `name` does not need the .json suffix.

## Generate view as needed

```sh
vswift generate view <name1[,name2[,name3[...]]]>
```

Note: `name` does not need the .json suffix, `,` separate multiple names to generate multiple views at the same time.
