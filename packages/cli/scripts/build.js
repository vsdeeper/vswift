import { consola } from 'consola'
import { remove } from 'fs-extra'
import path from 'path'

export async function buildTask(options) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: components | utils | visual-development')
    return
  }
  try {
    const cwd = process.cwd()
    await remove(path.resolve(cwd, `packages/${pkg}/dist`))
    const { typeEmit } = await import('./type-emit.js')
    if (!(await typeEmit(options))) return
    const { buildOnly } = await import('./build-only.js')
    await buildOnly(options)
    return true
  } catch (error) {
    consola.error(error)
  }
}
