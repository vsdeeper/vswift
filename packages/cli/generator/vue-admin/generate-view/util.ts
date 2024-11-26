import consola from 'consola'
import { camel, dash, last, pascal } from 'radash'

// 解析视图view对象结构
export function resolveViewObject(options: Record<string, any>, components: Record<string, any>[]) {
  const viewObject: Record<string, any> = {}
  const { name, saticDataConfig } = options
  if (name) {
    const nameArr = name.split('/')
    viewObject.base = `/view${name.startsWith('/') ? name : `/${name}`}`
    viewObject[`/${pascal(last(nameArr)!)}.vue`] = undefined
    genComponentCode(options, components)
  }
  if (saticDataConfig?.length) {
    viewObject['/constants.ts'] = undefined
  }
  const findTable = components.find(e => e.type === 'Table')
  if (findTable) {
    viewObject['/utils.ts'] = undefined
    viewObject['/components'] = {}
    const tableOperations = findTable?.options?.tableOperations
    const tableColumnOperations = findTable?.options?.tableColumnOperations
    const tableOperationsHasForm = tableOperations?.filter(
      e => !e.formConfig?.useOtherOperateForm && !!e.formConfig,
    )
    const tableColumnOperationsHasForm = tableColumnOperations?.filter(
      e => !e.formConfig?.useOtherOperateForm && !!e.formConfig,
    )
    if (tableOperationsHasForm?.length || tableColumnOperationsHasForm?.length) {
      viewObject['/components']['/index.ts'] = undefined
    }
    for (const item of tableOperationsHasForm) {
      viewObject['/components'][`/table-${item.value}`] = {}
      viewObject['/components'][`/table-${item.value}`]['/index.ts'] = undefined
      viewObject['/components'][`/table-${item.value}`][`/${pascal(`table-${item.value}`)}.vue`] =
        undefined
      if (item.formConfig) {
        viewObject['/components'][`/table-${item.value}`]['/components'] = {
          '/index.ts': undefined,
          '/form-detail': {
            '/index.ts': undefined,
            '/FormDetail.vue': undefined,
          },
        }
      }
    }
    for (const item of tableColumnOperationsHasForm) {
      viewObject['/components'][`/row-${item.value}`] = {}
      viewObject['/components'][`/row-${item.value}`]['/index.ts'] = undefined
      viewObject['/components'][`/row-${item.value}`][`/${pascal(`row-${item.value}`)}.vue`] =
        undefined
      if (item.formConfig) {
        viewObject['/components'][`/row-${item.value}`]['/components'] = {
          '/index.ts': undefined,
          '/form-detail': {
            '/index.ts': undefined,
            '/FormDetail.vue': undefined,
          },
        }
      }
    }
  }
  return viewObject
}

// 解析视图api对象结构
export function resolveApiObjectOfView(options: Record<string, any>) {
  const apiObject: Record<string, any> = {}
  const { name } = options ?? {}
  if (name) {
    const nameArr = name.split('/').filter(e => !!e)
    apiObject.base = `/api${nameArr.length > 1 ? `/${nameArr.slice(0, nameArr.length - 1).join('/')}` : ''}`
    apiObject[`/${dash(last(nameArr)!)}.ts`] = undefined
  }
  return apiObject
}

// 解析视图store对象结构
export function resolveStoreObjectOfView(options: Record<string, any>) {
  const storeObject: Record<string, any> = {}
  const { name } = options ?? {}
  if (name) {
    const nameArr = name.split('/').filter(e => !!e)
    storeObject.base = `/stores${nameArr.length > 1 ? `/${nameArr.slice(0, nameArr.length - 1).join('/')}` : ''}`
    storeObject['/index.ts'] = undefined
    storeObject[`/${dash(last(nameArr)!)}.ts`] = undefined
  }
  return storeObject
}

