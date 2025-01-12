import path from 'path'
import { pathExists } from 'fs-extra/esm'
import ora from 'ora'
import os from 'os'
import chalk from 'chalk'
import { readFile, writeFile } from 'node:fs/promises'
import { copyTemplate, getTemplatePath } from '../../utils/utils.js'
import { changeConfig, parseConfig } from '../../utils/config-operations.js'
import { createGitignore, finalOutput, gitAddOrigin, gitInit, setupGithooks } from '../utils.js'
import type { ProjectDesignData } from 'visual-development'

export async function generateProject(fileName: string) {
  const config = await parseConfig()
  if (!config.configFileDir) {
    throw new Error(
      `Please set configuration file download directory, you can execute ${chalk.gray('vswift config set configFileDir "<dir>"')} to set it`,
    )
  }

  const configFilePath = `${config.configFileDir}/${fileName + '.json'}`
  if (!(await pathExists(configFilePath))) {
    throw new Error(`Configuration file ${chalk.green(configFilePath)} not found`)
  }

  const spinner = ora({ spinner: 'line' })
  spinner.start('Generating...' + os.EOL)
  const configData: ProjectDesignData = JSON.parse(
    await readFile(configFilePath, { encoding: 'utf-8' }),
  )
  const { options } = configData
  const projectName = configData!.options.name || 'vswift-project'
  const dest = path.resolve(process.cwd(), `${projectName}`)

  // 下载template
  await copyTemplate(await getTemplatePath('vue-admin', import.meta.url, '../../'), dest)

  // 生成env环境变量
  await generateEnv(dest, options)

  // 添加.npmrc
  if (options.npmrc) {
    await writeFile(path.resolve(dest, '.npmrc'), options.npmrc)
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
    `Generate successfully, your project template has been created, see:  ${chalk.green(dest)}`,
  )

  finalOutput(projectName)
}

async function generateEnv(dest: string, options: Record<string, any>) {
  const envConfigPath = path.resolve(dest, '.env')
  const envTestConfigPath = path.resolve(dest, '.env.test')
  const envProdConfigPath = path.resolve(dest, '.env.prod')

  const envConfig = await readFile(envConfigPath, { encoding: 'utf-8' })
  const envTestConfig = await readFile(envTestConfigPath, { encoding: 'utf-8' })
  const envProdConfig = await readFile(envProdConfigPath, { encoding: 'utf-8' })

  const newEnvConfig1 = changeConfig('VITE_API_DOMAIN', options.apiDomain.dev || '/', envConfig)
  const newEnvConfig2 = changeConfig('VITE_API_BASE_PATH', options.apiBasePath || '', newEnvConfig1)
  const newEnvTestConfig = changeConfig(
    'VITE_API_DOMAIN',
    options.apiDomain.test || '/',
    envTestConfig,
  )
  const newEnvProdConfig = changeConfig(
    'VITE_API_DOMAIN',
    options.apiDomain.prod || '/',
    envProdConfig,
  )

  if (newEnvConfig2 !== envConfig) {
    await writeFile(envConfigPath, newEnvConfig2)
  }
  if (newEnvTestConfig !== envTestConfig) {
    await writeFile(envTestConfigPath, newEnvTestConfig)
  }
  if (newEnvProdConfig !== envProdConfig) {
    await writeFile(envProdConfigPath, newEnvProdConfig)
  }
}
