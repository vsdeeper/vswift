import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

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
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/components/index.ts',
      name: 'vswift-components',
      fileName: 'index'
    },

    rollupOptions: {
      external: ['vue', '@element-plus/icons-vue', 'element-plus', 'radash'],
      output: {
        globals: {
          vue: 'Vue',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          'element-plus': 'ElementPlus',
          radash: 'Radash'
        }
      }
    }
  }
})
