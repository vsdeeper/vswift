import { $ } from 'execa'
import { consola } from 'consola'
import { createSpinner } from 'nanospinner'
import type { CommandOptions } from './index.js'

export async function typeCheck(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires -p or --pkg parameter, optional value: cli')
    return
  }
  const spinner = createSpinner('type checking...', { color: 'green' }).start()
  try {
    const start = Date.now()
    switch (pkg) {
      case 'cli': {
        await $({ stdio: 'inherit' })`pnpm tsc --project tsconfig.${pkg}.json`
        break
      }
      default: {
        throw new Error('Uknown parameter')
      }
    }
    const end = Date.now()
    spinner.success({ text: `type check done in ${(end - start) / 1000}s` })
    return true
  } catch (error) {
    spinner.error({ text: 'type check failed' })
    consola.error(error)
  }
}
