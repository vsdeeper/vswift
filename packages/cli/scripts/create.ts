import consola from 'consola'
import { copy } from 'fs-extra/esm'
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'
import path from 'path'

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
        choices: ['vue-next-admin', 'vue-uniapp']
      }
    ])
    .then(async ({ projectName, templateName }) => {
      if (templateName === 'vue-uniapp') {
        consola.info('vue-uniapp is coming soon...')
        return
      }
      const dest = path.resolve(process.cwd(), `${projectName}`)
      if (templateName === 'vue-next-admin') {
        const sourcePath = path.resolve(process.cwd(), `templates/${templateName}/`)
        const spinner = createSpinner('downloading...', { color: 'green' }).start()
        await copy(sourcePath, dest, {
          filter: (source) => !(source.endsWith('dist') || source.endsWith('node_modules'))
        })
        spinner.success({ text: `Your project template has been created, see: ${dest}` })
      }
    })
    .catch((error) => {
      consola.error(error)
    })
}
