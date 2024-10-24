import { readFileSync } from 'fs'
import { pathExistsSync } from 'fs-extra/esm'
import { camel, last, pascal } from 'radash'
import { parseConfig } from '../../../utils/index.js'
import consola from 'consola'
import chalk from 'chalk'
import {
  genApiImports,
  genAsyncComponentConst,
  genSearchConfig,
  genStoresGlobalImports,
  genTableConfig,
  genTableTemplate,
  genUseStoreConst,
  genVswiftComponentsTypeImports,
  resolveDestructuringVar,
  resolveImport,
} from './util.js'

const importCodeArr: string[] = []
const definitionCodeArr: string[] = []
const templateCodeArr: string[] = []
const paramsCodeArr: string[] = []
const onMountedCodeArr: string[] = []

/**
 * 生成SFC格式
 */
export async function generateView(name: string) {
  // 1. 解析配置数据
  const config = parseConfig()
  const configFilePath = `${config.downloadDir}/${name + '.json'}`
  if (!pathExistsSync(configFilePath)) {
    consola.error(`Configuration file ${chalk.green(configFilePath)} not found`)
    return
  }
  const configData = JSON.parse(readFileSync(configFilePath).toString('utf-8'))
  const { options, components } = configData

  // 2. 提取一些数据，方便判断代码生成逻辑
  const findSearch = components.find(e => e.type === 'Search')
  const findTable = components.find(e => e.type === 'Table')
  const searchConditionItems = findSearch?.options?.searchConditionItems
  const tableColumnItems = findTable?.options?.tableColumnItems.reduce(
    (pre: Record<string, any>[], cur: Record<string, any>) => {
      return [...pre, ...(cur.tableColumnItems?.length ? [cur, ...cur.tableColumnItems] : [cur])]
    },
    [],
  )
  const tableOperations = findTable?.options?.tableOperations
  const tableColumnOperations = findTable?.options?.tableColumnOperations
  const tableOperationsHasPermissionCode = tableOperations?.filter(e => !!e.code)
  const tableColumnOperationsHasPermissionCode = tableColumnOperations?.filter(e => !!e.code)
  const tableOperationsNeedApi = tableOperations?.filter(
    e =>
      (e.apiConfig?.method && e.apiConfig?.url) ||
      (e.echoApiConfig?.method && e.echoApiConfig?.url),
  )
  const tableColumnOperationsNeedApi = tableColumnOperations?.filter(
    e =>
      (e.apiConfig?.method && e.apiConfig?.url) ||
      (e.echoApiConfig?.method && e.echoApiConfig?.url),
  )
  const staticDataKeyArrInSearch: string[] = Array.from(
    new Set(
      searchConditionItems
        ?.filter(
          (a: Record<string, any>) => a.optionDataType === 'static_data' && !!a.staticDataKey,
        )
        ?.map((b: Record<string, any>) => b.staticDataKey) ?? [],
    ),
  )
  const staticDataKeyArrInTable: string[] = Array.from(
    new Set(
      tableColumnItems
        ?.filter(
          (a: Record<string, any>) =>
            a.formatterType === 'static_data_transform' && !!a.staticDataKey,
        )
        ?.map((b: Record<string, any>) => b.staticDataKey) ?? [],
    ),
  )
  const tableOperationsHasForm = tableOperations?.filter(e => !!e.formConfig)
  const tableColumnItemsHasForm = tableColumnItems.filter(e => !!e.formConfig)
  const searchConditionItemsNeedStore = searchConditionItems?.filter(
    e =>
      ['Select', 'Cascader'].includes(e.type) &&
      e.optionDataType === 'definition' &&
      e.dataSource === 'api' &&
      e.apiConfig?.method &&
      e.apiConfig?.url,
  )
  const tableColumnItemsNeedStore = tableColumnItems?.filter(
    e => e.formatterType === 'dynamic_data_transform' && e.apiConfig?.method && e.apiConfig?.url,
  )

  // 3. 默认代码添加
  addImportCode(
    'module',
    genStoresGlobalImports(
      findTable,
      searchConditionItems,
      tableColumnItems,
      tableOperationsHasPermissionCode,
      tableColumnOperationsHasPermissionCode,
    ),
    '@/stores/global',
  )
  addImportCode(
    'module',
    genApiImports(tableOperationsNeedApi, tableColumnOperationsNeedApi),
    `'@/api/'${options.name}`,
  )
  addImportCode(
    'module',
    [`use${pascal(last(options.name.split('/'))!)}Store`],
    `'@/stores/'${options.name}'`,
  )

  // 4. 有搜索或表格时
  if (findSearch || findTable /** 有使用@vswift/components组建库 */) {
    addImportCode(
      'type',
      genVswiftComponentsTypeImports(findSearch, findTable),
      '@vswift/components',
    )
  }
  // 5. 有搜索时
  if (findSearch) {
    addDefinitionCode(
      `const search = ref<VsSearchProps>({${genSearchConfig(findSearch).join('')}})`,
    )
    addTemplateCode(`<VsSearch v-bind="search" @inquire="onInquire" @reset="onReset"></VsSearch>`)
    // 5.1 搜索中配置了静态数据key
    if (staticDataKeyArrInSearch.length /** 搜索中配置了静态数据key */) {
      addImportCode('module', staticDataKeyArrInSearch, './constants')
    }
  }
  // 6. 有表格时
  if (findTable) {
    addDefinitionCode([
      'const TableRef = ref<VsTableInstance>()',
      `const table = ref<Partial<VsTableProps>>({${genTableConfig(findTable).join('')}})`,
    ])
    addTemplateCode(
      `<VsTable ref="TableRef" v-model:page-size="params.pageSize" v-model:current-page="params.pageIndex" v-bind="table" @operate="onOperate" @paging-change="onPagingChange">${genTableTemplate(findTable).join('')}</VsTable>`,
    )
    if (findTable?.options?.showPagination) {
      addParamsCode('pageIndex: 1,', 'pageSize: getPageSize()')
    }

    // 6.1 表格列有日期格式化
    if (tableColumnItems.some(e => e.formatterType === 'date_format')) {
      addImportCode('module', ['format'], 'date-fns')
    }
    // 6.2 表格列有动态数据转换且是树形数据
    if (tableColumnItems.some(e => e.formatterType === 'dynamic_data_transform' && e.isTreeData)) {
      addImportCode('module', ['findArraryValueFromTreeData'], '@/utils')
    }
    // 6.3 表格列有动态数据转换且不是树形数据或表格列有静态数据转换且有静态数据key
    if (
      tableColumnItems.some(e => e.formatterType === 'dynamic_data_transform' && !e.isTreeData) ||
      tableColumnItems.some(e => e.formatterType === 'static_data_transform' && !!e.staticDataKey)
    ) {
      addImportCode('module', ['getLabelByValue'], '@/utils')
    }
    // 6.4 表格中配置了静态数据key
    if (staticDataKeyArrInTable.length /** 表格中配置了静态数据key */) {
      addImportCode('module', staticDataKeyArrInTable, './constants')
    }
  }

  // 7. 有异步组件定义时
  const asyncComponentConstants = genAsyncComponentConst(
    tableOperationsHasForm,
    tableColumnItemsHasForm,
  )
  if (asyncComponentConstants.length) {
    addDefinitionCode([
      ...asyncComponentConstants.map(
        e =>
          `const ${camel(e)} = defineAsyncComponent(() => import('./components/${e}/${pascal(e)}.vue'))`,
      ),
      ...asyncComponentConstants.map(e => `const ${pascal(e)}Ref = ref<${pascal(e)}Instance>()`),
    ])
  }

  // 8. 有 useXxxStore 定义时
  const useStoreConst = genUseStoreConst(searchConditionItemsNeedStore, tableColumnItemsNeedStore)
  if (useStoreConst.length) {
    const name = pascal(last(options.name.split('/'))!)
    for (const item of useStoreConst) {
      addDestructuringVar(`get${pascal(item)}`, `use${name}Store()`)
      addDestructuringVar(item, `storeToRefs(use${name}Store())`)
    }
  }

  // 9. 有 useUserInfoStore 定义时
  if (tableOperationsHasPermissionCode?.length || tableColumnOperationsHasPermissionCode?.length) {
    addDestructuringVar('permissionCodes', 'storeToRefs(useUserInfoStore())')
  }

  // 10. onMounted 代码生成
  if (definitionCodeArr.includes('useApi') /** 有全局api导入 */) {
    const apiNamesForSearch = searchConditionItems
      ?.filter(e => !!e.apiConfig?.useGlobalApi)
      ?.map(e => e.apiConfig.useGlobalApi)

    const apiNamesForTable = tableColumnItems
      ?.filter(e => !!e.apiConfig?.useGlobalApi)
      ?.map(e => e.apiConfig.useGlobalApi)

    const _apiNamesForSearch: string[] = Array.from(new Set(apiNamesForSearch))
    const _apiNamesForTable: string[] = Array.from(new Set(apiNamesForTable))
    const apiNames = Array.from(new Set([..._apiNamesForSearch, ..._apiNamesForTable]))
    for (const apiName of apiNames) {
      addDestructuringVar(apiName, 'useApi()')
      addDefinitionCode(`const ${apiName.replace(/^get/, '')} = ref<Record<string, any>[]>([])`)
      addOnMountedCode(
        `${apiName}().then((res) => (${apiName.replace(/^get/, '')}.value = res ?? []))`,
      )
    }
  }
}

