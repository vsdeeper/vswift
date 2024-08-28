import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { changeConfig } from '../../utils/index.js'

export async function generateEnv(dest: string, options: Record<string, any>) {
  const envConfigPath = path.resolve(dest, '.env')
  const envTestConfigPath = path.resolve(dest, '.env.test')
  const envProdConfigPath = path.resolve(dest, '.env.prod')

  const envConfig = readFileSync(envConfigPath).toString('utf-8')
  const envTestConfig = readFileSync(envTestConfigPath).toString('utf-8')
  const envProdConfig = readFileSync(envProdConfigPath).toString('utf-8')

  const newEnvConfig1 = changeConfig('VITE_API_DOMAIN', options.apiDomain.dev || '/', envConfig)
  const newEnvConfig2 = changeConfig('VITE_API_BASE_PATH', options.apiBasePath || '', newEnvConfig1)
  const newEnvTestConfig = changeConfig(
    'VITE_API_DOMAIN',
    options.apiDomain.test || '/',
    envTestConfig
  )
  const newEnvProdConfig = changeConfig(
    'VITE_API_DOMAIN',
    options.apiDomain.prod || '/',
    envProdConfig
  )

  if (newEnvConfig2 !== envConfig) {
    writeFileSync(envConfigPath, newEnvConfig2)
  }
  if (newEnvTestConfig !== envTestConfig) {
    writeFileSync(envTestConfigPath, newEnvTestConfig)
  }
  if (newEnvProdConfig !== envProdConfig) {
    writeFileSync(envProdConfigPath, newEnvProdConfig)
  }
}
