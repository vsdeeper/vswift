import { $ } from 'execa'
import { consola } from 'consola'
import { remove } from 'fs-extra'
import path from 'path'
import { buildOnly } from './build-only.js'
import { typeEmit } from './type-emit.js'

export async function buildTask(options) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: utils | components')
    return
  }
  try {
    switch (pkg) {
      case 'components': {
        await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`))
        await $({
          stdio: 'inherit',
        })`pnpm --dir ${path.resolve(process.cwd(), `./packages/${pkg}`)} build`
        break
      }
      case 'utils': {
        await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`))
        if (!(await typeEmit(options))) return
        await buildOnly(options)
        break
      }
      default: {
        throw new Error('Optional value: utils | components for pkg parameter')
      }
    }
  } catch (error) {
    consola.error(error)
  }
}
