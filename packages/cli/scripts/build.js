import { $ } from 'execa'
import { consola } from 'consola'
import { remove } from 'fs-extra'
import path from 'path'

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
          stdio: 'inherit'
        })`pnpm --dir ${path.resolve(process.cwd(), `./packages/${pkg}`)} build`
        return true
      }
      case 'utils': {
        await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`))
        const { typeEmit } = await import('./type-emit.js')
        if (!(await typeEmit(options))) return
        const { buildOnly } = await import('./build-only.js')
        await buildOnly(options)
        return true
      }
      default: {
        throw new Error('Optional value: utils | components for pkg parameter')
      }
    }
  } catch (error) {
    consola.error(error)
  }
}