// 生成组件代码
function genComponentCode(options: Record<string, any>, components: Record<string, any>[]) {
  // 提取数据
  const { name } = options
  const nameArr = name.split('/').filter(e => !!e)
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
  const tableOperationsHasPermissionCode = tableOperations?.filter(e => !!e.code)
  const tableColumnOperations = findTable?.options?.tableColumnOperations
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
  const tableOperationsHasForm = tableOperations?.filter(
    e => !e.formConfig?.useOtherOperateForm && !!e.formConfig,
  )
  const tableColumnOperationsHasForm = tableColumnOperations?.filter(
    e => !e.formConfig?.useOtherOperateForm && !!e.formConfig,
  )
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

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 存储组件定义代码
  const definitionCodeArr: string[] = []
  // 存储params定义代码
  const paramsCodeArr: string[] = []
  // 存储onOperate代码
  const onOperateCodeArr: string[] = []
  // 存储onMounted代码
  const onMountedCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []

  // 生成导入代码片段并存储
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
    importCodeArr,
  )
  addImportCode(
    'module',
    genApiImports(tableOperationsNeedApi, tableColumnOperationsNeedApi),
    `'@/api${name.startsWith('/') ? name : `/${name}`}`,
    importCodeArr,
  )
  addImportCode(
    'module',
    [`use${pascal(last(options.name.split('/'))!)}Store`],
    `@/stores${nameArr.length > 1 ? `/${nameArr.slice(0, nameArr.length - 1).join('/')}` : ''}`,
    importCodeArr,
  )
  if (findSearch || findTable /** 有搜索或表格默认使用了@vswift/components组建库 */) {
    addImportCode(
      'type',
      genVswiftComponentsTypeImports(findSearch, findTable),
      '@vswift/components',
      importCodeArr,
    )
  }
  if (findSearch /** 有搜索 */) {
    if (staticDataKeyArrInSearch.length /**搜索中配置了静态数据key */) {
      addImportCode('module', staticDataKeyArrInSearch, './constants', importCodeArr)
    }
  }
  if (findTable /**有表格 */) {
    if (tableColumnItems.some(e => e.formatterType === 'date_format') /**表格列有日期格式化 */) {
      addImportCode('module', ['format'], 'date-fns', importCodeArr)
    }
    if (
      tableColumnItems.some(
        e => e.formatterType === 'dynamic_data_transform' && e.isTreeData,
      ) /** 表格列有动态数据转换且是树形数据 */
    ) {
      addImportCode('module', ['findArraryValueFromTreeData'], '@/utils', importCodeArr)
    }
    if (
      tableColumnItems.some(e => e.formatterType === 'dynamic_data_transform' && !e.isTreeData) ||
      tableColumnItems.some(
        e => e.formatterType === 'static_data_transform' && !!e.staticDataKey,
      ) /**表格列有动态数据转换且不是树形数据或表格列有静态数据转换且有静态数据key */
    ) {
      addImportCode('module', ['getLabelByValue'], '@/utils', importCodeArr)
    }
    if (staticDataKeyArrInTable.length /** 表格中配置了静态数据key */) {
      addImportCode('module', staticDataKeyArrInTable, './constants', importCodeArr)
    }
  }

  // 生成定义代码片段并存储
  if (findSearch /**有搜索 */) {
    addDefinitionCode(
      [`const search = ref<VsSearchProps>({${genSearchConfig(findSearch).join('')}})`],
      null,
      definitionCodeArr,
    )
  }
  if (findTable /**有表格 */) {
    addDefinitionCode(
      [
        'const TableRef = ref<VsTableInstance>()',
        `const table = ref<Partial<VsTableProps>>({${genTableConfig(findTable).join('')}})`,
      ],
      null,
      definitionCodeArr,
    )
  }
  const asyncComponentConstants = genAsyncComponentConst(
    tableOperationsHasForm,
    tableColumnOperationsHasForm,
  )
  if (asyncComponentConstants.length /** 有异步组件 */) {
    addDefinitionCode(
      [
        ...asyncComponentConstants.map(
          e =>
            `const ${camel(e)} = defineAsyncComponent(() => import('./components/${e}/${pascal(e)}.vue'))`,
        ),
        ...asyncComponentConstants.map(e => `const ${pascal(e)}Ref = ref<${pascal(e)}Instance>()`),
      ],
      null,
      definitionCodeArr,
    )
  }
  if (findTable?.options.showPagination /** 有分页 */) {
    addDefinitionCode(
      [
        `
      const onInquire = (val: Record<string, any>) => {
        params.value = { ...params.value, ...val, pageIndex: 1 }
        getTableList(params.value)
      }
      `,
        `
      const onReset = () => {
        params.value.pageIndex = 1
        getTableList(params.value)
      }
      `,
        `
      const onPagingChange = (val: PagingParams) {
        params.value.pageIndex = val.pageIndex
        params.value.pageSize = val.pageSize
        getTableList(params.value)
      }
      `,
      ],
      null,
      definitionCodeArr,
    )
  }
  if (findTable /**有表格 */) {
    addDefinitionCode(
      [
        `
      const getTableList = async(params: PagingParams) {
        table.value.loading = true
        const res = await queryUserList(params)
        table.value.loading = false
        table.value.total = res?.total ?? 0
        table.value.data = res?.list ?? []
      }
      `,
      ],
      null,
      definitionCodeArr,
    )
  }
  const useStoreConst = genUseStoreConst(searchConditionItemsNeedStore, tableColumnItemsNeedStore)
  if (useStoreConst.length /**有 useXxxStore 定义 */) {
    const name = pascal(last(options.name.split('/'))!)
    for (const item of useStoreConst) {
      addDestructuringVar(`get${pascal(item)}`, `use${name}Store()`, definitionCodeArr)
      addDestructuringVar(item, `storeToRefs(use${name}Store())`, definitionCodeArr)
    }
  }
  if (
    tableOperationsHasPermissionCode?.length ||
    tableColumnOperationsHasPermissionCode?.length /** 有 useUserInfoStore 定义 */
  ) {
    addDestructuringVar('permissionCodes', 'storeToRefs(useUserInfoStore())', definitionCodeArr)
  }
  const apiNamesForSearch = searchConditionItems
    ?.filter(e => !!e.apiConfig?.useGlobalApi)
    ?.map(e => e.apiConfig.useGlobalApi)

  const apiNamesForTable = tableColumnItems
    ?.filter(e => !!e.apiConfig?.useGlobalApi)
    ?.map(e => e.apiConfig.useGlobalApi)

  const _apiNamesForSearch: string[] = Array.from(new Set(apiNamesForSearch))
  const _apiNamesForTable: string[] = Array.from(new Set(apiNamesForTable))
  const apiNames = Array.from(new Set([..._apiNamesForSearch, ..._apiNamesForTable]))
  for (const apiName of apiNames /**useGlobalApi 全局api引用相关代码生成 */) {
    addDestructuringVar(apiName, 'useGlobalApi()', definitionCodeArr)
    addDestructuringVar(
      apiName.replace(/^get/, ''),
      'storeToRefs(useGlobalApi())',
      definitionCodeArr,
    )
  }
  if (findTable?.options?.showPagination /**有分页 */) {
    addParamsCode(['pageIndex: 1,', 'pageSize: getPageSize()'], paramsCodeArr)
  }

  // 生成 onOperate 代码
  for (const item of tableOperations /** 表格操作 */) {
    if (item.formConfig && Object.keys(item.formConfig).length /** 有表单配置 */) {
      addOnOperateCode(
        [`case '${item.value}': { Table${pascal(item.value)}Ref.value?.open() break }`],
        null,
        onOperateCodeArr,
      )
    } else {
      // 批量操作，常规只需配一个参数，这里只取第一个参数
      const [param] = item.apiConfig.params
      addOnOperateCode(
        [
          `
        const selected = TableRef.value?.getSelectionRows()
        if (!selected?.length) {
          ElMessage.error('请选择要${item.label}的项')
          return
        }
        await ElMessageBox.confirm('确定${item.label}吗？', '提示', { type: 'warning' })
        const ${param.key} = selected.map((e) => e.${param.value})
        if (await ${item.apiConfig.apiName}({ ${param.key} })) {
          ElMessage.success('${item.label}成功')
          getTableList(params.value)
        }
        `,
        ],
        null,
        onOperateCodeArr,
      )
    }
  }
  for (const item of tableColumnOperations /** 表列操作 */) {
    if (item.formConfig && Object.keys(item.formConfig).length /** 有表单配置 */) {
      addOnOperateCode(
        [`case '${item.value}': { Table${pascal(item.value)}Ref.value?.open(val) break }`],
        null,
        onOperateCodeArr,
      )
    } else {
      const transParams = (arr: Record<string, any>[]) => {
        return arr
          .map(e => e.key)
          .map(e => `${e}: val!.${e}`)
          .join(',')
      }
      addOnOperateCode(
        [
          `
        case '${item.value}': {
          if (await ${item.apiConfig.name}({ ${transParams(item.apiConfig.params)} })) {
            ElMessage.success('${item.label}成功')
            getTableList(params.value)
          }
          break
        }
        `,
        ],
        null,
        onOperateCodeArr,
      )
    }
  }

  // 生成 onMounted 代码
  if (findTable /**有表格 */) {
    addOnMountedCode([`getTableList(params.value)`], null, onMountedCodeArr)
  }
  for (const apiName of apiNames) {
    addOnMountedCode([`${apiName}()`], null, onMountedCodeArr)
  }

  // 生成template代码
  if (findSearch /** 有搜索 */) {
    addTemplateCode(
      [`<VsSearch v-bind="search" @inquire="onInquire" @reset="onReset"></VsSearch>`],
      null,
      templateCodeArr,
    )
  }
  if (findTable /**有表格 */) {
    addTemplateCode(
      [
        `
      <VsTable ref="TableRef" ${findTable?.options?.showPagination ? 'v-model:page-size="params.pageSize" v-model:current-page="params.pageIndex" @paging-change="onPagingChange"' : ''} v-bind="table" @operate="onOperate">
        ${genTableTemplate(tableColumnItems).join('')}
      </VsTable>
      `,
      ],
      null,
      templateCodeArr,
    )
  }

  console.log(
    111,
    importCodeArr,
    definitionCodeArr,
    paramsCodeArr,
    onOperateCodeArr,
    onMountedCodeArr,
    templateCodeArr,
  )
}

