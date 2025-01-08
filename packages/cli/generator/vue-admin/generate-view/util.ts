import { camel, dash, last, pascal, title } from 'radash'
import {
  storeCodeSnippets,
  addImportCode,
  storeCodeSnippetOfDestructuringVar,
  genSpace,
} from '../../util.js'
import type {
  ApiConfigModel,
  MergeDesignData,
  OptionsConfigItem,
  SearchConditionItem,
  SearchDesignData,
  TableColumnItem,
  TableDesignData,
  TableDesignDataOptions,
  TableOperationsItem,
  ViewDesignDataOptions,
} from 'visual-development'

// 解析视图view对象结构
export async function resolveViewObject(
  options: ViewDesignDataOptions,
  components: MergeDesignData[],
) {
  const viewObject: Record<string, any> = {}
  const { name, saticDataConfig } = options
  if (!name) return
  const nameArr = name.split('/').filter(e => !!e)
  viewObject.base = `/views${name.startsWith('/') ? name : `/${name}`}`
  viewObject[`/${pascal(last(nameArr)!)}.vue`] = genViewComponentCode(options, components)

  if (saticDataConfig?.length) {
    viewObject['/constants.ts'] = genConstantsCode(options)
  }
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  if (findTable) {
    viewObject['/utils.ts'] = genUtilsCode()
    viewObject['/components'] = {}
    if (
      getTableOperationsHasForm(findTable)?.length ||
      getTableColumnOperationsHasForm(findTable)?.length
    ) {
      viewObject['/components']['/index.ts'] = genIndexOfComponents(components)
    }
    for (const item of getTableOperationsHasForm(findTable)) {
      const dashName = `table-${item.value}`
      viewObject['/components'][`/${dashName}`] = {}
      viewObject['/components'][`/${dashName}`]['/index.ts'] = genIndexOfComponent(dashName)
      viewObject['/components'][`/${dashName}`][`/${pascal(dashName)}.vue`] =
        genTableOperationComponentCode(options, item, components)
      if (item.formConfig) {
        viewObject['/components'][`/${dashName}`]['/components'] = {}
        viewObject['/components'][`/${dashName}`]['/components']['/index.ts'] =
          `export * from './form-detail'`
        viewObject['/components'][`/${dashName}`]['/components']['/form-detail'] = {
          '/index.ts': `import FormDetail from './FormDetail.vue'\n
                        export type FormDetailInstance = InstanceType<typeof FormDetail>
                        export { FormDetail }
                        `,
          '/FormDetail.vue': genFormDetailComponentCode(options, item, components),
        }
      }
    }
    for (const item of getTableColumnOperationsHasForm(findTable)) {
      const dashName = `row-${item.value}`
      viewObject['/components'][`/${dashName}`] = {}
      viewObject['/components'][`/${dashName}`]['/index.ts'] = genIndexOfComponent(dashName)
      viewObject['/components'][`/${dashName}`][`/${pascal(dashName)}.vue`] =
        genTableItemOperationComponentCode(options, item)
      if (item.formConfig) {
        viewObject['/components'][`/${dashName}`]['/components'] = {}
        viewObject['/components'][`/${dashName}`]['/components']['/index.ts'] =
          `export * from './form-detail'`
        viewObject['/components'][`/${dashName}`]['/components']['/form-detail'] = {
          '/index.ts': `import FormDetail from './FormDetail.vue'\n
                        export type FormDetailInstance = InstanceType<typeof FormDetail>
                        export { FormDetail }
                        `,
          '/FormDetail.vue': genFormDetailComponentCode(options, item, components),
        }
      }
    }
  }
  return viewObject
}

// 解析视图api对象结构
export async function resolveApiObjectOfView(
  options: ViewDesignDataOptions,
  components: MergeDesignData[],
) {
  const apiObject: Record<string, any> = {}
  const { name } = options
  if (!name) return
  const nameArr = name.split('/').filter(e => !!e)
  apiObject.base = `/api${nameArr.length > 1 ? `/${nameArr.slice(0, nameArr.length - 1).join('/')}` : ''}`
  apiObject[`/${dash(last(nameArr)!)}.ts`] = genApiCodeOfView(components)
  return apiObject
}

// 解析视图store对象结构
export async function resolveStoreObjectOfView(
  options: ViewDesignDataOptions,
  components: MergeDesignData[],
) {
  const storeObject: Record<string, any> = {}
  const { name } = options
  if (!name) return
  const nameArr = name.split('/').filter(e => !!e)
  storeObject.base = `/stores${nameArr.length > 1 ? `/${nameArr.slice(0, nameArr.length - 1).join('/')}` : ''}`
  storeObject[`/${dash(last(nameArr)!)}.ts`] = genStoreCodeOfView(options, components)
  return storeObject
}

