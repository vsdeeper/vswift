import { consola } from 'consola'
import path from 'path'
import { build } from 'vite'
import { globSync } from 'glob'
import { type CommandOptions } from './index.js'

export async function buildOnly(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires -p or --pkg parameter, optional value: utils')
    return
  }
  try {
    switch (pkg) {
      case 'utils': {
        const matchFiles = globSync(path.resolve(process.cwd(), 'packages/utils/core/*.ts'))
        await build({
          root: path.resolve(process.cwd(), `packages/${pkg}`),
          build: {
            emptyOutDir: false,
            lib: {
              entry: matchFiles.map((filePath) => filePath.split(`/packages/${pkg}/`)[1]),
              fileName: '[name]'
            },
            rollupOptions: {
              // 确保外部化处理那些你不想打包进库的依赖
              external: ['xlsx-js-style'],
              output: {
                // 手动处理
                // manualChunks: {
                //   'xlsx-js-style': ['xlsx-js-style']
                // }
              }
            }
          }
        })
        break
      }
      default: {
        throw new Error('Uknown parameter')
      }
    }
    return true
  } catch (error) {
    consola.error(error)
  }
}
