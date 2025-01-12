import consola from 'consola'
import { dirname } from './utils.js'
import path from 'node:path'
import { pathExists } from 'fs-extra/esm'
import { readFile } from 'node:fs/promises'

export async function getConfigPath(importMetaUrl: string, basePath = '..') {
  let config = path.resolve(dirname(importMetaUrl), basePath, '.config')
  if (!(await pathExists(config))) {
    config = path.resolve(dirname(importMetaUrl), basePath, '../.config')
  }
  return config
}

export async function parseConfig() {
  const configStr = await readFile(await getConfigPath(import.meta.url), { encoding: 'utf-8' })
  const configArr = configStr.split('\n').filter(e => !!e)
  return configArr.reduce<Record<string, any>>((pre, cur) => {
    return {
      ...pre,
      [cur.split('=')[0]]: cur.split('=')[1],
    }
  }, {})
}

export function changeConfig(key: string, val: string, config: string) {
  const keyLen = (key + '=').length
  const index = config.indexOf(key + '=')
  const endIndex = getEndIndex(config, index)
  if (index > -1 && endIndex > -1) {
    // 修改
    const oldVal = config.substring(index + keyLen, endIndex)
    return config.replace(`${key}=${oldVal}`, `${key}=${val}`)
  } else {
    // 新增
    return config + `${key}=${val}\n`
  }
}

export function getConfig(name: string, configStr: string) {
  const keyLen = (name + '=').length
  const index = configStr.indexOf(name + '=')
  const endIndex = getEndIndex(configStr, index)
  if (index > -1 && endIndex > -1) {
    return configStr.substring(index + keyLen, endIndex)
  }
}

export function deleteConfig(name: string, configStr: string) {
  const keyLen = (name + '=').length
  const index = configStr.indexOf(name + '=')
  const endIndex = getEndIndex(configStr, index)
  if (index > -1 && endIndex > -1) {
    const oldVal = configStr.substring(index + keyLen, endIndex)
    return configStr.replace(`${name}=${oldVal}\n`, '')
  } else {
    consola.fail(`${name} configuration does not exist`)
  }
}

function getEndIndex(str: string, position: number) {
  const endIndex = str.indexOf('\n', position)
  return endIndex > -1 ? endIndex : str.length
}