// 生成视图组件代码
function genViewComponentCode(options: ViewDesignDataOptions, components: MergeDesignData[]) {
  // 提取数据
  const { name = '' } = options
  const nameArr = name.split('/').filter(e => !!e)
  const findSearch = components.find(e => e.type === 'Search') as SearchDesignData | undefined
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  const asyncComponentConstants = genAsyncComponentConst(
    getTableOperationsHasForm(findTable),
    getTableColumnOperationsHasForm(findTable),
  )

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 基本变量定义
  const varCodeArr: string[] = []
  // 存储params定义代码
  const paramsCodeArr: string[] = []
  // 函数变量定义
  const funcCodeArr: string[] = []
  // 存储onOperate代码
  const onOperateCodeArr: string[] = []
  // 存储onMounted代码
  const onMountedCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []

  /** import start */
  addImportCode(
    'module',
    genStoresGlobalImports(
      findTable,
      getSearchConditionItems(findSearch),
      getTableColumnItems(findTable),
      getTableOperationsHasPermissionCode(findTable),
      getTableColumnOperationsHasPermissionCode(findTable),
    ),
    '@/stores/global',
    importCodeArr,
  )
  addImportCode(
    'module',
    genApiImports(
      findTable?.options ?? {},
      getTableOperationsNeedApi(findTable),
      getTableColumnOperationsNeedApi(findTable),
    ),
    `@/api${name.startsWith('/') ? name : `/${name}`}`,
    importCodeArr,
  )
  addImportCode(
    'module',
    [`use${pascal(last(nameArr)!)}Store`],
    `@/stores${`/${nameArr.join('/')}`}`,
    importCodeArr,
  )
  if (findSearch || findTable /** 有搜索或表格，需导入vs-search, vs-table组件的相关类型 */) {
    addImportCode(
      'type',
      genVswiftComponentsTypeImports(findSearch, findTable),
      '@/components',
      importCodeArr,
    )
  }

  if (findSearch /** 有搜索 */) {
    if (getStaticDataKeyArrInSearch(findSearch).length /**搜索中配置了静态数据key */) {
      addImportCode('module', getStaticDataKeyArrInSearch(findSearch), './constants', importCodeArr)
    }
  }
  if (findTable /**有表格 */) {
    if (
      getTableColumnItems(findTable)?.some(
        e => e.formatterType === 'date_format',
      ) /**表格列有日期格式化 */
    ) {
      addImportCode('module', ['format'], 'date-fns', importCodeArr)
    }
    if (
      getTableColumnItems(findTable)?.some(
        e => e.formatterType === 'dynamic_data_transform' && e.isTreeData,
      ) /** 表格列有动态数据转换且是树形数据 */
    ) {
      addImportCode('module', ['findArraryValueFromTreeData'], '@/utils', importCodeArr)
    }
    if (
      getTableColumnItems(findTable)?.some(
        e => e.formatterType === 'dynamic_data_transform' && !e.isTreeData,
      ) ||
      getTableColumnItems(findTable)?.some(
        e => e.formatterType === 'static_data_transform' && !!e.staticDataKey,
      ) /**表格列有动态数据转换且不是树形数据或表格列有静态数据转换且有静态数据key */
    ) {
      addImportCode('module', ['getLabelByValue'], '@/utils', importCodeArr)
    }
    if (getStaticDataKeyArrInTable(findTable).length /** 表格中配置了静态数据key */) {
      addImportCode('module', getStaticDataKeyArrInTable(findTable), './constants', importCodeArr)
    }
    if (asyncComponentConstants.length /** 有异步组件，导入异步组件实例类型 */) {
      addImportCode(
        'type',
        asyncComponentConstants.map(e => `${pascal(e)}Instance`),
        './components',
        importCodeArr,
      )
    }
  }
  /** import end */

  /** useAppSettingStore start  */
  if (findTable?.options?.showPagination /**有分页 */) {
    storeCodeSnippets(['// 应用设置store'], varCodeArr)
    storeCodeSnippetOfDestructuringVar('getPageSize', 'useAppSettingStore()', varCodeArr)
    storeCodeSnippets([''], varCodeArr)
  }
  /** useAppSettingStore end  */

  /** useUserInfoStore start */
  if (
    getTableOperationsHasPermissionCode(findTable)?.length ||
    getTableColumnOperationsHasPermissionCode(findTable)?.length /** 有 useUserInfoStore 定义 */
  ) {
    storeCodeSnippets(['// 用户信息store'], varCodeArr)
    storeCodeSnippetOfDestructuringVar(
      'permissionCodes',
      'storeToRefs(useUserInfoStore())',
      varCodeArr,
    )
    storeCodeSnippets([''], varCodeArr)
  }
  /** useUserInfoStore end */

  /** useViewStore start */
  const useStoreConst = Array.from(
    new Set(
      genUseStoreConst(
        getSearchConditionItemsNeedStore(findSearch),
        getTableColumnItemsNeedStore(findTable),
      ),
    ),
  )
  if (useStoreConst.length) {
    storeCodeSnippets(['// 视图store'], varCodeArr)
    for (const item of useStoreConst) {
      storeCodeSnippetOfDestructuringVar(
        `get${item}Data`,
        `use${pascal(last(nameArr)!)}Store()`,
        varCodeArr,
      )
      storeCodeSnippetOfDestructuringVar(
        `${camel(item)}Data`,
        `storeToRefs(use${pascal(last(nameArr)!)}Store())`,
        varCodeArr,
      )
    }
    storeCodeSnippets([''], varCodeArr)
  }
  /** useViewStore end */

  /** defineAsyncComponent start */
  if (asyncComponentConstants.length /** 有异步组件，异步组件定义在最上面 */) {
    storeCodeSnippets(
      [
        '// 异步组件及其实例定义',
        ...asyncComponentConstants.map(
          e =>
            `const ${pascal(e)} = defineAsyncComponent(() => import('./components/${e}/${pascal(e)}.vue'))`,
        ),
        ...asyncComponentConstants.map(e => `const ${pascal(e)}Ref = ref<${pascal(e)}Instance>()`),
        '',
      ],
      varCodeArr,
    )
  }
  /** defineAsyncComponent end */

  /** search start */
  if (findSearch /**有搜索 */) {
    storeCodeSnippets(
      [
        '// 搜索定义',
        `const search = ref<VsSearchProps>({`,
        ...genSearchConfig(findSearch),
        `})`,
        '',
      ],
      varCodeArr,
    )
  }
  /** search end */

  /** table start */
  if (findTable /**有表格 */) {
    storeCodeSnippets(
      [
        '// 表格定义',
        'const TableRef = ref<VsTableInstance>()',
        `const table = ref<Partial<VsTableProps>>({`,
        ...genTableConfig(findTable),
        `})`,
        '',
      ],
      varCodeArr,
    )
  }
  /** table end */

  /** params start */
  if (findTable?.options?.showPagination /**有分页 */) {
    storeCodeSnippets(
      [`${genSpace(2)}pageIndex: 1,`, `${genSpace(2)}pageSize: getPageSize(),`],
      paramsCodeArr,
    )
  }
  /** params end */

  /** getTableList start */
  if (findTable /**有表格 */) {
    const { apiConfig = {} } = findTable.options
    storeCodeSnippets(
      [
        '// 获取列表数据',
        `const getTableList = async () => {`,
        `${genSpace(2)}table.value.loading = true`,
        `${genSpace(2)}const res = await ${apiConfig.name}(params.value)`,
        `${genSpace(2)}table.value.loading = false`,
      ],
      funcCodeArr,
    )
    if (findTable.options.showPagination) {
      storeCodeSnippets([`${genSpace(2)}table.value.total = res?.total ?? 0`], funcCodeArr)
    }
    storeCodeSnippets([`${genSpace(2)}table.value.data = res?.list ?? []`, `}`, ''], funcCodeArr)
  }
  /** getTableList end */

  /** onInquire start */
  storeCodeSnippets(
    [
      '// 搜索',
      `const onInquire = (val: Record<string, any>) => {`,
      `${genSpace(2)}params.value = { ...params.value, ...val, ${findTable?.options.showPagination ? 'pageIndex: 1' : ''} }`,
      `${genSpace(2)}getTableList()`,
      `}`,
      '',
    ],
    funcCodeArr,
  )
  /** onInquire end */

  /** onReset start */
  storeCodeSnippets(
    [
      '// 重置',
      `const onReset = () => {`,
      `${genSpace(2)}params.value = { ${findTable?.options.showPagination ? 'pageIndex: 1, pageSize: getPageSize()' : ''} }`,
      `${genSpace(2)}getTableList()`,
      `}`,
      '',
    ],
    funcCodeArr,
  )
  /** onReset end */

  /** onPagingChange start */
  if (findTable?.options.showPagination) {
    storeCodeSnippets(
      [
        '// 分页改变',
        `const onPagingChange = (val: PagingParams) => {`,
        `${genSpace(2)}params.value.pageIndex = val.pageIndex`,
        `${genSpace(2)}params.value.pageSize = val.pageSize`,
        `${genSpace(2)}getTableList()`,
        `}`,
        '',
      ],
      funcCodeArr,
    )
  }
  /** onPagingChange end */

  /** onOperate start */
  for (const item of getTableOperations(findTable) /** 表格操作 */) {
    if (item.enableConfirmation /** 需二次确认，可选多行 */) {
      // 只取第一组参数，取 param.key 为入参，取 param.value 为取行数据的的字段
      const [param] = item.apiConfig?.params ?? []
      storeCodeSnippets(
        [
          `${genSpace(4)}case '${item.value}': {`,
          `${genSpace(6)}const selected = TableRef.value?.getSelectionRows()`,
          `${genSpace(6)}if (!selected?.length) {`,
          `${genSpace(8)}ElMessage.error('请选择要${item.label}的项')`,
          `${genSpace(8)}return`,
          `${genSpace(6)}}`,
          `${genSpace(6)}await ElMessageBox.confirm('确定${item.label}吗？', '提示', { type: 'warning' })`,
          `${genSpace(6)}const ${param.key} = selected.map((e) => e.${param.value})`,
          `${genSpace(6)}if (await ${item.apiConfig?.name}({ ${param.key} })) {`,
          `${genSpace(8)}ElMessage.success('${item.label}成功')`,
          `${genSpace(8)}getTableList()`,
          `${genSpace(6)}}`,
          `${genSpace(4)}}`,
        ],
        onOperateCodeArr,
      )
    } else if (item.formConfig /** 有表单配置 */) {
      storeCodeSnippets(
        [
          `${genSpace(4)}case '${item.value}': {`,
          `${genSpace(6)}Table${pascal(item.value!)}Ref.value?.open()`,
          `${genSpace(6)}break`,
          `${genSpace(4)}}`,
        ],
        onOperateCodeArr,
      )
    }
  }
  for (const item of getTableColumnOperations(findTable) /** 表列操作 */) {
    if (item.formConfig && Object.keys(item.formConfig).length /** 有表单配置 */) {
      storeCodeSnippets(
        [
          `${genSpace(4)}case '${item.value}': {`,
          `${genSpace(6)}Row${pascal(item.value!)}Ref.value?.open(val)`,
          `${genSpace(6)}break`,
          `${genSpace(4)}}`,
        ],
        onOperateCodeArr,
      )
    } else {
      const transParams = (arr: Record<string, any>[]) => {
        return arr
          .map(e => e.key)
          .map(e => `${e}: val!.${e}`)
          .join(',')
      }
      storeCodeSnippets(
        [
          `${genSpace(4)}case '${item.value}': {`,
          `${genSpace(6)}if (await ${item.apiConfig?.name}({${transParams(item.apiConfig?.params ?? [])}})) {`,
          `${genSpace(8)}ElMessage.success('${item.label}成功')`,
          `${genSpace(8)}getTableList()`,
          `${genSpace(6)}}`,
          `${genSpace(6)}break`,
          `${genSpace(4)}}`,
        ],
        onOperateCodeArr,
      )
    }
  }
  /** onOperate end */

  /** onMounted start */
  if (findTable /**有表格 */) {
    storeCodeSnippets([`${genSpace(2)}getTableList()`], onMountedCodeArr)
  }
  if (getTableColumnItemsNeedStore(findTable)?.length) {
    for (const item of getTableColumnItemsNeedStore(findTable)) {
      const apiName = item.apiConfig?.name
      if (
        !getSearchConditionItemsNeedStore(findSearch)?.some(
          e => e.apiConfig?.name === apiName,
        ) /** 规避接口重复调用 */
      ) {
        storeCodeSnippets(
          [`${genSpace(2)}get${item.apiConfig?.name?.replace(/^query/, '')}Data()`],
          onMountedCodeArr,
        )
      }
    }
  }
  /** onMounted end */

  /** template start */
  if (findSearch /** 有搜索 */) {
    storeCodeSnippets(
      [`${genSpace(4)}<VsSearch v-bind="search" @inquire="onInquire" @reset="onReset"></VsSearch>`],
      templateCodeArr,
    )
  }
  if (findTable /**有表格 */) {
    storeCodeSnippets(
      [
        `${genSpace(4)}<VsTable ref="TableRef" v-bind="table" ${findTable?.options?.showPagination ? 'v-model:page-size="params.pageSize" v-model:current-page="params.pageIndex" @paging-change="onPagingChange"' : ''} @operate="onOperate">`,
        ...genTableTemplate(getTableColumnItems(findTable) ?? []),
        `${genSpace(4)}</VsTable>`,
      ],
      templateCodeArr,
    )
  }
  if (asyncComponentConstants.length /** 有异步组件 */) {
    storeCodeSnippets(
      [
        '',
        ...asyncComponentConstants.map(
          e => `<${pascal(e)} ref="${pascal(e)}Ref" @succeed="getTableList" />`,
        ),
        '',
      ],
      templateCodeArr,
    )
  }
  /** template end */

  const _scriptCodeArr = [
    `<script setup lang="ts">`,
    ...importCodeArr,
    '',
    ...varCodeArr,
    ...[
      '// 参数定义',
      `const params = ref<${findTable?.options.showPagination ? 'PagingParams' : 'Record<string, any>'}>({`,
      ...paramsCodeArr,
      `})`,
    ],
    '',
    ...funcCodeArr,
    ...[
      '// 操作',
      `const onOperate = async (key: string, val?: any) => {`,
      `${genSpace(2)}switch (key) {`,
      ...onOperateCodeArr,
      `${genSpace(2)}}`,
      `}`,
    ],
    '',
    ...['// 组件挂载完成', `onMounted(() => {`, ...onMountedCodeArr, `})`],
    `</script>`,
  ]

  const _templateCodeArr = [
    `<template>`,
    `${genSpace(2)}<ViewWrapper>`,
    ...templateCodeArr,
    `${genSpace(2)}</ViewWrapper>`,
    `</template>`,
  ]
  return [..._scriptCodeArr, '', ..._templateCodeArr].join('\n')
}

