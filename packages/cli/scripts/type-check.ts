import { $ } from 'execa'
import { consola } from 'consola'
import type { CommandOptions } from './index.js'

export async function typeCheck(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires -p or --pkg parameter, optional value: cli')
    return
  }
  switch (pkg) {
    case 'cli': {
      await $({ stdio: 'inherit' })`pnpm tsc --project tsconfig.${pkg}.json`
      break
    }
    default: {
      consola.error(`Invalid parameter: ${pkg}`)
      break
    }
  }
}
