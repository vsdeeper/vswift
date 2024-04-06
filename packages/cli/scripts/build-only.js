import { consola } from 'consola'
import path from 'path'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export async function buildOnly(options) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: components | utils | visual-development')
    return
  }
  try {
    switch (pkg) {
      case 'components':
      case 'visual-development': {
        await build({
          root: path.resolve(process.cwd(), `./packages/${pkg}`),
          plugins: [
            vue(),
            cssInjectedByJsPlugin(),
            AutoImport({
              imports: ['vue'],
              dts: false,
              resolvers: [ElementPlusResolver()],
            }),
            Components({
              dts: false,
              resolvers: [ElementPlusResolver()],
            }),
          ],
          build: {
            emptyOutDir: false,
            lib: {
              entry: `src/index.ts`,
              name: `vswift-${pkg}`,
              fileName: 'index',
            },
            rollupOptions: {
              // 确保外部化处理那些你不想打包进库的依赖
              external: ['vue', 'element-plus'],
              output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                  vue: 'Vue',
                  'element-plus': 'ElementPlus',
                },
              },
            },
          },
        })
        break
      }
      case 'utils': {
        await build({
          root: path.resolve(process.cwd(), `./packages/${pkg}`),
          build: {
            emptyOutDir: false,
            lib: {
              entry: `core/index.ts`,
              name: `vswift-${pkg}`,
              fileName: 'index',
            },
            rollupOptions: {
              // 确保外部化处理那些你不想打包进库的依赖
              external: ['radash'],
              output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                  radash: 'Radash',
                },
              },
            },
          },
        })
        break
      }
    }
    return true
  } catch (error) {
    consola.error(error)
  }
}
