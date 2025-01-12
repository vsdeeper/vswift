import { pathExists } from 'fs-extra/esm'
import inquirer from 'inquirer'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'
import os from 'os'
import { copyTemplate, getTemplatePath } from '../utils/utils.js'
import { createGitignore, finalOutput, gitInit, setupGithooks } from '../generator/utils.js'

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

  const spinner = ora({ spinner: 'line' })
  spinner.start('Generating...' + os.EOL)

  const dest = path.resolve(process.cwd(), `${projectName}`)

  // 下载template
  await copyTemplate(await getTemplatePath(templateName, import.meta.url), dest)

  // git init
  await gitInit(projectName)

  // 设置git hooks
  await setupGithooks(projectName)

  // 添加.gitignore
  const gitignoreFilePath = path.resolve(process.cwd(), `${projectName}/.gitignore`)
  if (!(await pathExists(gitignoreFilePath))) {
    // 手动写入.gitignore
    await createGitignore(gitignoreFilePath)
  }

  spinner.succeed(
    `Generate successfully, your project template has been created, see:  ${chalk.green(dest)}`,
  )

  finalOutput(projectName)
}
