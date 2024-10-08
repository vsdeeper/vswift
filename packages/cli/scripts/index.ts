export * from './create.js'
export * from './config.js'
export * from './search.js'

export type PkgName = 'cli' | 'utils'
export type TplName = 'vue-admin'
export interface CommandOptions {
  pkg?: PkgName
  tpl?: TplName
}
