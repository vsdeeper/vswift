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
import { map } from 'radash'

interface GenerateInfoItem {
  name?: string
  filePathsOfView?: string[]
  filePathsOfApi?: string[]
  filePathsOfStore?: string[]
}

/**
 * 生成SFC格式
 */
export async function generateView(names: string) {
  const spinner = ora({ spinner: 'line' })
  spinner.start('Generating...' + os.EOL)
  const storeGenerateInfo: GenerateInfoItem[] = []
  const nameArr = names.split(',')
  for (const name of nameArr) {
    const generateInfoObj: GenerateInfoItem = { name }
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

    const [
      viewObject /**视图view对象结构 */,
      apiObject /**视图api对象结构 */,
      storeObject /**视图store对象结构 */,
    ] = await Promise.all([
      resolveViewObject(options, components),
      resolveApiObjectOfView(options, components),
      resolveStoreObjectOfView(options, components),
    ])
    if (!viewObject) throw new Error('Resolve view object failed')
    if (!apiObject) throw new Error('Resolve api object failed')
    if (!storeObject) throw new Error('Resolve store object failed')

    // console.log('generateView ->', viewObject, apiObject, storeObject)

    const [filePathsOfView, filePathsOfApi, filePathsOfStore] = await Promise.all([
      genCodeFiles(viewObject),
      genCodeFiles(apiObject),
      genCodeFiles(storeObject),
    ])
    if (!filePathsOfView) throw new Error('Generate view code files failed')
    if (!filePathsOfApi) throw new Error('Generate api code files failed')
    if (!filePathsOfStore) throw new Error('Generate sotre code files failed')

    generateInfoObj.filePathsOfView = filePathsOfView
    generateInfoObj.filePathsOfApi = filePathsOfApi
    generateInfoObj.filePathsOfStore = filePathsOfStore
    storeGenerateInfo.push(generateInfoObj)
  }
  const displayFilePaths = (item: GenerateInfoItem) =>
    `--View name: ${item.name}\n---View files:\n${chalk.green(item.filePathsOfView?.map(e => `----${e}`).join('\n'))}\n---Api files:\n${chalk.green(item.filePathsOfApi?.map(e => `----${e}`).join('\n'))}\n---Store files:\n${chalk.green(item.filePathsOfStore?.map(e => `----${e}`).join('\n'))}`
  spinner.succeed(
    `Generate successfully, your code files has been created.\n${storeGenerateInfo.map(item => displayFilePaths(item)).join('\n\n')}`,
  )
}
