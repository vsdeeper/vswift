import { readFileSync, writeFileSync } from 'fs'
import { getConfigPath, getConfig, deleteConfig, changeConfig } from '../utils/index.js'

export async function config(key: string, val?: string) {
  const configPath = getConfigPath(import.meta.url)
  const configStr = readFileSync(configPath).toString('utf-8')
  switch (key) {
    case 'list': {
      const configArr = configStr.split('\n').filter(e => !!e)
      console.log(configArr.join('\n'))
      break
    }
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
  }
}
