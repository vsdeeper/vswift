export * from './build.js'
export * from './release.js'
export * from './dev.js'

export type PkgName = 'cli' | 'utils'
export type TplName = 'vue-admin'
export interface CommandOptions {
  pkg?: PkgName
  tpl?: TplName
}
