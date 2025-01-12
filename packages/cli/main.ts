import { Command } from 'commander'
import { parsePackageJson } from './utils/utils.js'
import { config, create } from './scripts/index.js'
import { generateProject, generateView } from './generator/vue-admin/index.js'
import consola from 'consola'
import chalk from 'chalk'

const program = new Command()

program
  .name('vswift')
  .option('-v, --version', 'display version for vswift-build')
  .action(async options => {
    try {
      if (!Object.keys(options).length) {
        console.log(`You can execute ${chalk.gray(`${'vswift -h'}`)} to see how to use it.`)
      }
      const { version } = options
      if (version) {
        console.log((await parsePackageJson())?.version)
      }
    } catch (error) {
      consola.error(error)
    }
  })

const configCommand = program.command('config').description('config vswift')

configCommand
  .command('list')
  .description('get configuration list')
  .action(async () => {
    try {
      await config('list')
    } catch (error) {
      consola.error(error)
    }
  })

configCommand
  .command('set <name> <val>')
  .description('set configuration with specified name and value')
  .action(async (...args: any[]) => {
    try {
      await config('set', ...args)
    } catch (error) {
      consola.error(error)
    }
  })

configCommand
  .command('get <name>')
  .description('get configuration with specified name')
  .action(async (...args: any[]) => {
    try {
      await config('get', ...args)
    } catch (error) {
      consola.error(error)
    }
  })

configCommand
  .command('clear')
  .description('clear all configuration')
  .action(async () => {
    try {
      await config('clear')
    } catch (error) {
      consola.error(error)
    }
  })

configCommand
  .command('delete <name>')
  .description('delete configuration with specified name')
  .action(async (...args: any[]) => {
    try {
      await config('delete', ...args)
    } catch (error) {
      consola.error(error)
    }
  })

program
  .command('create')
  .description('create a project as needed')
  .action(async () => {
    try {
      await create()
    } catch (error) {
      consola.error(error)
    }
  })

const generateCommand = program
  .command('generate')
  .description('generate code based on configuration data')

generateCommand
  .command('project <name>')
  .description('generate project with the specified configuration file')
  .action(async name => {
    try {
      await generateProject(name)
    } catch (error) {
      consola.error(error)
    }
  })

generateCommand
  .command('view <name>')
  .description('generate view with the specified configuration file')
  .action(async name => {
    try {
      await generateView(name)
    } catch (error) {
      consola.error(error)
    }
  })

// program
//   .command('search')
//   .description('enter search readline')
//   .action(async () => {
//     await search()
//   })

program.parse(process.argv)
