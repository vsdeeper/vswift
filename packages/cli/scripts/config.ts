import consola from 'consola'
import { readFileSync, writeFileSync } from 'fs'
import { getConfigPath } from '../utils/index.js'

export async function config(key: string, val?: string) {
  const configPath = getConfigPath()
  const configStr = readFileSync(configPath).toString('utf-8')
  switch (key) {
    case 'get': {
      console.log(getConfig(val!, configStr))
      break
    }
    case 'clear': {
      writeFileSync(configPath, '')
      break
    }
    case 'delete': {
      const newConfigStr = deleteConfig(val!, configStr)
      writeFileSync(configPath, newConfigStr ?? '')
      break
    }
    case 'downloadDir': {
      const newConfigStr = changeConfig(key, val!, configStr)
      if (newConfigStr !== configStr) {
        writeFileSync(configPath, newConfigStr)
      }
      break
    }
    case 'configFileName': {
      const newConfigStr = changeConfig(key, val!, configStr)
      if (newConfigStr !== configStr) {
        writeFileSync(configPath, newConfigStr)
      }
      break
    }
  }
}

function changeConfig(key: string, val: string, configStr: string) {
  const keyLen = (key + '=').length
  const indexOfDownloadDir = configStr.indexOf(key + '=')
  const endOfDownloadDir = configStr.indexOf('\n', indexOfDownloadDir)
  if (indexOfDownloadDir > -1 && endOfDownloadDir > -1) {
    const oldVal = configStr.substring(indexOfDownloadDir + keyLen, endOfDownloadDir)
    return configStr.replace(`${key}=${oldVal}`, `${key}=${val}`)
  } else {
    // 新增
    return configStr + `${key}=${val}\n`
  }
}

function getConfig(name: string, configStr: string) {
  const keyLen = (name + '=').length
  const indexOfDownloadDir = configStr.indexOf(name + '=')
  const endOfDownloadDir = configStr.indexOf('\n', indexOfDownloadDir)
  if (indexOfDownloadDir > -1 && endOfDownloadDir > -1) {
    return configStr.substring(indexOfDownloadDir + keyLen, endOfDownloadDir)
  }
}

function deleteConfig(name: string, configStr: string) {
  const keyLen = (name + '=').length
  const indexOfDownloadDir = configStr.indexOf(name + '=')
  const endOfDownloadDir = configStr.indexOf('\n', indexOfDownloadDir)
  if (indexOfDownloadDir > -1 && endOfDownloadDir > -1) {
    const oldVal = configStr.substring(indexOfDownloadDir + keyLen, endOfDownloadDir)
    return configStr.replace(`${name}=${oldVal}\n`, '')
  } else {
    consola.fail(`${name} configuration does not exist`)
  }
}
