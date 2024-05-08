import { $ } from 'execa'
import { consola } from 'consola'
import { remove } from 'fs-extra/esm'
import path from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { buildOnly, typeEmit, typeCheck } from './index.js'
import type { CommandOptions } from './index.js'
import { createSpinner, type Spinner } from 'nanospinner'
import prettier from 'prettier'
import { globSync } from 'glob'

export async function buildTask(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: cli | components | utils')
    return
  }
  let spinner: Spinner | undefined
  try {
    switch (pkg) {
      case 'cli': {
        spinner = createSpinner('building...', { color: 'green' }).start()
        if (!(await typeCheck(options))) return
        await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`))
        const start = Date.now()
        await $({
          stdio: 'inherit'
        })`pnpm tsc --project tsconfig.cli.json`
        // 格式化编译后的文件
        const jsfiles = globSync(path.resolve(process.cwd(), `packages/${pkg}/dist/**/*.js`))
        const formattedFilePath = path.resolve(process.cwd(), `packages/${pkg}/index.ts`)
        const formatOptions = await prettier.resolveConfig(formattedFilePath)
        for (const filePath of jsfiles) {
          const text = readFileSync(filePath, 'utf-8')
          const formatted = await prettier.format(text, formatOptions!)
          writeFileSync(filePath, formatted)
        }
        // 打包结束
        const end = Date.now()
        spinner.success({ text: `build done in ${(end - start) / 1000}s` })
        break
      }
      case 'components': {
        await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`))
        await $({
          stdio: 'inherit'
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
        throw new Error('Unknown pkg parameter')
      }
    }
  } catch (error) {
    spinner?.error({ text: 'build failed' })
    consola.error(error)
  }
}
