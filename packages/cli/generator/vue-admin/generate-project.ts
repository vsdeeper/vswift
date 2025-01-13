import path from 'path'
import { pathExists } from 'fs-extra/esm'
import ora from 'ora'
import os from 'os'
import chalk from 'chalk'
import { readFile, writeFile } from 'node:fs/promises'
import { copyTemplate, getTemplatePath } from '../../utils/utils.js'
import { changeConfig, parseConfig } from '../../utils/config-operations.js'
import { createGitignore, finalOutput, gitAddOrigin, gitInit } from '../utils.js'
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
  const configData: ProjectDesignData = JSON.parse(
    await readFile(configFilePath, { encoding: 'utf-8' }),
  )
  const { options } = configData
  const projectName = configData!.options.name || 'vswift-project'
  const dest = path.resolve(process.cwd(), `${projectName}`)

  // 下载template
  spinner.start('Downloading template...' + os.EOL)
  await copyTemplate(await getTemplatePath('vue-admin', import.meta.url, '../../'), dest)
  spinner.succeed('Download template done')

  // 创建env环境变量
  spinner.start('Creating .env files...' + os.EOL)
  await generateEnv(dest, options)
  spinner.succeed('Create .env files done')

  // 添加.npmrc
  if (options.npmrc) {
    spinner.start('Creating .npmrc file...' + os.EOL)
    await writeFile(path.resolve(dest, '.npmrc'), options.npmrc)
    spinner.succeed('Create .npmrc file done')
  }

  // Git init
  spinner.start('Git init...' + os.EOL)
  await gitInit(projectName)
  spinner.succeed('Git init done')

  // 设置 git remote origin
  if (options.gitUrl) {
    spinner.start('Adding git remote origin...' + os.EOL)
    await gitAddOrigin(projectName, options.gitUrl)
    spinner.succeed('Add git remote origin done')
  }

  // 添加.gitignore文件
  const gitignoreFilePath = path.resolve(process.cwd(), `${projectName}/.gitignore`)
  if (!(await pathExists(gitignoreFilePath))) {
    // git init 会导致 .gitignore 丢失，手动写入.gitignore
    spinner.start('Creating .gitignore file...' + os.EOL)
    await createGitignore(gitignoreFilePath)
    spinner.succeed('Create .gitignore file done')
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

  const newEnvConfig1 = changeConfig('VITE_API_DOMAIN', options.apiDomain.dev || '', envConfig)
  const newEnvConfig2 = changeConfig('VITE_API_BASE_PATH', options.apiBasePath || '', newEnvConfig1)
  const newEnvTestConfig = changeConfig(
    'VITE_API_DOMAIN',
    options.apiDomain.test || '',
    envTestConfig,
  )
  const newEnvProdConfig = changeConfig(
    'VITE_API_DOMAIN',
    options.apiDomain.prod || '',
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
