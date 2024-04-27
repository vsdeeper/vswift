import { $ } from 'execa'
import { consola } from 'consola'
import { remove } from 'fs-extra'
import path from 'path'
import { buildOnly, typeEmit, typeCheck } from './index.js'
import type { CommandOptions } from './index.js'
import { createSpinner } from 'nanospinner'

export async function buildTask(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: cli | components | utils')
    return
  }
  try {
    switch (pkg) {
      case 'cli': {
        if (!(await typeCheck(options))) return
        await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`))
        const spinner = createSpinner('building...', { color: 'green' }).start()
        const start = Date.now()
        await $({
          stdio: 'inherit',
        })`pnpm tsc --project tsconfig.cli.json`
        const end = Date.now()
        spinner.success({ text: `build done in ${(end - start) / 1000}s` })
        break
      }
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
        throw new Error('Uknown pkg parameter')
      }
    }
  } catch (error) {
    consola.error(error)
  }
}
