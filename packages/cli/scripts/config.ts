import { readFileSync, writeFileSync } from 'fs'
import { getConfigPath, getConfig, deleteConfig, changeConfig } from '../utils/index.js'

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
    case 'fileName': {
      const newConfigStr = changeConfig(key, val!, configStr)
      if (newConfigStr !== configStr) {
        writeFileSync(configPath, newConfigStr)
      }
      break
    }
  }
}
