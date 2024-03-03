import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: "src/components/index.ts",
      name: "VswiftComponents",
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
