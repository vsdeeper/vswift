import consola from 'consola'

export function changeConfig(key: string, val: string, configStr: string) {
  const keyLen = (key + '=').length
  const index = configStr.indexOf(key + '=')
  const endIndex = getEndIndex(configStr, index)
  if (index > -1 && endIndex > -1) {
    const oldVal = configStr.substring(index + keyLen, endIndex)
    return configStr.replace(`${key}=${oldVal}`, `${key}=${val}`)
  } else {
    // 新增
    return configStr + `${key}=${val}\n`
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