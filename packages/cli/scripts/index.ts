export * from './build.js'
export * from './type-check.js'
export * from './release.js'
export * from './create.js'
export * from './dev.js'
export * from './search.js'

export type PkgName = 'cli' | 'utils'
export type TplName = 'vue-admin'
export interface CommandOptions {
  pkg?: PkgName
  tpl?: TplName
}
