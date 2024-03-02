import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "VswiftUtils",
      fileName: "index",
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
        },
      },
    },
  },
});
