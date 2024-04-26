import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
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
      external: ['vue', '@element-plus/icons-vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }
})