/**
 * 添加导入代码
 */
function addImportCode(importType: 'type' | 'module', importNames: string[], importPath: string) {
  const code = importCodeArr.find(e => e.includes(importPath))
  const index = importCodeArr.findIndex(e => e.includes(importPath))
  if (!code /** 首次导入 */) {
    if (importType === 'type') {
      importCodeArr.push(`import type { ${importNames.join(',')} } from '${importPath}'`)
    } else if (importType === 'module') {
      importCodeArr.push(`import { ${importNames.join(',')} } from '${importPath}'`)
    }
  } else {
    const importObj = resolveImport(code)
    if (importType === 'type') {
      importObj?.typeImports.push(...importNames)
    } else if (importType === 'module') {
      importObj?.modleImports.push(...importNames)
    }
    if (!importObj?.modleImports.length) {
      importCodeArr[index] =
        `import type { ${importObj?.typeImports.join(',')} } from '${importPath}'`
    } else {
      const typeCodes = importObj?.typeImports.map(e => `type ${e}`)
      importCodeArr[index] =
        `import { ${typeCodes.length ? typeCodes.join(',') : ''}${importObj.modleImports.join(',')} } from '${importPath}'`
    }
  }
}

/**
 * 添加定义代码
 * 适用于一次性添加
 */
function addDefinitionCode(code: string | string[], fromIndex?: number) {
  if (typeof fromIndex === 'undefined') {
    // 添加到末尾
    definitionCodeArr.push(...code)
  } else {
    // 添加到指定位置
    definitionCodeArr.splice(fromIndex, 0, ...code)
  }
}

