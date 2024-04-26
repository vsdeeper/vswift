import { Command } from 'commander'

const program = new Command()

program
  .name('vswift')
  .option('-v, --version', 'display version for vswift-build')
  .action(async (options) => {
    const { version } = options
    if (version) {
      const { parsePackage } = await import('../utils/index.js')
      console.log(parsePackage('vswift-local').version)
    }
  })

program
  .command('build')
  .description('build')
  .option('-p, --pkg <name>', 'package name to perform build, optional value: utils | components')
  .action(async (options) => {
    const { buildTask } = await import('./build.js')
    return buildTask(options)
  })

program
  .command('release')
  .description('release')
  .option('-p, --pkg <name>', 'package name to perform release, optional value: utils | components')
  .action(async (options) => {
    const { release } = await import('./release.js')
    return release(options)
  })

program.parse(process.argv)
