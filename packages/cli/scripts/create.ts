import consola from 'consola'
import { $ } from 'execa'
import { copy, pathExists, pathExistsSync } from 'fs-extra/esm'
import inquirer from 'inquirer'
import path from 'path'
import { transformVueAdmin, parseConfig, getTemplatePath } from '../utils/index.js'
import ora, { type Ora } from 'ora'
import chalk from 'chalk'
import os from 'os'
import { readFileSync, writeFileSync } from 'fs'

export async function create() {
  if (!(await checkHusky())) {
    return
  }
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
    const projectName = configData!.options.name || 'vswift-project'
    spinner.start('Downloading...' + os.EOL)
    const dest = path.resolve(process.cwd(), `${projectName}`)
    await copyTemplate(
      getTemplatePath('vue-admin' /**暂时只支持vue-admin */, import.meta.url),
      dest
    )
    await manuallyAddFiles(projectName)
    spinner.succeed('Download done')

    await generalSettings(projectName, spinner)

    spinner.start('Transforming...' + os.EOL)
    await transformVueAdmin(dest, configFilePath!)
    spinner.succeed(
      `Transform done, your project template has been created, see:  ${chalk.green(dest)}`
    )

    finalOutput(projectName)
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
      const dest = path.resolve(process.cwd(), `${projectName}`)
      await copyTemplate(getTemplatePath('vue-admin', import.meta.url), dest)
      await manuallyAddFiles(projectName)
      spinner.succeed('Download done')

      await generalSettings(projectName, spinner)

      spinner.succeed(`Your project template has been created, see:  ${chalk.green(dest)}`)
    }

    if (templateName === 'vue-uniapp') {
      consola.info('vue-uniapp is coming soon...')
    }

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

async function manuallyAddFiles(projectName: string) {
  const gitignoreFilePath = path.resolve(process.cwd(), `${projectName}/.gitignore`)
  if (!(await pathExists(gitignoreFilePath))) {
    // 手动写入.gitignore
    createGitignore(gitignoreFilePath)
  }
}

async function gitInit(projectName: string) {
  await $({ shell: true })`cd ${projectName} && git init`
}

async function gitAddOrigin(projectName: string, url: string) {
  await $({ shell: true })`cd ${projectName} && git remote add origin ${url}`
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

function finalOutput(projectName: string) {
  console.log(
    `\n  Next, you can start the project like this: \n\n` +
      chalk.gray(`  ${`$ cd ${projectName}`}\n` + `  ${'$ pnpm install'}\n` + `  ${'$ pnpm dev'}\n`)
  )
}

function getPackageVersion(pkg: string, source: string) {
  return source.substring(
    source.indexOf(`${pkg}@`) + `${pkg}@`.length,
    source.indexOf('\n', source.indexOf(`${pkg}@`))
  )
}

async function generalSettings(
  projectName: string,
  spinner: Ora,
  configData?: Record<string, any>
) {
  const { options } = configData ?? { options: {} }

  spinner.start('Initialize Git...' + os.EOL)
  await gitInit(projectName)
  spinner.succeed('Initializing Git done')

  if (options.gitUrl) {
    spinner.start('Git remote add origin...' + os.EOL)
    await gitAddOrigin(projectName, options.gitUrl)
    spinner.succeed('Git remote add origin done')
  }

  spinner.start('Set up Git Hooks...' + os.EOL)
  await setupGithooks(projectName)
  spinner.succeed('Set up Git Hooks done')
}
