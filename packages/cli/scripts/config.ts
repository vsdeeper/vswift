import { readFile, writeFile } from 'node:fs/promises'
import { getConfig, deleteConfig, changeConfig, getConfigPath } from '../utils/config-operations.js'

export async function config(action: string, ...args: any[]) {
  const configPath = await getConfigPath(import.meta.url)
  const configStr = await readFile(configPath, { encoding: 'utf-8' })
  switch (action) {
    case 'list': {
      const configArr = configStr.split('\n').filter(e => !!e)
      console.log(configArr.join('\n'))
      break
    }
    case 'get': {
      const [name] = args
      console.log(getConfig(name, configStr))
      break
    }
    case 'set': {
      const [name, val] = args
      const newConfigStr = changeConfig(name, val, configStr)
      if (newConfigStr !== configStr) {
        await writeFile(configPath, newConfigStr)
      }
      break
    }
    case 'clear': {
      await writeFile(configPath, '')
      break
    }
    case 'delete': {
      const [name] = args
      const newConfigStr = deleteConfig(name, configStr)
      await writeFile(configPath, newConfigStr ?? '')
      break
    }
  }
}