/**
 * 添加导入代码
 */
function addImportCode(
  importType: 'type' | 'module',
  importNames: string[],
  importPath: string,
  storeObject: string[],
) {
  const code = storeObject.find(e => e.includes(importPath))
  const index = storeObject.findIndex(e => e.includes(importPath))
  if (!code /** 首次导入 */) {
    if (importType === 'type') {
      storeObject.push(`import type { ${importNames.join(',')} } from '${importPath}'`)
    } else if (importType === 'module') {
      storeObject.push(`import { ${importNames.join(',')} } from '${importPath}'`)
    }
  } else {
    const importObj = resolveImport(code)
    if (importType === 'type') {
      importObj?.typeImports.push(...importNames)
    } else if (importType === 'module') {
      importObj?.modleImports.push(...importNames)
    }
    if (!importObj?.modleImports.length) {
      storeObject[index] =
        `import type { ${importObj?.typeImports.join(',')} } from '${importPath}'`
    } else {
      const typeCodes = importObj?.typeImports.map(e => `type ${e}`)
      storeObject[index] =
        `import { ${typeCodes.length ? typeCodes.join(',') : ''}${importObj.modleImports.join(',')} } from '${importPath}'`
    }
  }
}

/**
 * 添加定义代码
 * 适用于一次性添加
 */