// 生成constants.ts代码
function genConstantsCode(options: ViewDesignDataOptions) {
  const { saticDataConfig = [] } = options
  const genValueOptionsCode = (data: OptionsConfigItem[]) => {
    return data
      .map(
        e =>
          `{ label: '${e.label}', value: ${e.valueType === 'number' ? +e.value : `'${e.value}'`} }`,
      )
      .join(',')
  }
  return `${saticDataConfig.map(e => `export const ${e.key} = [${genValueOptionsCode(e.value ?? [])}]`).join('\n')}`
}

// 生成utils.ts代码
function genUtilsCode() {
  return [
    `// 对前端获取的表单数据进行处理`,
    `export function toSubmitData(data: Record<string, any>) {`,
    `${genSpace(2)}const _data: Record<string, any> = JSON.parse(JSON.stringify(data))`,
    `${genSpace(2)}// 数据转换...`,
    `${genSpace(2)}return _data`,
    `}`,
    '',
    `// 对后端返回的数据进行处理`,
    `export function toRenderData(data: Record<string, any>) {`,
    `${genSpace(2)}const _data: Record<string, any> = JSON.parse(JSON.stringify(data))`,
    `${genSpace(2)}// 数据转换...`,
    `${genSpace(2)}return _data`,
    `}`,
  ].join('\n')
}

// 生成多个组件的导出文件代码 components/index.ts
function genIndexOfComponents(components: MergeDesignData[]) {
  const codeArr: string[] = []
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  const tableOperations = findTable?.options?.tableOperations
  const tableColumnOperations = findTable?.options?.tableColumnOperations
  const tableOperationsHasForm =
    tableOperations?.filter(
      e => !e.enableConfirmation && (e.formConfig?.useOtherForm || !!e.formConfig),
    ) ?? []
  const tableColumnOperationsHasForm =
    tableColumnOperations?.filter(
      e => !e.enableConfirmation && (e.formConfig?.useOtherForm || !!e.formConfig),
    ) ?? []
  for (const item of tableOperationsHasForm) {
    codeArr.push(`export * from './table-${item.value}'`)
  }
  for (const item of tableColumnOperationsHasForm) {
    codeArr.push(`export * from './row-${item.value}'`)
  }
  return `${codeArr.join('\n')}`
}

// 生成单个组件的导出文件代码 table-add/index.ts
function genIndexOfComponent(name: string) {
  return [
    `import ${pascal(name)} from './${pascal(name)}.vue'`,
    '',
    `export type ${pascal(name)}Instance = InstanceType<typeof ${pascal(name)}>`,
    `export { ${pascal(name)} }`,
  ].join('\n')
}

