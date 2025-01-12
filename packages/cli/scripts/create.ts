import { pathExists } from 'fs-extra/esm'
import inquirer from 'inquirer'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'
import os from 'os'
import { copyTemplate, getTemplatePath } from '../utils/utils.js'
import { createGitignore, finalOutput, gitInit } from '../generator/utils.js'

export async function create() {
  const { projectName, templateName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Input your project name',
      default: 'vswift-project',
    },
    {
      type: 'list',
      name: 'templateName',
      message: 'Choose a template',
      choices: ['vue-admin', 'vue-uniapp'],
    },
  ])

  if (templateName === 'vue-uniapp') {
    throw new Error('vue-uniapp template not yet supported.')
  }

  const spinner = ora({ spinner: 'line' })
  const dest = path.resolve(process.cwd(), `${projectName}`)

  // 下载template
  spinner.start('Downloading template...' + os.EOL)
  await copyTemplate(await getTemplatePath(templateName, import.meta.url), dest)
  spinner.succeed('Download template done')

  // git init
  spinner.start('Git init...' + os.EOL)
  await gitInit(projectName)
  spinner.succeed('Git init done')

  // 添加.gitignore
  const gitignoreFilePath = path.resolve(process.cwd(), `${projectName}/.gitignore`)
  if (!(await pathExists(gitignoreFilePath))) {
    spinner.start('Creating .gitignore file...' + os.EOL)
    // 手动写入.gitignore
    await createGitignore(gitignoreFilePath)
    spinner.succeed('Create .gitignore file done')
  }

  spinner.succeed(
    `Generate successfully, your project template has been created, see:  ${chalk.green(dest)}`,
  )

  finalOutput(projectName)
}