function addDefinitionCode(code: string[], fromIndex: number | null, storeObject: string[]) {
  if (typeof fromIndex === 'number') {
    // 添加到指定位置
    storeObject.splice(fromIndex, 0, ...code)
  } else {
    // 添加到末尾
    storeObject.push(...code)
  }
}

/**
 * 添加解构变量
 * 本质上也是添加定义代码，不同在于是解构变量
 */
function addDestructuringVar(name: string, source: string, storeObject: string[]) {
  const code = storeObject.find(e => e.includes(source))
  const index = storeObject.findIndex(e => e.includes(source))
  if (!code /** 首次导入 */) {
    storeObject.push(`const { ${name} } = ${source}`)
  } else {
    const varArr = resolveDestructuringVar(code)
    varArr?.push(name)
    storeObject[index] = `const { ${varArr?.length ? varArr.join(',') : ''} } = ${source}`
  }
}

/**
 * 添加params定义代码
 * params可能在不同地方追加代码
 * 适用于多次添加
 */
function addParamsCode(code: string[], storeObject: string[]) {
  storeObject.push(...code)
}

/**
 * 添加onOperate代码
 */
function addOnOperateCode(code: string[], fromIndex: number | null, storeObject: string[]) {
  if (typeof fromIndex === 'number') {
    // 添加到指定位置
    storeObject.splice(fromIndex, 0, ...code)
  } else {
    // 添加到末尾
    storeObject.push(...code)
  }
}

