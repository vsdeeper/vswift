import { Command } from 'commander'
import { parsePackageJson } from './utils/index.js'
import { config, create, search } from './scripts/index.js'
import { generateProject, generateView } from './generator/vue-admin/index.js'

const program = new Command()

program
  .name('vswift')
  .option('-v, --version', 'display version for vswift-build')
  .action(options => {
    const { version } = options
    if (version) {
      console.log(parsePackageJson()?.version)
    }
  })

const configCommand = program.command('config').description('config vswift')

configCommand
  .command('downloadDir <path>')
  .description(
    'config download directory for vswift, it is the export directory of visual development data',
  )
  .action(options => {
    return config('downloadDir', options)
  })

configCommand
  .command('list')
  .description('get configuration list')
  .action(options => {
    return config('list', options)
  })

configCommand
  .command('get <name>')
  .description('get configuration with specified name')
  .action(options => {
    return config('get', options)
  })

configCommand
  .command('clear')
  .description('clear all configuration')
  .action(() => {
    return config('clear')
  })

configCommand
  .command('delete <name>')
  .description('delete configuration with specified name')
  .action(options => {
    return config('delete', options)
  })

program
  .command('create')
  .description('create a project as needed')
  .action(() => {
    return create()
  })

const generateCommand = program
  .command('generate')
  .description('generate code based on configuration data')

generateCommand
  .command('project <name>')
  .description('generate project with the specified configuration file')
  .action(name => {
    return generateProject(name)
  })

generateCommand
  .command('view <name>')
  .description('generate view with the specified configuration file')
  .action(name => {
    return generateView(name)
  })

program
  .command('search')
  .description('enter search readline')
  .action(() => {
    return search()
  })

program.parse(process.argv)
