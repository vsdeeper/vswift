import { Command } from 'commander'

const program = new Command()

program
  .name('vswift')
  .option('-v, --version', 'display version for vswift')
  .action(async options => {
    const { version } = options
    if (version) {
      const { parsePackage } = await import('../utils/index.js')
      console.log(parsePackage('cli').version)
    }
  })

program
  .command('type-check')
  .description('type check')
  .option(
    '-p, --pkg <name>',
    'package name to perform type check, optional value: components | utils | visual-development',
  )
  .action(async options => {
    const { typeCheck } = await import('./type-check.js')
    return typeCheck(options)
  })

program
  .command('type-emit')
  .description('type emit')
  .option(
    '-p, --pkg <name>',
    'package name to perform type emit, optional value: components | utils | visual-development',
  )
  .action(async options => {
    const { typeEmit } = await import('./type-emit.js')
    return typeEmit(options)
  })

program
  .command('build')
  .description('build')
  .option('-p, --pkg <name>', 'package name to perform build, optional value: components | utils | visual-development')
  .action(async options => {
    const { buildTask } = await import('./build.js')
    return buildTask(options)
  })

program
  .command('release')
  .description('release')
  .option(
    '-p, --pkg <name>',
    'package name to perform release, optional value: components | utils | visual-development',
  )
  .action(async options => {
    const { release } = await import('./release.js')
    return release(options)
  })

program.parse(process.argv)