// 生成表格操作组件代码
function genTableOperationComponentCode(
  options: ViewDesignDataOptions,
  operationItem: TableOperationsItem,
  components: MergeDesignData[],
) {
  // 提取数据
  const { name = '' } = options
  const { apiConfig = {}, label } = operationItem
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const storeName = `use${pascal(last(name.split('/'))!)}Store`
  const findSearch = components.find(e => e.type === 'Search') as SearchDesignData | undefined
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  const widgetListNeedDefineApi = getWidgetListNeedDefineApi(findSearch, findTable)

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 存储emit代码
  const emitCodeArr: string[] = []
  // 存储组件定义代码
  const definitionCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []

  /** import start */
  const genImportApiNames = () => {
    const codeArr: string[] = []
    if (apiConfig.name) codeArr.push(apiConfig.name)
    for (const widget of widgetListNeedDefineApi) {
      const apiName = `query${transIdToPascal(widget.idAlias)}List`
      codeArr.push(apiName)
    }
    return codeArr
  }
  storeCodeSnippets(
    [
      "import { sleep } from 'radash'",
      `import { ${genImportApiNames().join(',')} } from '@/api${base}'`,
    ],
    importCodeArr,
  )
  if (widgetListNeedDefineApi.length) {
    storeCodeSnippets([`import { ${storeName} } from '@/stores${base}'`], importCodeArr)
  }
  storeCodeSnippets(
    [
      "import type { FormDetailInstance } from './components'",
      "import { toSubmitData } from '../../utils'",
    ],
    importCodeArr,
  )
  /** import end */

  /** defineEmits start */
  storeCodeSnippets(
    [
      '// 自定义事件',
      'const emit = defineEmits<{',
      `${genSpace(2)}(e: 'succeed'): void`,
      '}>()',
      '',
    ],
    emitCodeArr,
  )
  /** defineEmits end */

  /** const start */
  if (widgetListNeedDefineApi.length) {
    storeCodeSnippets(['// 视图store'], definitionCodeArr)
    for (const widget of widgetListNeedDefineApi) {
      const apiName = `query${transIdToPascal(widget.idAlias)}List`
      const setName = `set${apiName.replace(/^query/, '')}Data`
      storeCodeSnippetOfDestructuringVar(setName, `${storeName}()`, definitionCodeArr)
    }
    storeCodeSnippets([''], definitionCodeArr)
  }
  storeCodeSnippets(
    [
      ...[
        '// 异步组件及其实例定义',
        `const FormDetail = defineAsyncComponent(() => import('./components/form-detail/FormDetail.vue'))`,
        'const FormDetailRef = ref<FormDetailInstance>()',
      ],
      '',
      ...[
        '// 变量定义',
        'const show = ref(false)',
        'const genInitFormData = () => ({})',
        'const form = ref<Record<string, any>>(genInitFormData())',
        'const loading = ref(false)',
      ],
      '',
      ...[
        '// 确认',
        `const onConfirm = async () => {`,
        `${genSpace(2)}const valid = await FormDetailRef.value?.validate()`,
        `${genSpace(2)}if (!valid) return`,
        `${genSpace(2)}loading.value = true`,
        `${genSpace(2)}if (await ${apiConfig.name}(toSubmitData(form.value))) {`,
        `${genSpace(4)}ElMessage.success('${label}成功')`,
        `${genSpace(4)}emit('succeed')`,
        `${genSpace(2)}}`,
        `${genSpace(2)}loading.value = false`,
        `${genSpace(2)}show.value = false`,
        `}`,
      ],
      '',
      ...[
        '// 关闭弹框',
        `const onClose = async () => {`,
        `${genSpace(2)}form.value = genInitFormData()`,
        `${genSpace(2)}await sleep(50)`,
        `${genSpace(2)}FormDetailRef.value?.clearValidate()`,
        `}`,
      ],
      '',
    ],
    definitionCodeArr,
  )

  /** const open start */
  storeCodeSnippets(
    ['// 以下defineExpose', `const open = () => {`, `${genSpace(2)}show.value = true`],
    definitionCodeArr,
  )
  for (const widget of widgetListNeedDefineApi) {
    const apiName = `query${transIdToPascal(widget.idAlias)}List`
    const setName = `set${apiName.replace(/^query/, '')}Data`
    storeCodeSnippets([`${apiName}().then(res => ${setName}(res))`, ''], definitionCodeArr)
  }
  storeCodeSnippets(['}', ''], definitionCodeArr)
  /** const open end */

  storeCodeSnippets([`defineExpose({`, `${genSpace(2)}open`, `})`], definitionCodeArr)
  /** const end */

  /** template start */
  storeCodeSnippets(
    [
      `${genSpace(2)}<el-dialog v-model="show" title="${label}" @close="onClose">`,
      `${genSpace(4)}<FormDetail ref="FormDetailRef" v-model="form" />`,
      `${genSpace(4)}<template #footer>`,
      `${genSpace(6)}<el-button @click="show = false">取消</el-button>`,
      `${genSpace(6)}<el-button type="primary" :loading="loading" @click="onConfirm">确定</el-button>`,
      `${genSpace(4)}</template>`,
      `${genSpace(2)}</el-dialog>`,
    ],
    templateCodeArr,
  )
  /** template end */

  const _scriptCodeArr = [
    `<script setup lang="ts">`,
    ...importCodeArr,
    '',
    ...emitCodeArr,
    '',
    ...definitionCodeArr,
    `</script>`,
  ]
  const _templateCodeArr = [`<template>`, ...templateCodeArr, `</template>`]

  return [..._scriptCodeArr, '', ..._templateCodeArr].join('\n')
}

// 生成表列操作组件代码
function genTableItemOperationComponentCode(
  options: ViewDesignDataOptions,
  operationItem: TableColumnItem,
) {
  // 提取数据
  const { name = '' } = options
  const { apiConfig = {}, label } = operationItem
  const base = `${name.startsWith('/') ? name : `/${name}`}`

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 存储emit代码
  const emitCodeArr: string[] = []
  // 存储组件定义代码
  const definitionCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []

  // 存储代码片段
  storeCodeSnippets(
    [
      "import { sleep } from 'radash'",
      `import { ${apiConfig.name} } from '@/api${base}'`,
      "import type { FormDetailInstance } from './components'",
      "import { toRenderData, toSubmitData } from '../../utils'",
    ],
    importCodeArr,
  )
  storeCodeSnippets(
    ['// 自定义事件', 'const emit = defineEmits<{', `${genSpace(2)}(e: 'succeed'): void`, '}>()'],
    emitCodeArr,
  )
  storeCodeSnippets(
    [
      ...[
        '// 异步组件及其实例定义',
        `const FormDetail = defineAsyncComponent(() => import('./components/form-detail/FormDetail.vue'))`,
        'const FormDetailRef = ref<FormDetailInstance>()',
      ],
      '',
      ...[
        '// 变量定义',
        'const show = ref(false)',
        'const genInitFormData = () => ({})',
        'const form = ref<Record<string, any>>(genInitFormData())',
        'const loading = ref(false)',
      ],
      '',
      ...[
        '// 确认',
        `const onConfirm = async () => {`,
        `${genSpace(2)}const valid = await FormDetailRef.value?.validate()`,
        `${genSpace(2)}if (!valid) return`,
        `${genSpace(2)}loading.value = true`,
        `${genSpace(2)}if (await ${apiConfig.name}(toSubmitData(form.value))) {`,
        `${genSpace(4)}ElMessage.success('${label}成功')`,
        `${genSpace(4)}emit('succeed')`,
        `${genSpace(2)}}`,
        `${genSpace(2)}loading.value = false`,
        `${genSpace(2)}show.value = false`,
        `}`,
      ],
      '',
      ...[
        '// 关闭弹框',
        `const onClose = async () => {`,
        `${genSpace(2)}form.value = genInitFormData()`,
        `${genSpace(2)}await sleep(50)`,
        `${genSpace(2)}FormDetailRef.value?.clearValidate()`,
        `}`,
      ],
      '',
      ...[
        '// 以下defineExpose',
        `const open = (row: Record<string, any>) => {`,
        `${genSpace(2)}show.value = true`,
        `${genSpace(2)}form.value = toRenderData(row)`,
        `}`,
      ],
      '',
      ...[`defineExpose({`, `${genSpace(2)}open`, `})`],
    ],
    definitionCodeArr,
  )
  storeCodeSnippets(
    [
      `${genSpace(2)}<el-dialog v-model="show" title="${label}" @close="onClose">`,
      `${genSpace(4)}<FormDetail ref="FormDetailRef" v-model="form" />`,
      `${genSpace(4)}<template #footer>`,
      `${genSpace(6)}<el-button @click="show = false">取消</el-button>`,
      `${genSpace(6)}<el-button type="primary" :loading="loading" @click="onConfirm">确定</el-button>`,
      `${genSpace(4)}</template>`,
      `${genSpace(2)}</el-dialog>`,
    ],
    templateCodeArr,
  )

  const _scriptCodeArr = [
    `<script setup lang="ts">`,
    ...importCodeArr,
    '',
    ...emitCodeArr,
    '',
    ...definitionCodeArr,
    `</script>`,
  ]
  const _templateCodeArr = [`<template>`, ...templateCodeArr, `</template>`]

  return [..._scriptCodeArr, '', ..._templateCodeArr].join('\n')
}

