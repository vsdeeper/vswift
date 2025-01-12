import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { globSync } from 'glob'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // 启动优化，element-plus预加载
  const matchElementPlusPath = globSync('node_modules/element-plus/es/components/*/style')
  const optimizeDepsElementPlusIncludes = [
    ...matchElementPlusPath.map(path => `${path.replace('node_modules/', '')}/index`),
    ...matchElementPlusPath.map(path => `${path.replace('node_modules/', '')}/css`),
  ]
  return {
    // base 的设置映射 import.meta.env.BASE_URL 的值
    base: '/',
    plugins: [
      vue(),
      vueJsx(),
      cssInjectedByJsPlugin(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: './types/auto-imports.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        dirs: ['src/components', 'src/layout'],
        dts: './types/components.d.ts',
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      ElementPlus({
        // 解决 Table-v2 AutoResizer with manual import: failed to resolve css file
        ignoreComponents: ['AutoResizer'],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          // element-plus自定义命名空间设置
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: { include: [...optimizeDepsElementPlusIncludes] },
  }
})
