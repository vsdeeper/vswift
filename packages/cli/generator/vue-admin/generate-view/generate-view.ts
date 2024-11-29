import { readFileSync } from 'fs'
import { pathExistsSync } from 'fs-extra/esm'
import { parseConfig } from '../../../utils/index.js'
import consola from 'consola'
import chalk from 'chalk'
import { resolveApiObjectOfView, resolveStoreObjectOfView, resolveViewObject } from './util.js'

/**
 * 生成SFC格式
 */
export async function generateView(name: string) {
  // 解析配置数据
  const config = parseConfig()
  const configFilePath = `${config.downloadDir}/${name + '.json'}`
  if (!pathExistsSync(configFilePath)) {
    consola.error(`Configuration file ${chalk.green(configFilePath)} not found`)
    return
  }
  const configData = JSON.parse(readFileSync(configFilePath).toString('utf-8'))
  const { options, components } = configData

  // 解析视图view对象结构
  const viewObject = resolveViewObject(options, components)

  // 解析视图api对象结构
  const apiObject = resolveApiObjectOfView(options, components)

  // 解析视图store对象结构
  const storeObject = resolveStoreObjectOfView(options, components)

  console.log('generateView ->', viewObject, apiObject, storeObject)
}
