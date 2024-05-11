import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import Inspect from 'vite-plugin-inspect'
import { globSync } from 'glob'

const genEntry = () => {
  try {
    const matchFiles = globSync('src/components/my-*/*.ts')
    const entryArr = matchFiles.map((filePath) => ({
      [filePath.split('/index.ts')[0].split('src/components/')[1]]: filePath
    }))
    return Object.assign({ index: 'src/components/index.ts' }, ...entryArr)
  } catch (error) {
    console.error(error)
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    AutoImport({
      imports: ['vue'],
      dts: './auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    }),
    Components({
      dts: './components.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    }),
    ElementPlus({
      ignoreComponents: ['AutoResizer'] // 解决 Table-v2 AutoResizer with manual import: failed to resolve css file
    }),
    Inspect()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      entry: genEntry(),
      fileName: '[name]'
    },
    rollupOptions: {
      external: ['vue', '@element-plus/icons-vue', 'element-plus', 'radash', 'nanoid']
    }
  }
})