/**
 * 添加onMounted阶段代码
 */
function addOnMountedCode(code: string[], fromIndex: number | null, storeObject: string[]) {
  if (typeof fromIndex === 'number') {
    // 添加到指定位置
    storeObject.splice(fromIndex, 0, ...code)
  } else {
    // 添加到末尾
    storeObject.push(...code)
  }
}

/**
 * 添加模板代码
 */
function addTemplateCode(code: string[], fromIndex: number | null, storeObject: string[]) {
  if (typeof fromIndex === 'number') {
    // 添加到指定位置
    storeObject.splice(fromIndex, 0, ...code)
  } else {
    // 添加到末尾
    storeObject.push(...code)
  }
}

// 生成 @/stores/global 导入
export function genStoresGlobalImports(
  findTable?: Record<string, any>,
  searchConditionItems?: Record<string, any>[],
  tableColumnItems?: Record<string, any>[],
  tableOperationsHasPermissionCode?: Record<string, any>[],
  tableColumnOperationsHasPermissionCode?: Record<string, any>[],
) {
  const codeArr: string[] = []
  if (findTable?.options.showPagination /** 有分页，需要获取应用偏好设置的数据 */) {
    codeArr.push('useAppSettingStore')
  }
  if (
    tableOperationsHasPermissionCode?.length ||
    tableColumnOperationsHasPermissionCode?.length /** 表格操作或表列操作配置了权限标识符，需要从用户store中获取权限码数据 */
  ) {
    codeArr.push('useUserInfoStore')
  }
  if (
    searchConditionItems?.some(e => !!e.apiConfig?.useGlobalApi) ||
    tableColumnItems?.some(
      e => !!e.apiConfig?.useGlobalApi,
    ) /** 搜索条件或表列配置了使用全局接口，需要从全局stroe中获取接口数据 */
  ) {
    codeArr.push('useGlobalApi')
  }
  return codeArr
}

// 生成 @/api/xxx 导入
export function genApiImports(
  tableOperationsNeedApi?: Record<string, any>[],
  tableColumnOperationsNeedApi?: Record<string, any>[],
) {
  const codeArr: string[] = []
  if (tableOperationsNeedApi?.length) {
    for (const item of tableOperationsNeedApi) {
      if (item.apiConfig?.method && item.apiConfig?.url) {
        codeArr.push(item.apiConfig.name || last(item.apiConfig.url.split('/')))
      }
      if (item.echoApiConfig?.method && item.echoApiConfig?.url) {
        codeArr.push(item.echoApiConfig.name || last(item.echoApiConfig.url.split('/')))
      }
    }
  }
  if (tableColumnOperationsNeedApi?.length) {
    for (const item of tableColumnOperationsNeedApi) {
      if (item.apiConfig?.method && item.apiConfig?.url) {
        codeArr.push(item.apiConfig.name || last(item.apiConfig.url.split('/')))
      }
      if (item.echoApiConfig?.method && item.echoApiConfig?.url) {
        codeArr.push(item.echoApiConfig.name || last(item.echoApiConfig.url.split('/')))
      }
    }
  }

  return codeArr
}

