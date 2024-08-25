import consola from 'consola'
import { $ } from 'execa'
import { copy, pathExists, pathExistsSync } from 'fs-extra/esm'
import inquirer from 'inquirer'
import path from 'path'
import { transformVueAdmin, parseConfig, getTemplatePath } from '../utils/index.js'
import ora from 'ora'
import chalk from 'chalk'
import os from 'os'
import { readFileSync, writeFileSync } from 'fs'

export async function create() {
  await checkHusky()
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
    const dest = path.resolve(process.cwd(), `${configData!.options.name || 'vswift-project'}`)
    await copyTemplate(
      getTemplatePath('vue-admin' /**暂时只支持vue-admin */, import.meta.url),
      dest
    )
    await solveFilesLossWhenCopy(configData!.options.name || 'vswift-project')
    spinner.succeed('Download done')

    spinner.start('Initialize git...' + os.EOL)
    await gitInit(configData!.options.name || 'vswift-project')
    spinner.succeed('Initializing git done')

    spinner.start('Set up git hooks...' + os.EOL)
    await setupGithooks(configData!.options.name || 'vswift-project')
    spinner.succeed('Set up git hooks done')

    spinner.start('Transforming...' + os.EOL)
    await transformVueAdmin(dest, configFilePath!)
    spinner.succeed(
      `Transform done, your project template has been created, see:  ${chalk.green(dest)}`
    )

    finalOutput(configData!.options.name || 'vswift-project')
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
      await solveFilesLossWhenCopy(projectName)
      spinner.succeed('Download done')

      spinner.start('Initialize Git...' + os.EOL)
      await gitInit(projectName)
      spinner.succeed('Initializing Git done')

      spinner.start('Set up Git Hooks...' + os.EOL)
      await setupGithooks(projectName)
      spinner.succeed('Set up Git Hooks done')

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
    consola.info(`Detected that your global husky version is ${huskyVersion}`)
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

async function solveFilesLossWhenCopy(projectName: string) {
  // 解决.gitignore可能丢失的问题
  const gitignoreFilePath = path.resolve(process.cwd(), `${projectName}/.gitignore`)
  if (!(await pathExists(gitignoreFilePath))) {
    // 手动写入
    createGitignore(gitignoreFilePath)
  }
  // 解决.npmrc可能丢失的问题
  const npmrcFilePath = path.resolve(process.cwd(), `${projectName}/.npmrc`)
  if (!(await pathExists(npmrcFilePath))) {
    // 手动写入
    createNpmrc(npmrcFilePath)
  }
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
    '\n',
    'node_modules',
    '.DS_Store',
    'dist',
    'coverage',
    '*.local',
    '\n',
    '/cypress/videos/',
    '/cypress/screenshots/',
    '# Editor directories and files',
    '.vscode/*',
    '!.vscode/extensions.json',
    '\n',
    '*.tsbuildinfo'
  ]
  writeFileSync(path, rules.join('\n'))
}

function createNpmrc(path: string) {
  const rules = [
    'registry=https://registry.npmmirror.com/',
    '@scoped:registry=https://xxx.xxx.com/',
    'engine-strict=true',
    'save-exact=true'
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