// 生成表单详情组件代码
function genFormDetailComponentCode(
  options: ViewDesignDataOptions,
  operationItem: TableOperationsItem,
  components: MergeDesignData[],
) {
  // 提取数据
  const { name = '' } = options
  const { formConfig } = operationItem
  const form = formConfig?.data?.form
  const widgetList = formConfig?.data?.widgetList
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const storeName = `use${pascal(last(name.split('/'))!)}Store`
  const findSearch = components.find(e => e.type === 'Search') as SearchDesignData | undefined
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  const widgetListNeedDefineApi = getWidgetListNeedDefineApi(findSearch, findTable)

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 存储组件定义代码
  const definitionCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []

  /** import start */
  storeCodeSnippets(
    [
      `import { ${storeName} } from '@/stores${base}'`,
      "import type { FormInstance } from 'element-plus'",
      '',
    ],
    importCodeArr,
  )
  /** import end */

  /** defineProps start */
  storeCodeSnippets(['defineProps<{', 'disabled?: boolean', '}>()', ''], importCodeArr)
  /** defineProps end */

  /** const start */
  storeCodeSnippets(
    [
      'const formRef = ref<FormInstance>()',
      'const form = defineModel<Record<string, any>>({ default: () => ({}) })',
    ],
    definitionCodeArr,
  )
  if (widgetListNeedDefineApi.length) {
    for (const widget of widgetListNeedDefineApi) {
      const name = `${transIdToCamel(widget.idAlias)}ListData`
      storeCodeSnippetOfDestructuringVar(name, `storeToRefs(${storeName}())`, definitionCodeArr)
    }
    storeCodeSnippets([''], definitionCodeArr)
  }
  storeCodeSnippets(
    [
      ...[
        `// 以下defineExpose`,
        `async function validate() {`,
        `${genSpace(2)}return await formRef.value?.validate()`,
        `}`,
        '',
        `async function clearValidate() {`,
        `${genSpace(2)}formRef.value?.clearValidate()`,
        `}`,
        '',
        `defineExpose({`,
        `${genSpace(2)}validate,`,
        `${genSpace(2)}clearValidate,`,
        `})`,
      ],
    ],
    definitionCodeArr,
  )
  /** const end */

  /** template start */
  // storeCodeSnippets(
  //   [
  //     `${genSpace(2)}<el-form ref="formRef" :model="form" label-position="${form?.labelPosition ?? 'left'}" label-width="${form?.labelWidth ?? 120}px">`,
  //     `${genSpace(4)}<el-form-item label="输入框" prop="input" :rules="[{ required: true, message: '必填项' }]">`,
  //     `${genSpace(6)}<el-input v-model="form.input" placeholder="请输入" />`,
  //     `${genSpace(4)}</el-form-item>`,
  //     `${genSpace(4)}<el-form-item label="数字输入框" prop="input_number" :rules="[{ required: true, message: '必填项' }]">`,
  //     `${genSpace(6)}<el-input-number v-model="form.input_number" placeholder="请输入" :min="0" :max="Number.MAX_SAFE_INTEGER" :step="1" :controls="true" controls-position="right" />`,
  //     `${genSpace(4)}</el-form-item>`,
  //     `${genSpace(4)}<el-form-item label="备注" prop="remark">`,
  //     `${genSpace(6)}<el-input v-model="form.remark" type="textarea" placeholder="请输入" autosize />`,
  //     `${genSpace(4)}</el-form-item>`,
  //     `${genSpace(2)}</el-form>`,
  //   ],
  //   templateCodeArr,
  // )
  const genRulesProp = (widget: Record<string, any>) => {
    const codeArr: string[] = []
    if (widget.options.required) {
      codeArr.push(`{ required: true, message: '必填项' }`)
    }
    if (widget.options.pattern) {
      codeArr.push(
        `{ pattern: new RegExp('${widget.options.pattern}'), message: '${widget.options.patternMessage || '格式不正确'}' }`,
      )
    }
    if (codeArr.length) {
      return `:rules="[${codeArr.join(',')}]"`
    } else return ''
  }
  storeCodeSnippets(
    [
      `${genSpace(2)}<el-form ref="formRef" :model="form" label-position="${form?.labelPosition ?? 'left'}" label-width="${form?.labelWidth ?? 120}px" :disabled>`,
    ],
    templateCodeArr,
  )
  for (const widget of widgetList ?? []) {
    if (widget.type === 'input') {
      storeCodeSnippets(
        [
          `${genSpace(4)}<el-form-item label="${widget.options.label}" prop="${widget.idAlias}" ${genRulesProp(widget)}>`,
          `${genSpace(6)}<el-input v-model="form.${widget.idAlias}" type="${widget.options.type ?? 'text'}" placeholder="请输入" />`,
          `${genSpace(4)}</el-form-item>`,
        ],
        templateCodeArr,
      )
    } else if (widget.type === 'input-number') {
      const genPrecisionProp = (widget: Record<string, any>) => {
        if (typeof widget.options.precision === 'number') {
          return `:precision="${widget.options.precision}"`
        } else return ''
      }
      storeCodeSnippets(
        [
          `${genSpace(4)}<el-form-item label="${widget.options.label}" prop="${widget.idAlias}" ${genRulesProp(widget)}>`,
          `${genSpace(6)}<el-input-number v-model="form.${widget.idAlias}" placeholder="请输入" :min="${widget.options.min ?? 0}" :max="${widget.options.max ?? 'Number.MAX_SAFE_INTEGER'}" ${genPrecisionProp(widget)} />`,
          `${genSpace(4)}</el-form-item>`,
        ],
        templateCodeArr,
      )
    }
  }
  storeCodeSnippets([`${genSpace(2)}</el-form>`], templateCodeArr)
  /** template end */

  const _scriptCodeArr = [
    `<script setup lang="ts">`,
    ...importCodeArr,
    '',
    ...definitionCodeArr,
    `</script>`,
  ]
  const _templateCodeArr = [`<template>`, ...templateCodeArr, `</template>`]

  return [..._scriptCodeArr, '', ..._templateCodeArr].join('\n')
}

// 生成视图api代码
function genApiCodeOfView(components: MergeDesignData[]) {
  const codeArr: string[] = []
  // 提取数据
  const findSearch = components.find(e => e.type === 'Search') as SearchDesignData | undefined
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined

  /** import start */
  codeArr.push(`import { http } from '@/utils/http'`, '')
  /** import end */

  /** export api start */
  const toArg = (e: ApiConfigModel) => `${e.method === 'GET' ? 'params' : 'data'}`
  if (getApiConfigOfTable(findTable)?.name) {
    codeArr.push(
      `export const ${getApiConfigOfTable(findTable)!.name} = async (${toArg(getApiConfigOfTable(findTable)!)}: Record<string, any>) => {`,
      `${genSpace(2)}try {`,
      `${genSpace(4)}const { data: res } = await http({`,
      `${genSpace(6)}method: '${getApiConfigOfTable(findTable)!.method}',`,
      `${genSpace(6)}url: '${getApiConfigOfTable(findTable)!.url}',`,
    )
    codeArr.push(`${genSpace(6)}${toArg(getApiConfigOfTable(findTable)!)}`)
    codeArr.push(
      `${genSpace(4)}})`,
      `${genSpace(4)}return res as Record<string, any>`,
      `${genSpace(2)}} catch (error) {`,
      `${genSpace(4)}console.error('${getApiConfigOfTable(findTable)!.name} ->', error)`,
      `${genSpace(2)}}`,
      `}`,
      '',
    )
  }
  for (const item of [
    ...getApiConfigOfTableOperations(findTable),
    ...getApiConfigOfTableColumnOperations(findTable),
  ]) {
    codeArr.push(
      `export const ${item.name} = async (${toArg(item)}: Record<string, any>) => {`,
      `${genSpace(2)}try {`,
      `${genSpace(4)}await http({`,
      `${genSpace(6)}method: '${item.method}',`,
      `${genSpace(6)}url: '${item.url}',`,
    )
    codeArr.push(`${genSpace(6)}${toArg(item)}`)
    codeArr.push(
      `${genSpace(4)}})`,
      `${genSpace(4)}return true`,
      `${genSpace(2)}} catch (error) {`,
      `${genSpace(4)}console.error('${item.name} ->', error)`,
      `${genSpace(2)}}`,
      `}`,
      '',
    )
  }

  const mergeApiConfigItems = [
    ...getApiConfigOfSearchConditionItems(findSearch),
    ...getApiConfigOfTableColumnItems(findTable),
  ].reduce((acc: ApiConfigModel[], cur) => {
    if (!acc.some(e => e.name === cur.name)) acc.push(cur)
    return acc
  }, [])

  for (const item of mergeApiConfigItems) {
    const args: string[] = item.params?.length
      ? item.params.map(e => `${e.key}: ${e.valueType === 'number' ? +e.value! : e.value}`)
      : []
    codeArr.push(
      `export const ${item.name} = async () => {`,
      `${genSpace(2)}try {`,
      `${genSpace(4)}const { data: res } = await http({`,
      `${genSpace(6)}method: '${item.method}',`,
      `${genSpace(6)}url: '${item.url}',`,
    )
    if (args.length) {
      codeArr.push(`${genSpace(6)}${toArg(item)}: { ${args.join(',')} }`)
    }
    codeArr.push(
      `${genSpace(4)}})`,
      `${genSpace(4)}return res as Record<string, any>[]`,
      `${genSpace(2)}} catch (error) {`,
      `${genSpace(4)}console.error('${item.name} ->', error)`,
      `${genSpace(2)}}`,
      `}`,
      '',
    )
  }

  const widgetList = getWidgetListNeedDefineApi(findSearch, findTable)
  for (const item of widgetList) {
    const apiName = `query${transIdToPascal(item.idAlias)}List`
    codeArr.push(
      `export const ${apiName} = async () => {`,
      `${genSpace(2)}try {`,
      `${genSpace(4)}const { data: res } = await http({`,
      `${genSpace(6)}method: 'GET',`,
      `${genSpace(6)}url: '${item.options.systemApi}',`,
      `${genSpace(4)}})`,
      `${genSpace(4)}return res as Record<string, any>[]`,
      `${genSpace(2)}} catch (error) {`,
      `${genSpace(4)}console.error('${apiName} ->', error)`,
      `${genSpace(2)}}`,
      `}`,
      '',
    )
  }
  /** export api end */

  return codeArr.join('\n')
}

