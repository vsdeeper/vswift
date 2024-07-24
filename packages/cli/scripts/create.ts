import consola from 'consola'
import { copy, pathExists } from 'fs-extra/esm'
import inquirer from 'inquirer'
import { createSpinner, type Spinner } from 'nanospinner'
import path from 'path'
import { dirname } from '../utils/index.js'

let spinner: Spinner | undefined

export async function create() {
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
        spinner = createSpinner('downloading...', { color: 'green' }).start()
        await copy(source, dest, {
          filter: (source) => !(source.endsWith('dist') || source.endsWith('node_modules'))
        })
        spinner.success({ text: `Your project template has been created, see: ${dest}` })
      }
    })
    .catch((error) => {
      spinner?.error({ text: 'create failed' })
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
