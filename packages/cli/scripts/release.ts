import { $ } from 'execa'
import { consola } from 'consola'
import path from 'path'
import type { CommandOptions } from './index.js'

export async function release(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires -p or --pkg parameter, optional value: cli | utils')
    return
  }
  const cwd = process.cwd()
  const dir = path.resolve(cwd, `packages/${pkg}`)
  await $({ stdio: 'inherit' })`pnpm --dir ${dir} release`
}
