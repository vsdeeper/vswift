import { Command } from 'commander'
import { parsePackage } from './utils/index.js'
import { config, buildTask, release, create, dev, search } from './scripts/index.js'

const program = new Command()

program
  .name('vswift')
  .option('-v, --version', 'display version for vswift-build')
  .action((options) => {
    const { version } = options
    if (version) {
      console.log(parsePackage('cli').version)
    }
  })

const configCommand = program.command('config').description('config vswift')

configCommand
  .command('downloadDir <path>')
  .description(
    'config download directory for vswift, it is the export directory of visual development data'
  )
  .action((options) => {
    return config('downloadDir', options)
  })

configCommand
  .command('fileName <name>')
  .description('config file name for vswift, it is the export file name of visual development data')
  .action((options) => {
    return config('fileName', options)
  })

configCommand
  .command('get <name>')
  .description('get the specified configuration')
  .action((options) => {
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
  .description('delete the specified configuration')
  .action((options) => {
    return config('delete', options)
  })

program
  .command('dev')
  .description('run a package or template for development')
  .option('-p, --pkg <name>', 'package name to perform dev, optional value: cli')
  .option('-t, --tpl <name>', 'template name to perform dev, optional value: vue-admin')
  .action((options) => {
    return dev(options)
  })

program
  .command('build')
  .description('optional build a package')
  .option('-p, --pkg <name>', 'package name to perform build, optional value: utils | components')
  .action((options) => {
    return buildTask(options)
  })

program
  .command('release')
  .description('optional release a package')
  .option('-p, --pkg <name>', 'package name to perform release, optional value: utils | components')
  .action((options) => {
    return release(options)
  })

program
  .command('create')
  .description('create a project as needed')
  .action(() => {
    return create()
  })

program
  .command('search')
  .description('enter search readline')
  .action(() => {
    return search()
  })

program.parse(process.argv)
