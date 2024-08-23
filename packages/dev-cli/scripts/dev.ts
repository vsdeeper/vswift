import { $ } from 'execa'
import { consola } from 'consola'
import type { CommandOptions } from './index.js'

export async function dev(options: CommandOptions) {
  const { pkg, tpl } = options
  if (!pkg && !tpl) {
    consola.error('Requires -p or --pkg or -t or --tpl parameter, optional value: cli | vue-admin')
    return
  }
  if (pkg /** package包 */) {
    switch (pkg) {
      case 'cli': {
        await $({
          stdio: 'inherit'
        })`pnpm tsc --watch --project tsconfig.cli.json`
        break
      }
      default: {
        consola.error(`Invalid parameter: ${pkg}`)
        break
      }
    }
  } else if (tpl /** template模板 */) {
    switch (tpl) {
      case 'vue-admin': {
        await $({ stdio: 'inherit' })`pnpm --dir templates/${tpl} dev`
        break
      }
      default: {
        consola.error(`Invalid parameter: ${pkg}`)
        break
      }
    }
  }
}