// 生成 @vswift/components 组建库类型导入
export function genVswiftComponentsTypeImports(
  findSearch?: Record<string, any>,
  findTable?: Record<string, any>,
) {
  const codeArr: string[] = []
  if (findSearch) {
    codeArr.push('VsSearchProps')
    const searchConditionItems = findSearch?.options?.searchConditionItems ?? []
    if (searchConditionItems.some(e => e.type === 'Cascader')) {
      codeArr.push('SCascaderProps')
    }
    if (searchConditionItems.some(e => e.type === 'DatePicker')) {
      codeArr.push('SDateProps')
    }
    if (searchConditionItems.some(e => e.type === 'Input')) {
      codeArr.push('SInputProps')
    }
    if (searchConditionItems.some(e => e.type === 'Select')) {
      codeArr.push('SSelectProps')
    }
    if (searchConditionItems.some(e => e.type === 'TimePicker')) {
      codeArr.push('STimeProps')
    }
    if (searchConditionItems.some(e => e.type === 'InputNumber')) {
      codeArr.push('SInputNumberProps')
    }
    if (searchConditionItems.some(e => e.type === 'TreeSelect')) {
      codeArr.push('STreeSelectProps')
    }
  }
  if (findTable) {
    codeArr.push('VsTableInstance', 'VsTableProps')
  }
  return codeArr
}

// 生成 Search 配置
export function genSearchConfig(searchConfig: Record<string, any>) {
  const codeArr: string[] = []
  const { options } = searchConfig
  if (options.labelWidth) {
    codeArr.push(`labelWidth: '${options.labelWidth}px',`)
  }
  codeArr.push('options: [')
  for (const item of options.searchConditionItems) {
    codeArr.push(
      `{ id: ${item.key}, type: ${item.type}, label: ${item.label}, props: { ${transPropsForSearch(item).join('')} } as S${pascal(item.type)}Props }`,
    )
  }
  codeArr.push(']')
  return codeArr
}

// 生成 Table 配置
export function genTableConfig(tableConfig: Record<string, any>) {
  const codeArr: string[] = []
  codeArr.push('loading: false,')
  const { options } = tableConfig
  if (options.showPagination) {
    codeArr.push('total: 0,')
  }
  if (options.showSelection) {
    codeArr.push('showSelection: true,')
  }
  if (options.operateColumnWidth) {
    codeArr.push(`operateColumnWidth: ${options.operateColumnWidth}px`)
  }
  codeArr.push('data: [],')

  if (options.tableOperations?.length) {
    codeArr.push('operateOptions: [')
    for (const item of options.tableOperations) {
      codeArr.push(
        `{
            label: ${item.label},
            value: ${item.value},
            ${item.code ? `code: ${item.code},` : ''}
            ${item.type ? `type: ${item.type},` : ''}
            show: (code) => permissionCodes.value.includes(code!)
          }`,
      )
    }
    codeArr.push('],')
  }

  if (options.tableColumnItems?.length) {
    transColumnsForTable(options.tableColumnItems)
  }

  if (options.tableColumnOperations?.length) {
    codeArr.push('rowOperateOptions: [')
    for (const item of options.tableColumnOperations) {
      codeArr.push(
        `{
            label: ${item.label},
            value: ${item.value},
            ${item.code ? `code: ${item.code},` : ''}
            ${item.type ? `type: ${item.type},` : ''}
            ${typeof item.showPopconfirm === 'boolean' ? `showPopconfirm: ${item.showPopconfirm}` : ''}
            show: (code) => permissionCodes.value.includes(code!)
          }`,
      )
    }
    codeArr.push('],')
  }
  return codeArr
}

