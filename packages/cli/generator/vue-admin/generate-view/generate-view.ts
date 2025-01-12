import consola from 'consola'
import chalk from 'chalk'
import ora from 'ora'
import os from 'os'
import type { ViewDesignData } from 'visual-development'
import { pathExists } from 'fs-extra/esm'
import { readFile } from 'node:fs/promises'
import { parseConfig } from '../../../utils/config-operations.js'
import { genCodeFiles } from '../../utils.js'
import { resolveApiObjectOfView, resolveStoreObjectOfView, resolveViewObject } from './utils.js'

/**
 * 生成SFC格式
 */
export async function generateView(name: string) {
  const config = await parseConfig()
  const configFilePath = `${config.configFileDir}/${name + '.json'}`
  if (!(await pathExists(configFilePath))) {
    consola.error(`Configuration file ${chalk.green(configFilePath)} not found`)
    return
  }
  const configData: ViewDesignData = JSON.parse(
    await readFile(configFilePath, { encoding: 'utf-8' }),
  )
  const { options, components = [] } = configData

  const spinner = ora({ spinner: 'line' })
  spinner.start('Generating...' + os.EOL)
  const [
    viewObject /**视图view对象结构 */,
    apiObject /**视图api对象结构 */,
    storeObject /**视图store对象结构 */,
  ] = await Promise.all([
    resolveViewObject(options, components),
    resolveApiObjectOfView(options, components),
    resolveStoreObjectOfView(options, components),
  ])
  if (!viewObject) throw new Error('Can not resolve view object')
  if (!apiObject) throw new Error('Can not resolve api object')
  if (!storeObject) throw new Error('Can not resolve store object')

  // console.log('generateView ->', viewObject, apiObject, storeObject)

  const [filePathsOfView, filePathsOfApi, filePathsOfStore] = await Promise.all([
    genCodeFiles(viewObject),
    genCodeFiles(apiObject),
    genCodeFiles(storeObject),
  ])
  if (!filePathsOfView) throw new Error('Can not generate view code files')
  if (!filePathsOfApi) throw new Error('Can not generate api code files')
  if (!filePathsOfStore) throw new Error('Can not generate sotre code files')
  spinner.succeed(
    `Generate successfully, your code files has been created.\nView files:\n${chalk.green(filePathsOfView?.join('\n'))}\nApi files:\n${chalk.green(filePathsOfApi?.join('\n'))}\nStore files:\n${chalk.green(filePathsOfStore?.join('\n'))}`,
  )
}
