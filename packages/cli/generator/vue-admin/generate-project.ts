import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { copy, pathExists, pathExistsSync } from 'fs-extra/esm'
import { $ } from 'execa'
import ora from 'ora'
import os from 'os'
import chalk from 'chalk'
import { generateEnv } from './index.js'
import { getTemplatePath, parseConfig } from '../../utils/index.js'
import { finalOutput } from '../util.js'
import consola from 'consola'

export async function generateProject(fileName: string) {
  const config = parseConfig()
  if (!config.downloadDir) {
    consola.error(
      `Please set configuration file download directory, you can run ${chalk.gray('$ vswift config downloadDir <path>')} to set it`,
    )
    return
  }

  const configFilePath = `${config.downloadDir}/${fileName + '.json'}`
  if (!pathExistsSync(configFilePath)) {
    consola.error(`Configuration file ${chalk.green(configFilePath)} not found`)
    return
  }

  const spinner = ora({ spinner: 'line' })
  spinner.start('Generating...' + os.EOL)
  const configData = JSON.parse(readFileSync(configFilePath).toString('utf-8'))
  const { options } = configData
  const projectName = configData!.options.name || 'vswift-project'
  const dest = path.resolve(process.cwd(), `${projectName}`)

  // 下载template
  await copyTemplate(getTemplatePath('vue-admin', import.meta.url, '../../'), dest)

  // 生成env环境变量
  await generateEnv(dest, options)

  // 添加.npmrc
  if (options.npmrc) {
    writeFileSync(path.resolve(dest, '.npmrc'), options.npmrc)
  }

  // Git init
  await gitInit(projectName)

  // 设置 git remote origin
  if (options.gitUrl) {
    await gitAddOrigin(projectName, options.gitUrl)
  }

  // 设置 git hooks
  await setupGithooks(projectName)

  // 添加.gitignore文件
  const gitignoreFilePath = path.resolve(process.cwd(), `${projectName}/.gitignore`)
  if (!(await pathExists(gitignoreFilePath))) {
    // git init 会导致 .gitignore 丢失，手动写入.gitignore
    createGitignore(gitignoreFilePath)
  }

  spinner.succeed(
    `Generate success, your project template has been created, see:  ${chalk.green(dest)}`,
  )

  finalOutput(projectName)
}

async function copyTemplate(source: string, dest: string) {
  await copy(source, dest, {
    filter: src => !(src.endsWith('dist') || src.endsWith('node_modules')),
  })
}

async function gitInit(projectName: string) {
  await $({ shell: true })`cd ${projectName} && git init`
}

async function gitAddOrigin(projectName: string, url: string) {
  await $({ shell: true })`cd ${projectName} && git remote add origin ${url}`
}

async function setupGithooks(projectName: string) {
  await $({
    shell: true,
  })`cd ${projectName} && pnpm exec husky init`
  await $({
    shell: true,
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
    '*.tsbuildinfo',
  ]
  writeFileSync(path, rules.join('\n'))
}
