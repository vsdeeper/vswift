import path from 'path'
import { readFileSync } from 'fs'
import { dirname } from './index.js'
import consola from 'consola'
import { pathExistsSync } from 'fs-extra/esm'

export type PkgName = 'cli' | 'utils'

export function parsePackageJson() {
  try {
    const pkgPath = path.resolve(dirname(import.meta.url), `../package.json`)
    if (pathExistsSync(pkgPath)) {
      return JSON.parse(readFileSync(pkgPath).toString()) as Record<string, any>
    } else {
      const pkgPath = path.resolve(dirname(import.meta.url), `../../package.json`)
      return JSON.parse(readFileSync(pkgPath).toString()) as Record<string, any>
    }
  } catch (error) {
    consola.error('parsePackageJson ->', error)
  }
}