// 生成视图store代码
function genStoreCodeOfView(options: ViewDesignDataOptions, components: MergeDesignData[]) {
  const codeArr: string[] = []
  // 提取数据
  const { name = '' } = options
  const nameArr = name.split('/').filter(e => !!e)
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const findSearch = components.find(e => e.type === 'Search')
  const findTable = components.find(e => e.type === 'Table')

  const mergeApiNames = Array.from(
    new Set([
      ...getApiNamesOfSearchConditionItems(findSearch),
      ...getApiNamesOfTableColumnItems(findTable),
      ...getWidgetListNeedDefineApi(findSearch, findTable).map(
        e => `query${transIdToPascal(e.idAlias)}List`,
      ),
    ]),
  )

  const toApiName = (name: string) => `${name.replace(/^query/, '')}`

  codeArr.push(
    `import { defineStore } from 'pinia'`,
    `import { ${mergeApiNames.map(e => `${e}`).join(',')} } from '@/api${base}'`,
    '',
  )
  codeArr.push(`export const use${pascal(last(nameArr)!)}Store = defineStore('${base}', () => {`)
  codeArr.push(
    ...mergeApiNames.map(
      e => `${genSpace(2)}const ${camel(toApiName(e))}Data = ref<Record<string, any>[]>()`,
    ),
    '',
  )
  for (const item of mergeApiNames) {
    // async function get${capitalize(toName(e))}() {
    //   if (${toName(e)}.value?.length) return ${toName(e)}.value
    //   ${toName(e)}.value = await ${e.name}()
    //   return ${toName(e)}.value
    // }

    // function set${capitalize(toName(e))}(data?: Record<string, any>[]) {
    //   ${toName(e)}.value = data
    // }
    codeArr.push(
      `${genSpace(2)}async function get${toApiName(item)}Data() {`,
      `${genSpace(4)}if (${camel(toApiName(item))}Data.value?.length) return ${camel(toApiName(item))}Data.value`,
      `${genSpace(4)}${camel(toApiName(item))}Data.value = await ${item}()`,
      `${genSpace(4)}return ${camel(toApiName(item))}Data.value`,
      `${genSpace(2)}}`,
      '',
      `${genSpace(2)}function set${toApiName(item)}Data(data?: Record<string, any>[]) {`,
      `${genSpace(4)}${camel(toApiName(item))}Data.value = data`,
      `${genSpace(2)}}`,
      '',
    )
  }
  codeArr.push(
    '',
    `${genSpace(2)}return {`,
    `${genSpace(4)}${mergeApiNames.map(e => `${camel(toApiName(e))}Data, get${toApiName(e)}Data, set${toApiName(e)}Data`).join(',')}`,
    `${genSpace(2)}}`,
  )
  codeArr.push(`})`)

  return codeArr.join('\n')
}

// 生成 @/stores/global 导入
function genStoresGlobalImports(
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
    codeArr.push('useGlobalApiStore')
  }
  return codeArr
}

// 生成 @/api/xxx 导入
function genApiImports(
  tableOptions: TableDesignDataOptions,
  tableOperationsNeedApi: TableOperationsItem[],
  tableColumnOperationsNeedApi: TableOperationsItem[],
) {
  const codeArr: string[] = []
  const { apiConfig } = tableOptions
  if (apiConfig?.name) {
    codeArr.push(apiConfig.name)
  }
  for (const item of tableOperationsNeedApi) {
    if (item.enableConfirmation /** 需二次确认的接口才会在view中调用  */ && item.apiConfig?.name) {
      codeArr.push(item.apiConfig.name)
    }
    if (item.echoApiConfig?.name) {
      codeArr.push(item.echoApiConfig.name!)
    }
  }
  for (const item of tableColumnOperationsNeedApi) {
    if (item.enableConfirmation /** 需二次确认的接口才会在view中调用  */ && item.apiConfig?.name) {
      codeArr.push(item.apiConfig.name)
    }
    if (item.echoApiConfig?.name) {
      codeArr.push(item.echoApiConfig.name)
    }
  }

  return codeArr
}