/**
 * 添加解构变量
 * 本质上也是添加定义代码，不同在于是解构变量
 */
function addDestructuringVar(name: string, source: string) {
  const code = definitionCodeArr.find(e => e.includes(source))
  const index = definitionCodeArr.findIndex(e => e.includes(source))
  if (!code /** 首次导入 */) {
    definitionCodeArr.push(`const { ${name} } = ${source}`)
  } else {
    const varArr = resolveDestructuringVar(code)
    varArr?.push(name)
    definitionCodeArr[index] = `const { ${varArr?.length ? varArr.join(',') : ''} } = ${source}`
  }
}

/**
 * 添加模板代码
 */
function addTemplateCode(...code: string[]) {
  templateCodeArr.push(...code)
}

/**
 * 添加params定义代码
 * params可能在不同地方追加代码
 * 适用于多次添加
 */
function addParamsCode(...code: string[]) {
  paramsCodeArr.push(...code)
}

/**
 * 添加onMounted阶段代码
 */
function addOnMountedCode(code: string | string[], fromIndex?: number) {
  if (typeof fromIndex === 'undefined') {
    // 添加到末尾
    onMountedCodeArr.push(...code)
  } else {
    // 添加到指定位置
    onMountedCodeArr.splice(fromIndex, 0, ...code)
  }
}
