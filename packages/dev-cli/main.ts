import { Command } from 'commander'
import { buildTask, release, dev } from './scripts/index.js'

const program = new Command()

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

program.parse(process.argv)
