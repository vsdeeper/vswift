import { Command } from 'commander'
import { parsePackage } from './utils/index.js'
import { buildTask, release, create, dev, search } from './scripts/index.js'

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
  .description('build, frame usage')
  .option('-p, --pkg <name>', 'package name to perform build, optional value: utils | components')
  .action((options) => {
    return buildTask(options)
  })

program
  .command('release')
  .description('release, frame usage')
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
