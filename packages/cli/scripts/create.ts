import consola from 'consola'
import { $ } from 'execa'
import { copy, pathExists, pathExistsSync } from 'fs-extra/esm'
import inquirer from 'inquirer'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'fs'
import os from 'os'
import { parseConfig, getTemplatePath } from '../utils/index.js'
import { generateProject } from '../generator/vue-admin/index.js'

export async function create() {
  if (!(await checkHusky())) {
    return
  }
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
    const projectName = configData!.options.name || 'vswift-project'
    const dest = path.resolve(process.cwd(), `${projectName}`)
    await generateProject(dest, configData!)
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

    const spinner = ora({ spinner: 'line' })
    spinner.start('Generating...' + os.EOL)

    const dest = path.resolve(process.cwd(), `${projectName}`)

    // 下载template
    await copyTemplate(getTemplatePath(templateName, import.meta.url), dest)

    // git init
    await gitInit(projectName)

    // 设置git hooks
    await setupGithooks(projectName)

    // 添加.gitignore
    const gitignoreFilePath = path.resolve(process.cwd(), `${projectName}/.gitignore`)
    if (!(await pathExists(gitignoreFilePath))) {
      // 手动写入.gitignore
      createGitignore(gitignoreFilePath)
    }

    spinner.succeed(
      `Generate success, your project template has been created, see:  ${chalk.green(dest)}`
    )

    finalOutput(projectName)
  }
}

async function checkHusky() {
  try {
    const { stdout } = await $({ shell: true })`npm list -g husky`
    const huskyVersion = getPackageVersion('husky', stdout)
    consola.log(`Detected that your global husky version is ${chalk.cyan(huskyVersion)}`)
    return true
  } catch (error: any) {
    if (error.stdout?.includes('empty')) {
      consola.error(
        `It is detected that husky is not installed yet. Please run ${chalk.green('npm install -g --verbose husky')} to install the latest version`
      )
    }
    return false
  }
}

async function copyTemplate(source: string, dest: string) {
  await copy(source, dest, {
    filter: (src) => !(src.endsWith('dist') || src.endsWith('node_modules'))
  })
}

async function gitInit(projectName: string) {
  await $({ shell: true })`cd ${projectName} && git init`
}

async function setupGithooks(projectName: string) {
  await $({
    shell: true
  })`cd ${projectName} && pnpm exec husky init`
  await $({
    shell: true
  })`cd ${projectName} && echo "pnpm lint-staged" > .husky/pre-commit && echo "pnpm --no-install commitlint --edit" > .husky/commit-msg`
}

function createGitignore(path: string) {
  const rules = [
    '# Logs',
    'logs',
    '*.log',
    'pnpm-debug.log*',
    '',
    'node_modules',
    '.DS_Store',
    'dist',
    'coverage',
    '*.local',
    '',
    '/cypress/videos/',
    '/cypress/screenshots/',
    '# Editor directories and files',
    '.vscode/*',
    '!.vscode/extensions.json',
    '',
    '*.tsbuildinfo'
  ]
  writeFileSync(path, rules.join('\n'))
}

function getPackageVersion(pkg: string, source: string) {
  return source.substring(
    source.indexOf(`${pkg}@`) + `${pkg}@`.length,
    source.indexOf('\n', source.indexOf(`${pkg}@`))
  )
}

function finalOutput(projectName: string) {
  console.log(
    `\n  Next, you can start the project like this: \n\n` +
      chalk.gray(`  ${`$ cd ${projectName}`}\n` + `  ${'$ pnpm install'}\n` + `  ${'$ pnpm dev'}\n`)
  )
}
