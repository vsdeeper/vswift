import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true,
      eslintrc: {
        enabled: true,
      },
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: [
      {
        find: '@/',
        // replacement: path.resolve(__dirname, 'src')
        replacement: '/src/'
      }
    ],
  },
  build: {
    lib: {
      entry: "src/components/index.ts",
      name: "VswiftDesigner",
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue", "element-plus", "@element-plus/icons-vue", "lodash-es", "nanoid", "pinia", "vuedraggable", "@vswift/common"],
      output: {
        globals: {
          "vue": "Vue",
          "element-plus": "ElementPlus",
          "@element-plus/icons-vue": "ElementPlusIconsVue",
          "lodash-es": "LodashEs",
          "nanoid": "Nanoid",
          "pinia": "Pinia",
          "vuedraggable": "Vuedraggable",
          "@vswift/common": "VswiftCommon",
        },
      },
    },
  },
});
