import { readFileSync } from 'fs'
import { pathExistsSync } from 'fs-extra/esm'
import path from 'path'
import { dirname } from './index.js'

export function parseConfig() {
  const configStr = readFileSync(getConfigPath(import.meta.url)).toString('utf-8')
  const configArr = configStr.split('\n').filter((e) => !!e)
  return configArr.reduce<Record<string, any>>((pre, cur) => {
    return {
      ...pre,
      [cur.split('=')[0]]: cur.split('=')[1]
    }
  }, {})
}

export function getConfigPath(importMetaUrl: string, basePath?: string) {
  let config = path.resolve(dirname(importMetaUrl), basePath ?? '..', '.config')
  if (!pathExistsSync(config)) {
    config = path.resolve(dirname(importMetaUrl), basePath ?? '..', '../.config')
  }
  return config
}
