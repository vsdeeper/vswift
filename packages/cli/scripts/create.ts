import consola from 'consola'
import { copy, pathExists } from 'fs-extra/esm'
import inquirer from 'inquirer'
import path from 'path'
import { dirname } from '../utils/index.js'
import ora from 'ora'
import chalk from 'chalk'

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
        const source = path.resolve(dirname(), `../templates/${templateName}/`)
        if (!(await pathExists(source)) /** source不存在 */) {
          consola.error('Project template not found')
          return
        }
        spinner.start('downloading...')
        await copy(source, dest, {
          filter: (source) => !(source.endsWith('dist') || source.endsWith('node_modules'))
        })
        spinner.succeed(`Your project template has been created, see:  ${chalk.green(dest)}`)
      }
    })
    .catch((error) => {
      consola.error(error)
    })
}
