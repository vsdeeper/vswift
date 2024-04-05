import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: './examples',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: '../auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: '../components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./examples/src', import.meta.url)),
    },
  },
})
