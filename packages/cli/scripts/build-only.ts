import { consola } from 'consola'
import path from 'path'
import { build } from 'vite'

export async function buildOnly(options) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: utils')
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
              external: ['radash'],
              output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                  radash: 'Radash'
                }
              }
            }
          }
        })
        break
      }
    }
    return true
  } catch (error) {
    consola.error(error)
  }
}
