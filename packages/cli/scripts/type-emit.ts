import { $ } from 'execa'
import { consola } from 'consola'
import { createSpinner } from 'nanospinner'
import type { CommandOptions } from './index.js'

export async function typeEmit(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires -p or --pkg parameter, optional value: utils')
    return
  }
  const spinner = createSpinner('type emitting...', { color: 'green' }).start()
  try {
    const start = Date.now()
    switch (pkg) {
      case 'utils': {
        await $({ stdio: 'inherit' })`pnpm tsc --project tsconfig.${pkg}.json`
        break
      }
      default: {
        throw new Error('Uknown parameter')
      }
    }
    const end = Date.now()
    spinner.success({ text: `type emit done in ${(end - start) / 1000}s` })
    return true
  } catch (error) {
    spinner.error({ text: 'type emit failed' })
    consola.error(error)
  }
}