// 生成 vs-search, vs-table 组件类型导入
function genVswiftComponentsTypeImports(
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
function genSearchConfig(searchConfig: SearchDesignData) {
  const codeArr: string[] = []
  const { options } = searchConfig
  if (options.labelWidth) {
    codeArr.push(`${genSpace(2)}labelWidth: '${options.labelWidth}px',`)
  }
  codeArr.push(`${genSpace(2)}options: [`)
  for (const item of options.searchConditionItems ?? []) {
    // {
    //   id: '${item.key}',
    //   type: '${item.type}',
    //   label: '${item.label}',
    //   props: {
    //     ${transPropsForSearch(item).join('\n')}
    //   } as S${pascal(item.type)}Props
    // }
    codeArr.push(`${genSpace(4)}{`)
    codeArr.push(`${genSpace(6)}id: '${item.key}',`)
    codeArr.push(`${genSpace(6)}type: '${item.type}',`)
    codeArr.push(`${genSpace(6)}label: '${item.label}',`)
    codeArr.push(`${genSpace(6)}props: {`)
    codeArr.push(...transPropsForSearch(item))
    codeArr.push(`${genSpace(6)}} as S${item.type}Props`)
    codeArr.push(`${genSpace(4)}},`)
  }
  codeArr.push(`${genSpace(2)}]`)
  return codeArr
}

// 生成 Table 配置
function genTableConfig(tableConfig: Record<string, any>) {
  const codeArr: string[] = []
  codeArr.push(`${genSpace(2)}loading: false,`)
  const { options } = tableConfig
  if (options.showPagination) {
    codeArr.push(`${genSpace(2)}total: 0,`)
  }
  if (options.showSelection) {
    codeArr.push(`${genSpace(2)}showSelection: true,`)
  }
  if (options.operateColumnWidth) {
    codeArr.push(`${genSpace(2)}operateColumnWidth: '${options.operateColumnWidth}px',`)
  }
  codeArr.push(`${genSpace(2)}data: [],`)
  if (options.tableColumnItems?.length) {
    codeArr.push(...transColumnsForTable(options.tableColumnItems))
  }
  if (options.tableOperations?.length) {
    codeArr.push(`${genSpace(2)}operateOptions: [`)
    for (const item of options.tableOperations) {
      // {
      //   label: '${item.label}',
      //   value: '${item.value}',
      //   code: '${item.code ?? ''}',
      //   type: '${item.type ?? 'primary'}',
      //   show: (code) => permissionCodes.value.includes(code!)
      // }
      codeArr.push(`${genSpace(4)}{`)
      if (item.type) codeArr.push(`${genSpace(6)}type: '${item.type}',`)
      codeArr.push(`${genSpace(6)}label: '${item.label}',`, `${genSpace(6)}value: '${item.value}',`)
      if (item.code) {
        codeArr.push(
          `${genSpace(6)}code: '${item.code}',`,
          `${genSpace(6)}show: (code) => permissionCodes.value.includes(code!)`,
        )
      }
      codeArr.push(`${genSpace(4)}},`)
    }
    codeArr.push(`${genSpace(2)}],`)
  }
  if (options.tableColumnOperations?.length) {
    codeArr.push(`${genSpace(2)}rowOperateOptions: [`)
    for (const item of options.tableColumnOperations) {
      // {
      //   label: '${item.label}',
      //   value: '${item.value}',
      //   code: '${item.code}',
      //   type: '${item.type}',
      //   showPopconfirm: ${item.showPopconfirm ?? false},
      //   show: (code) => permissionCodes.value.includes(code!)
      // }
      codeArr.push(`${genSpace(4)}{`)
      if (item.type) codeArr.push(`${genSpace(8)}type: '${item.type}',`)
      codeArr.push(`${genSpace(6)}label: '${item.label}',`, `${genSpace(6)}value: '${item.value}',`)
      if (item.code) codeArr.push(`${genSpace(6)}code: '${item.code}',`)
      if (typeof item.showPopconfirm === 'boolean')
        codeArr.push(`${genSpace(6)}showPopconfirm: ${item.showPopconfirm},`)
      if (item.code)
        codeArr.push(`${genSpace(6)}show: (code) => permissionCodes.value.includes(code!)`)
      codeArr.push(`${genSpace(4)}},`)
    }
    codeArr.push(`${genSpace(2)}],`)
  }
  return codeArr
}

// 生成 Table 模板
function genTableTemplate(tableColumnItems: TableColumnItem[]) {
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
        `${genSpace(6)}<template #${prop}="{ row }">`,
        `${genSpace(8)}{{getLabelByValue(row.${prop}, ${staticDataKey})}}`,
        `${genSpace(6)}</template>`,
      )
    } else if (formatterType === 'dynamic_data_transform') {
      const { name = '' } = apiConfig
      const optionsDataVarName = `${camel(name.replace(/^query/, ''))}Data`
      if (isTreeData) {
        codeArr.push(
          `${genSpace(6)}<template #${prop}="{ row }">`,
          `${genSpace(8)}{{findArraryValueFromTreeData(row.${prop}, ${optionsDataVarName} ?? [], {returnType: 'labels'})?.join('/')}}`,
          `${genSpace(6)}</template>`,
        )
      } else {
        codeArr.push(
          `${genSpace(6)}<template #${prop}="{ row }">`,
          `${genSpace(8)}{{getLabelByValue(row.${prop}, ${optionsDataVarName} ?? [], {label: 'label'})}}`,
          `${genSpace(6)}</template>`,
        )
      }
    } else if (formatterType === 'date_format') {
      codeArr.push(
        `${genSpace(6)}<template #${prop}="{ row }">`,
        `${genSpace(8)}{{ format(row.${prop}, ${format}) }}`,
        `${genSpace(6)}</template>`,
      )
    }
  }
  return codeArr
}