// 生成 Table 模板
export function genTableTemplate(tableColumnItems: Record<string, any>[]) {
  const codeArr: string[] = []
  for (const tableColumnItem of tableColumnItems) {
    const {
      prop,
      formatterType,
      staticDataKey,
      isTreeData,
      apiConfig = {},
      format,
    } = tableColumnItem
    if (formatterType === 'static_data_transform') {
      codeArr.push(
        `
        <template #${prop}="{ row }">
          {{ getLabelByValue(row.${prop}, ${staticDataKey}) }}
        </template>
        `,
      )
    } else if (formatterType === 'dynamic_data_transform') {
      const { useGlobalApi, name } = apiConfig
      const optionsDataVarName = useGlobalApi
        ? `${useGlobalApi.replace(/^get/, '')}`
        : `${name.replace(/^get/, '')}`
      if (isTreeData) {
        codeArr.push(
          `
          <template #${prop}="{ row }">
            {{
              findArraryValueFromTreeData(row.${prop}, ${optionsDataVarName}, {
                returnType: 'labels'
              })?.join('/')
            }}
          </template>
          `,
        )
      } else {
        codeArr.push(
          `
          <template #${prop}="{ row }">
            {{
              getLabelByValue(row.${prop}, ${optionsDataVarName}, {
                returnType: 'labels'
              })?.join('/')
            }}
          </template>
          `,
        )
      }
    } else if (formatterType === 'date_format') {
      codeArr.push(
        `
        <template #${prop}="{ row }">
          {{ format(row.${prop}, ${format}) }}
        </template>
        `,
      )
    }
  }
  return codeArr
}

// 生成 date-fns 导入
export function genDateFnsImports(tableColumnItems: Record<string, any>[]) {
  const codeArr: string[] = []
  if (tableColumnItems.some(e => e.formatterType === 'date_format')) {
    codeArr.push('format')
  }
  return codeArr
}

// 生成异步组件定义
export function genAsyncComponentConst(
  tableOperationsHasForm?: Record<string, any>[],
  tableColumnItemsHasForm?: Record<string, any>[],
) {
  const codeArr: string[] = []
  if (tableOperationsHasForm?.length) {
    codeArr.push(...tableOperationsHasForm.map(e => `table-${dash(e.value)}`))
  }

  if (tableColumnItemsHasForm?.length) {
    codeArr.push(...tableColumnItemsHasForm.map(e => `row-${dash(e.value)}`))
  }
  return codeArr
}

// 生成 useXxxStore 定义
export function genUseStoreConst(
  searchConditionItemsNeedStore?: Record<string, any>[],
  tableColumnItemsNeedStore?: Record<string, any>[],
) {
  const codeArr: string[] = []
  if (searchConditionItemsNeedStore?.length) {
    codeArr.push(
      ...searchConditionItemsNeedStore.map(
        e => e.apiConfig.name || last(e.apiConfig.url.split('/')),
      ),
    )
  }

  if (tableColumnItemsNeedStore?.length) {
    codeArr.push(
      ...tableColumnItemsNeedStore.map(e => e.apiConfig.name || last(e.apiConfig.url.split('/'))),
    )
  }
  return codeArr.map(e => `${camel(e)}`)
}

