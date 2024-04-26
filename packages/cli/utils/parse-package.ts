import path from 'path'
import { consola } from 'consola'
import { readFileSync } from 'fs'

export type PkgName = 'cli' | 'components' | 'utils'

export function parsePackage(pkgName: PkgName) {
  try {
    const pkgPath = path.resolve(process.cwd(), `packages/${pkgName}/package.json`)
    return JSON.parse(readFileSync(pkgPath).toString())
  } catch (error) {
    consola.error(error)
  }
}
