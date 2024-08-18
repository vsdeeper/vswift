import { readFileSync } from 'fs'
import { pathExistsSync } from 'fs-extra/esm'
import path from 'path'
import { dirname } from './index.js'

export function parseConfig() {
  const configStr = readFileSync(getConfigPath()).toString('utf-8')
  const configArr = configStr.split('\n').filter((e) => !!e)
  return configArr.reduce<Record<string, any>>((pre, cur) => {
    return {
      ...pre,
      [cur.split('=')[0]]: cur.split('=')[1]
    }
  }, {})
}

export function getConfigPath(basePath?: string) {
  let config = path.resolve(dirname(), basePath ?? '..', '.config')
  if (!pathExistsSync(config)) {
    config = path.resolve(dirname(), basePath ?? '..', '../.config')
  }
  return config
}