// 生成异步组件定义
function genAsyncComponentConst(
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

// 生成 useViewStore 定义
function genUseStoreConst(
  searchConditionItemsNeedStore?: Record<string, any>[],
  tableColumnItemsNeedStore?: Record<string, any>[],
) {
  const codeArr: string[] = []
  if (searchConditionItemsNeedStore?.length) {
    codeArr.push(
      ...searchConditionItemsNeedStore.map(e => `${e.apiConfig?.name?.replace(/^query/, '')}`),
    )
  }

  if (tableColumnItemsNeedStore?.length) {
    codeArr.push(
      ...tableColumnItemsNeedStore.map(e => `${e.apiConfig?.name?.replace(/^query/, '')}`),
    )
  }
  return codeArr
}

function transPropsForSearch(item: SearchConditionItem) {
  const codeArr: string[] = []
  if (item.placeholder) {
    codeArr.push(`${genSpace(8)}placeholder: '${item.placeholder}',`)
  }
  switch (item.type) {
    case 'Select': {
      if (item.itemLabel) {
        codeArr.push(`${genSpace(8)}itemLabel: '${item.itemLabel}',`)
      }
      if (item.itemValue) {
        codeArr.push(`${genSpace(8)}itemValue: '${item.itemValue}',`)
      }
      if (typeof item.multiple === 'boolean') {
        codeArr.push(`${genSpace(8)}multiple: ${item.multiple},`)
      }
      if (item.optionDataType === 'static_data' /** 静态数据 */) {
        codeArr.push(`${genSpace(8)}options: ${item.staticDataKey},`)
      } else if (item.optionDataType === 'definition' /** 定义 */) {
        if (item.dataSource === 'api' /** 接口定义 */) {
          const apiName = item.apiConfig?.name ? item.apiConfig?.name.replace(/^query/, '') : ''
          codeArr.push(`${genSpace(8)}options: async () => await get${apiName}Data()`)
        } else if (item.dataSource === 'custom' /** 自定义 */) {
          codeArr.push(`${genSpace(8)}options: [`)
          for (const optionItem of item.options ?? []) {
            // {
            //   label: '${optionItem.label}',
            //   value: ${optionItem.valueType === 'number' ? +optionItem.value : `'${optionItem.value}'`}
            // }
            codeArr.push(`${genSpace(10)}{`)
            codeArr.push(`${genSpace(12)}label: '${optionItem.label}',`)
            codeArr.push(
              `${genSpace(12)}value: ${optionItem.valueType === 'number' ? +optionItem.value : `'${optionItem.value}'`}`,
            )
            codeArr.push(`${genSpace(10)}}`)
          }
          codeArr.push(`${genSpace(8)}]`)
        }
      }
      break
    }
    case 'Cascader': {
      if (item.itemLabel) {
        codeArr.push(`${genSpace(8)}label: ${item.itemLabel},`)
      }
      if (item.itemValue) {
        codeArr.push(`${genSpace(8)}value: ${item.itemValue},`)
      }
      if (item.itemChildren) {
        codeArr.push(`${genSpace(8)}children: ${item.itemChildren},`)
      }
      if (typeof item.multiple === 'boolean') {
        codeArr.push(`${genSpace(8)}multiple: ${item.multiple},`)
      }
      if (item.optionDataType === 'static_data' /** 静态数据 */) {
        codeArr.push(`${genSpace(8)}options: ${item.staticDataKey},`)
      } else if (item.optionDataType === 'definition' /** 定义 */) {
        if (item.dataSource === 'api' /** 接口定义 */) {
          const apiName = item.apiConfig?.name ? item.apiConfig?.name.replace(/^query/, '') : ''
          codeArr.push(`${genSpace(8)}options: async () => await get${pascal(apiName)}Data()`)
        } else if (item.dataSource === 'custom' /** 自定义 */) {
          codeArr.push(`${genSpace(8)}options: [`)
          for (const optionItem of item.options ?? []) {
            // {
            //   label: '${optionItem.label}',
            //   value: ${optionItem.valueType === 'number' ? +optionItem.value : `'${optionItem.value}'`}
            // }
            codeArr.push(`${genSpace(10)}{`)
            codeArr.push(`${genSpace(12)}label: '${optionItem.label}',`)
            codeArr.push(
              `${genSpace(12)}value: ${optionItem.valueType === 'number' ? +optionItem.value : `'${optionItem.value}'`}`,
            )
            codeArr.push(`${genSpace(10)}}`)
          }
          codeArr.push(`${genSpace(8)}]`)
        }
      }
      break
    }
  }
  return codeArr
}

function transColumnsForTable(items: Record<string, any>[]) {
  const looper = (data: Record<string, any>[], space: number) => {
    const codeArr: string[] = []
    codeArr.push(`${genSpace(space)}columns: [`)
    for (const item of data) {
      codeArr.push(`${genSpace(space + 2)}{`)
      codeArr.push(
        `${genSpace(space + 4)}label: '${item.label}',`,
        `${genSpace(space + 4)}prop: '${item.prop}',`,
      )
      if (item.width) codeArr.push(`${genSpace(space + 4)}width: ${item.width},`)
      if (item.tableColumnItems?.length) codeArr.push(...looper(item.tableColumnItems, space + 4))
      codeArr.push(`${genSpace(space + 2)}},`)
    }
    codeArr.push(`${genSpace(space)}],`)
    return codeArr
  }
  return looper(items, 2)
}

function getSearchConditionItems(findSearch?: SearchDesignData) {
  return findSearch?.options?.searchConditionItems
}

function getStaticDataKeyArrInSearch(findSearch?: SearchDesignData): string[] {
  return Array.from(
    new Set(
      getSearchConditionItems(findSearch)
        ?.filter(
          (a: Record<string, any>) => a.optionDataType === 'static_data' && !!a.staticDataKey,
        )
        ?.map((b: Record<string, any>) => b.staticDataKey) ?? [],
    ),
  )
}

function getSearchConditionItemsNeedStore(findSearch?: SearchDesignData) {
  return (
    getSearchConditionItems(findSearch)?.filter(
      e =>
        ['Select', 'Cascader'].includes(e.type!) &&
        e.optionDataType === 'definition' &&
        e.dataSource === 'api' &&
        e.apiConfig?.name &&
        e.apiConfig?.method &&
        e.apiConfig?.url,
    ) ?? []
  )
}

function getApiNamesOfSearchConditionItems(findSearch?: SearchDesignData) {
  return (
    getSearchConditionItems(findSearch)
      ?.filter(
        e =>
          ['Select', 'Cascader'].includes(e.type!) &&
          e.optionDataType === 'definition' &&
          e.dataSource === 'api' &&
          e.apiConfig?.name &&
          e.apiConfig?.method &&
          e.apiConfig?.url,
      )
      ?.map(e => e.apiConfig!.name!) ?? []
  )
}

function getApiConfigOfSearchConditionItems(findSearch?: SearchDesignData) {
  return (
    findSearch?.options?.searchConditionItems
      ?.filter(e => e.apiConfig?.name && e.apiConfig?.method && e.apiConfig?.url)
      ?.map(e => ({ ...e.apiConfig })) ?? []
  )
}

function getTableColumnItems(findTable?: TableDesignData) {
  return (
    findTable?.options?.tableColumnItems?.reduce((pre: TableColumnItem[], cur) => {
      return [...pre, ...(cur.tableColumnItems?.length ? [cur, ...cur.tableColumnItems] : [cur])]
    }, []) ?? []
  )
}

function getApiConfigOfTable(findTable?: TableDesignData) {
  return findTable?.options?.apiConfig
}

function getTableOperations(findTable?: TableDesignData) {
  return findTable?.options?.tableOperations ?? []
}

function getTableOperationsHasPermissionCode(findTable?: TableDesignData) {
  return getTableOperations(findTable)?.filter(e => !!e.code) ?? []
}

function getTableColumnOperations(findTable?: TableDesignData) {
  return findTable?.options?.tableColumnOperations ?? []
}

function getTableColumnOperationsHasPermissionCode(findTable?: TableDesignData) {
  return getTableColumnOperations(findTable)?.filter(e => !!e.code) ?? []
}

function getTableOperationsNeedApi(findTable?: TableDesignData) {
  return (
    getTableOperations(findTable)?.filter(
      e =>
        (e.apiConfig?.name && e.apiConfig?.method && e.apiConfig?.url) ||
        (e.echoApiConfig?.name && e.echoApiConfig?.method && e.echoApiConfig?.url),
    ) ?? []
  )
}

function getApiConfigOfTableColumnItems(findTable?: TableDesignData) {
  return (
    getTableColumnItems(findTable)
      ?.filter(e => e.apiConfig?.name && e.apiConfig?.method && e.apiConfig?.url)
      ?.map(e => ({ ...e.apiConfig })) ?? []
  )
}

function getApiConfigOfTableOperations(findTable?: TableDesignData) {
  return (
    getTableOperations(findTable)
      ?.filter(
        e =>
          (e.apiConfig?.name && e.apiConfig?.method && e.apiConfig?.url) ||
          (e.echoApiConfig?.name && e.echoApiConfig?.method && e.echoApiConfig?.url),
      )
      ?.map(e => ({ ...e.apiConfig })) ?? []
  )
}

function getApiConfigOfTableColumnOperations(findTable?: TableDesignData) {
  return (
    getTableColumnOperations(findTable)
      ?.filter(
        e =>
          (e.apiConfig?.name && e.apiConfig?.method && e.apiConfig?.url) ||
          (e.echoApiConfig?.name && e.echoApiConfig?.method && e.echoApiConfig?.url),
      )
      ?.map(e => ({ ...e.apiConfig })) ?? []
  )
}

function getTableColumnOperationsNeedApi(findTable?: TableDesignData) {
  return (
    getTableColumnOperations(findTable)?.filter(
      e =>
        (e.apiConfig?.name && e.apiConfig?.method && e.apiConfig?.url) ||
        (e.echoApiConfig?.name && e.echoApiConfig?.method && e.echoApiConfig?.url),
    ) ?? []
  )
}

function getStaticDataKeyArrInTable(findTable?: TableDesignData): string[] {
  return Array.from(
    new Set(
      getTableColumnItems(findTable)
        ?.filter(
          (a: Record<string, any>) =>
            a.formatterType === 'static_data_transform' && !!a.staticDataKey,
        )
        ?.map((b: Record<string, any>) => b.staticDataKey) ?? [],
    ),
  )
}

function getTableOperationsHasForm(findTable?: TableDesignData) {
  return (
    getTableOperations(findTable)?.filter(
      e => !e.enableConfirmation && (e.formConfig?.useOtherForm || !!e.formConfig?.data),
    ) ?? []
  )
}

function getTableColumnOperationsHasForm(findTable?: TableDesignData) {
  return (
    getTableColumnOperations(findTable)?.filter(
      e => !e.enableConfirmation && (e.formConfig?.useOtherForm || !!e.formConfig?.data),
    ) ?? []
  )
}

function getTableColumnItemsNeedStore(findTable?: TableDesignData) {
  return (
    getTableColumnItems(findTable)?.filter(
      e =>
        e.formatterType === 'dynamic_data_transform' &&
        e.apiConfig?.name &&
        e.apiConfig?.method &&
        e.apiConfig?.url,
    ) ?? []
  )
}

function getApiNamesOfTableColumnItems(findTable?: TableDesignData) {
  return (
    getTableColumnItems(findTable)
      ?.filter(
        e =>
          e.formatterType === 'dynamic_data_transform' &&
          e.apiConfig?.name &&
          e.apiConfig?.method &&
          e.apiConfig?.url,
      )
      ?.map(e => e.apiConfig!.name!) ?? []
  )
}

function getWidgetListNeedDefineApi(findSearch?: SearchDesignData, findTable?: TableDesignData) {
  const widgetList: Record<string, any>[] = []
  // 递归widgetList
  // eslint-disable-next-line no-unused-vars
  const recurWidgetList = (data: any, handler: (widget: Record<string, any>) => void) => {
    handler(data)
    data.widgetList?.forEach(widget => {
      recurWidgetList(widget, handler)
    })
  }
  const operationsHasForm = [
    ...getTableOperationsHasForm(findTable),
    ...getTableColumnOperationsHasForm(findTable),
  ]
  const apiConfigItems = [
    ...getApiConfigOfSearchConditionItems(findSearch),
    ...getApiConfigOfTableColumnItems(findTable),
  ].reduce((acc: ApiConfigModel[], cur) => {
    if (!acc.some(e => e.name === cur.name)) acc.push(cur)
    return acc
  }, [])

  for (const item of operationsHasForm) {
    recurWidgetList(item.formConfig?.data ?? {}, widget => {
      if (
        ['select', 'cascader'].includes(widget.type) &&
        widget.options?.systemApi &&
        !apiConfigItems.some(
          e => e.method === 'GET' && e.url === widget.options?.systemApi,
        ) /** 判断表单中配置的接口是否已定义 */
      ) {
        widgetList.push(widget)
      }
    })
  }
  return widgetList
}

function transIdToCamel(id: string) {
  if (!id) return 'undefined'
  return camel(title(id))
}

function transIdToPascal(id: string) {
  if (!id) return 'Undefined'
  return pascal(title(id))
}
