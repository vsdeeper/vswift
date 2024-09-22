import { $ } from 'execa'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { pathExistsSync } from 'fs-extra/esm'
import path from 'path'
import { camel, last, pascal } from 'radash'
import { parseConfig } from '../../../utils/index.js'
import consola from 'consola'
import chalk from 'chalk'
import {
  getApiImports,
  getAsyncComponentConst,
  getConstantsImports,
  getDateFnsImports,
  getParams,
  getSearch,
  getStoresGlobalImports,
  getUseStoreConst,
  getUseUserInfoStoreConst,
  getUtilsImports,
  getVswiftComponentsTypeImports,
} from './util.js'

/**
 * 生成SFC格式
 */
export async function generateView(fileName: string) {
  const config = parseConfig()
  const configFilePath = `${config.downloadDir}/${fileName + '.json'}`
  if (!pathExistsSync(configFilePath)) {
    consola.error(`Configuration file ${chalk.green(configFilePath)} not found`)
    return
  }
  const configData = JSON.parse(readFileSync(configFilePath).toString('utf-8'))
  const { options } = configData
  const code = `${transCode(configData).join('\n')}`
  const viewName = options.name ?? 'unknown-view'
  const fileDir = path.resolve(process.cwd(), `templates/vue-admin/src/views/${viewName}`)
  const filePath = path.resolve(fileDir, `${pascal(viewName)}.vue`)
  if (pathExistsSync(fileDir)) {
    consola.error(`${chalk.green(fileDir)} directory already exists`)
  } else {
    mkdirSync(fileDir)
    writeFileSync(filePath, code)
    await $({ shell: true })`pnpm prettier ${filePath} --write`
  }
}

function transCode(configData: Record<string, any>) {
  const { components, options } = configData
  const scriptCodeArr: string[] = []
  const templateCodeArr: string[] = []

  // script 生成开始
  scriptCodeArr.push('<script setup lang="ts">')

  // @vswift/components 类型导入
  const vswiftComponentsTypeImports = getVswiftComponentsTypeImports(components)
  if (vswiftComponentsTypeImports.length) {
    scriptCodeArr.push(
      `import type { ${vswiftComponentsTypeImports.join(',')} } from '@vswift/components'`,
    )
  }

  // date-fns 导入
  const dateFnsImports = getDateFnsImports(components)
  if (dateFnsImports.length) {
    scriptCodeArr.push(`import { ${dateFnsImports.join(',')} } from 'date-fns'`)
  }

  // @/stores/global 导入
  const storesGlobalImports = getStoresGlobalImports(components)
  if (storesGlobalImports.length) {
    scriptCodeArr.push(`import { ${storesGlobalImports.join(',')} } from '@/stores/global'`)
  }

  // @/utils 导入
  const utilsImports = getUtilsImports(components)
  if (utilsImports.length) {
    scriptCodeArr.push(`import { ${utilsImports.join(',')} } from '@/utils'`)
  }

  // @/api/xxx 导入
  const apiImports = getApiImports(components)
  if (apiImports.length) {
    scriptCodeArr.push(`import { ${apiImports.join(',')} } from '@/api/'${options.name}`)
  }

  // @/stores/xxx 导入
  if (options.name) {
    scriptCodeArr.push(
      `import { use${pascal(last(options.name.split('/'))!)}Store } from '@/stores/'${options.name}`,
    )
  }

  // ./constants 导入
  const constantsImports = getConstantsImports(components)
  if (constantsImports.length) {
    scriptCodeArr.push(`import { ${constantsImports.join(',')} } from './constants'`)
  }

  // AsyncComponent 定义
  const asyncComponentConstants = getAsyncComponentConst(components)
  if (asyncComponentConstants.length) {
    scriptCodeArr.push(
      ...asyncComponentConstants.map(
        e =>
          `const ${camel(e)} = defineAsyncComponent(() => import('./components/${e}/${pascal(e)}.vue'))`,
      ),
      ...asyncComponentConstants.map(e => `const ${pascal(e)}Ref = ref<${pascal(e)}Instance>()`),
    )
  }

  // useXxxStore 定义
  const useStoreConst = getUseStoreConst(components)
  if (useStoreConst.length) {
    const name = pascal(last(options.name.split('/'))!)
    scriptCodeArr.push(
      `const { ${useStoreConst.map(e => `get${pascal(e)}`).join(',')} } = use${name}Store()`,
      `const { ${useStoreConst.join(',')} } = storeToRefs(use${name}Store())`,
    )
  }

  // useUserInfoStore 定义
  const useUserInfoStoreConst = getUseUserInfoStoreConst(components)
  if (useUserInfoStoreConst.length) {
    scriptCodeArr.push(
      `const { ${useUserInfoStoreConst.join(',')} } = storeToRefs(useUserInfoStore())`,
    )
  }

  // params 定义
  const params = getParams(components)
  if (params.length) {
    scriptCodeArr.push(params.join('\n'))
  }

  // search 定义
  const search = getSearch(components)
  if (search.length) {
    scriptCodeArr.push(search.join('\n'))
  }

  // script 生成结束
  scriptCodeArr.push('</script>')

  return [...scriptCodeArr, ...templateCodeArr]
}
