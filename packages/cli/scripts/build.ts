import { $ } from 'execa'
import { consola } from 'consola'
import { copy, remove } from 'fs-extra/esm'
import path from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { typeCheck } from './index.js'
import type { CommandOptions } from './index.js'
import prettier from 'prettier'
import { globSync } from 'glob'
import ora from 'ora'
import { dirname } from '../utils/index.js'
import { build } from 'vite'
import os from 'os'

export async function buildTask(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires -p or --pkg parameter, optional value: cli | utils')
    return
  }
  const spinner = ora({ spinner: 'line' })
  switch (pkg) {
    case 'cli': {
      spinner.start('Type checking...')
      await typeCheck(options)
      spinner.succeed('Type check done')

      spinner.start('Clear old compilation directory...')
      await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`))
      spinner.succeed('Clear old compilation directory done')

      spinner.start('Start Compiling...')
      await $({
        stdio: 'inherit'
      })`pnpm tsc --project tsconfig.cli.json`
      spinner.succeed('Compilation done')

      spinner.start('Formatting compiled files...')
      const jsfiles = globSync(path.resolve(process.cwd(), `packages/${pkg}/dist/**/*.js`))
      const formattedFilePath = path.resolve(process.cwd(), `packages/${pkg}/index.ts`)
      const formatOptions = await prettier.resolveConfig(formattedFilePath)
      for (const filePath of jsfiles) {
        const text = readFileSync(filePath, 'utf-8')
        const formatted = await prettier.format(text, formatOptions!)
        writeFileSync(filePath, formatted)
      }
      spinner.succeed('Compiled files format done')

      spinner.start('Copy templates to build directory...')
      const dest = path.resolve(process.cwd(), 'packages/cli/dist/templates')
      const source = path.resolve(dirname(), `../../../../templates`)
      await copy(source, dest, {
        filter: (source) => !(source.endsWith('dist') || source.endsWith('node_modules'))
      })
      spinner.succeed('Copy templates to build directory done')
      spinner.succeed('Build success!!!')
      break
    }
    case 'utils': {
      spinner.start('Clear old compilation directory...' + os.EOL /**换行符 */)
      await remove(path.resolve(process.cwd(), `packages/${pkg}/dist`))
      spinner.succeed('Copy templates to build directory done')

      spinner.start('Type Outputting...' + os.EOL)
      await $({
        stdin: 'inherit'
      })`pnpm tsc --project packages/${pkg}/tsconfig.build.json`
      spinner.succeed('Type Output done')

      await build({
        root: path.resolve(process.cwd(), `packages/${pkg}`),
        build: {
          emptyOutDir: false,
          sourcemap: true,
          lib: {
            entry: 'index.ts',
            fileName: (format) => {
              return `index.${format === 'es' ? 'js' : 'cjs'}`
            },
            formats: ['es', 'cjs']
          },

          rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['xlsx-js-style']
          }
        }
      })
      break
    }
    default: {
      spinner.fail(`Invalid parameter: ${pkg}`)
      break
    }
  }
}
