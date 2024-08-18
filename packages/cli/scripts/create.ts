import consola from 'consola'
import { copy, pathExists, pathExistsSync } from 'fs-extra/esm'
import inquirer from 'inquirer'
import path from 'path'
import { dirname, transformVueAdmin, parseConfig } from '../utils/index.js'
import ora from 'ora'
import chalk from 'chalk'
import os from 'os'
import { readFileSync } from 'fs'

export async function create() {
  const spinner = ora({ spinner: 'line' })
  const config = parseConfig()
  let answer: Record<string, any> | undefined
  let configFilePath: string | undefined
  let configData: Record<string, any> | undefined
  if (config.downloadDir) {
    configFilePath = `${config.downloadDir}/${config.fileName ? config.fileName + '.json' : 'vswift-project.config.json'}`
    if (pathExistsSync(configFilePath)) {
      configData = JSON.parse(readFileSync(configFilePath).toString('utf-8'))
      // 询问是否根据配置文件转换生成
      answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'isConfigFile',
          message: `Whether to create project based on the configuration file: ${configFilePath}`
        }
      ])
    }
  }

  if (answer?.isConfigFile /** 根据配置文件转换生成 */) {
    spinner.start('Downloading...' + os.EOL)
    const source = await getSource('vue-admin' /**暂时只支持vue-admin */)
    const dest = path.resolve(process.cwd(), `${configData!.options.name || 'vswift-project'}`)
    await copy(source, dest, {
      filter: (src) => !(src.endsWith('dist') || src.endsWith('node_modules'))
    })
    spinner.succeed('Download done')

    spinner.start('Transforming...' + os.EOL)
    await transformVueAdmin(dest, configFilePath!)
    spinner.succeed(
      `Transform done, your project template has been created, see:  ${chalk.green(dest)}`
    )
  } else {
    const { projectName, templateName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Input your project name',
        default: 'vswift-project'
      },
      {
        type: 'list',
        name: 'templateName',
        message: 'Choose a template',
        choices: ['vue-admin', 'vue-uniapp']
      }
    ])

    if (templateName === 'vue-admin') {
      spinner.start('Downloading...' + os.EOL)
      const source = await getSource(templateName)
      const dest = path.resolve(process.cwd(), `${projectName}`)
      await copy(source, dest, {
        filter: (src) => !(src.endsWith('dist') || src.endsWith('node_modules'))
      })
      spinner.succeed(`Your project template has been created, see:  ${chalk.green(dest)}`)
    }

    if (templateName === 'vue-uniapp') {
      consola.info('vue-uniapp is coming soon...')
      return
    }
  }
}

async function getSource(templateName: string) {
  // 从dist目录中查找
  const source = path.resolve(dirname(), `../templates/${templateName}/`)
  if (await pathExists(source) /** source存在 */) return source
  else {
    // dist目录中不存在source，说明是开发环境
    return path.resolve(dirname(), `../../../../templates/${templateName}/`)
  }
}
