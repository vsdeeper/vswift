import { consola } from 'consola'
import path from 'path'
import { build } from 'vite'
import { type CommandOptions } from './index.js'

export async function buildOnly(options: CommandOptions) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: cli | components | utils')
    return
  }
  try {
    switch (pkg) {
      case 'utils': {
        await build({
          root: path.resolve(process.cwd(), `./packages/${pkg}`),
          build: {
            emptyOutDir: false,
            lib: {
              entry: `core/index.ts`,
              name: `vswift-${pkg}`,
              fileName: 'index'
            },
            rollupOptions: {
              // 确保外部化处理那些你不想打包进库的依赖
              external: ['xlsx-js-style'],
              output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                  'xlsx-js-style': 'XlsxJsStyle'
                }
              }
            }
          }
        })
        break
      }
      default: {
        throw new Error('Uknown pkg parameter')
      }
    }
    return true
  } catch (error) {
    consola.error(error)
  }
}