function transPropsForSearch(item: Record<string, any>) {
  const codeArr: string[] = []
  if (item.placeholder) {
    codeArr.push(`placeholder: ${item.placeholder},`)
  }
  switch (item.type) {
    case 'Select': {
      if (item.itemLabel) {
        codeArr.push(`itemLabel: ${item.itemLabel},`)
      }
      if (item.itemValue) {
        codeArr.push(`itemValue: ${item.itemValue},`)
      }
      if (typeof item.multiple === 'boolean') {
        codeArr.push(`multiple: ${item.multiple},`)
      }
      if (item.optionDataType === 'static_data' /** 静态数据 */) {
        codeArr.push(`options: ${item.staticDataKey},`)
      } else if (item.optionDataType === 'definition' /** 定义 */) {
        if (item.dataSource === 'api' /** 接口定义 */) {
          codeArr.push(`options: async () => await get${pascal(item.key)}Data()`)
        } else if (item.dataSource === 'custom' /** 自定义 */) {
          codeArr.push(`options: [`)
          for (const optionItem of item.options) {
            codeArr.push(
              `{ label: ${optionItem.label}, value: ${optionItem.valueType === 'number' ? +optionItem.value : optionItem.value} }`,
            )
          }
          codeArr.push(`]`)
        }
      }
      break
    }
    case 'Cascader': {
      if (item.itemLabel) {
        codeArr.push(`label: ${item.itemLabel},`)
      }
      if (item.itemValue) {
        codeArr.push(`value: ${item.itemValue},`)
      }
      if (item.itemChildren) {
        codeArr.push(`children: ${item.itemChildren},`)
      }
      if (typeof item.multiple === 'boolean') {
        codeArr.push(`multiple: ${item.multiple},`)
      }
      if (item.optionDataType === 'static_data' /** 静态数据 */) {
        codeArr.push(`options: ${item.staticDataKey},`)
      } else if (item.optionDataType === 'definition' /** 定义 */) {
        if (item.dataSource === 'api' /** 接口定义 */) {
          codeArr.push(`options: async () => await get${pascal(item.key)}Data()`)
        } else if (item.dataSource === 'custom' /** 自定义 */) {
          codeArr.push(`options: [`)
          for (const optionItem of item.options) {
            codeArr.push(
              `{ label: ${optionItem.label}, value: ${optionItem.valueType === 'number' ? +optionItem.value : optionItem.value} }`,
            )
          }
          codeArr.push(`]`)
        }
      }
      break
    }
  }
  return codeArr
}

function transColumnsForTable(items: Record<string, any>[]) {
  const looper = (data: Record<string, any>[]) => {
    const codeArr: string[] = []
    codeArr.push('columns: [')
    for (const item of data) {
      codeArr.push(
        `{
          label: ${item.label},
          prop: ${item.prop},
          ${item.width ? `width: ${item.width},` : ''}
          ${item.tableColumnItems?.length ? `${looper(item.tableColumnItems).join('\n')},` : ''}
        }`,
      )
    }
    codeArr.push('],')
    return codeArr
  }
  return looper(items)
}

export function resolveImport(importCode: string) {
  const arr = importCode.split(' ').filter(e => e !== ' ' && e !== ',' /** 去空格和逗号 */)
  if (arr.length < 4) {
    consola.error(`"${importCode}" is invalid`)
    return
  }
  const leftBracketIndex = arr.indexOf('{')
  const rightBracketIndex = arr.indexOf('}', leftBracketIndex)
  if (arr[1] === 'type' /** 导入的全部为类型 */) {
    return {
      typeImports: arr.slice(leftBracketIndex + 1, rightBracketIndex),
      modleImports: [],
    }
  } else if (arr.includes('type') /** 有类型导入 */) {
    const imports = arr.slice(leftBracketIndex + 1, rightBracketIndex)
    return {
      typeImports: imports.map((e, i, a) => (e === 'type' ? a[i + 1] : null)).filter(e => !!e),
      modleImports: imports.map((e, i, a) => (e === 'type' && a[i + 2] !== 'type' ? a[i + 2] : e)),
    }
  } else {
    return {
      typeImports: [],
      modleImports: arr.slice(leftBracketIndex + 1, rightBracketIndex),
    }
  }
}

export function resolveDestructuringVar(varCode: string) {
  const arr = varCode.split(' ').filter(e => e !== ' ' && e !== ',' /** 去空格和逗号 */)
  if (arr.length < 5) {
    consola.error(`"${varCode}" is invalid`)
    return
  }
  const leftBracketIndex = arr.indexOf('{')
  const rightBracketIndex = arr.indexOf('}', leftBracketIndex)
  return arr.slice(leftBracketIndex + 1, rightBracketIndex)
}
