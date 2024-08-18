import consola from 'consola'
import { copy, pathExists, pathExistsSync } from 'fs-extra/esm'
import inquirer from 'inquirer'
import path from 'path'
import { dirname, parseConfig } from '../utils/index.js'
import ora from 'ora'
import chalk from 'chalk'
import os from 'os'

export async function create() {
  const spinner = ora({ spinner: 'line' })
  inquirer
    .prompt([
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
    .then(async ({ projectName, templateName }) => {
      if (templateName === 'vue-uniapp') {
        consola.info('vue-uniapp is coming soon...')
        return
      }
      const dest = path.resolve(process.cwd(), `${projectName}`)
      if (templateName === 'vue-admin') {
        const source = await getSource(templateName)
        if (!(await pathExists(source)) /** source不存在 */) {
          consola.error('Project template not found')
          return
        }
        const config = parseConfig()
        let answerOfConfigFile: boolean | undefined
        if (config.downloadDir) {
          const configFilePath = `${config.downloadDir}/${config.configFileName ?? 'vswift-project.config.json'}`
          if (pathExistsSync(configFilePath)) {
            answerOfConfigFile = await inquirer.prompt([
              {
                type: 'confirm',
                name: 'configFile',
                message: `Whether to create a project based on the configuration file: ${config.downloadDir}/${config.configFileName ?? 'vswift-project.config.json'}`
              }
            ])
          }
        }
        spinner.start('downloading...' + os.EOL)
        await copy(source, dest, {
          filter: (source) => {
            if (source.endsWith('dist') || source.endsWith('node_modules')) {
              return false
            } else {
              if (answerOfConfigFile /** 根据配置文件创建项目 */) {
                // 根据配置修改原始项目...
                return true
              } else {
                return true
              }
            }
          }
        })
        spinner.succeed(`Your project template has been created, see:  ${chalk.green(dest)}`)
      }
    })
    .catch((error) => {
      consola.error(error)
    })
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
