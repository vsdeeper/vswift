/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_MODE: 'dev' | 'test' | 'prod'
}
interface ImportMeta {
  /**
   * @property VITE_MODE 自定义mode
   */
  readonly env: ImportMetaEnv
}
