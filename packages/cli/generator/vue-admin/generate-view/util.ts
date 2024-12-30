import { camel, capitalize, dash, last, pascal } from 'radash'
import {
  storeCodeSnippets,
  addImportCode,
  storeCodeSnippetOfDestructuringVar,
  genSpace,
} from '../../util.js'

// 解析视图view对象结构
export function resolveViewObject(options: Record<string, any>, components: Record<string, any>[]) {
  const viewObject: Record<string, any> = {}
  const { name, saticDataConfig } = options
  if (name) {
    const nameArr = name.split('/')
    viewObject.base = `/views${name.startsWith('/') ? name : `/${name}`}`
    viewObject[`/${pascal(last(nameArr)!)}.vue`] = genViewComponentCode(options, components)
  }
  if (saticDataConfig?.length) {
    viewObject['/constants.ts'] = genConstantsCode(options)
  }
  const findTable = components.find(e => e.type === 'Table')
  if (findTable) {
    viewObject['/utils.ts'] = genUtilsCode()
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
      viewObject['/components']['/index.ts'] = genIndexOfComponents(components)
    }
    for (const item of tableOperationsHasForm) {
      const dashName = `table-${item.value}`
      viewObject['/components'][`/${dashName}`] = {}
      viewObject['/components'][`/${dashName}`]['/index.ts'] = genIndexOfComponent(dashName)
      viewObject['/components'][`/${dashName}`][`/${pascal(dashName)}.vue`] =
        genTableOperationComponentCode(options, item)
      if (item.formConfig) {
        viewObject['/components'][`/${dashName}`]['/components'] = {}
        viewObject['/components'][`/${dashName}`]['/components']['/index.ts'] =
          `export * from './form-detail'`
        viewObject['/components'][`/${dashName}`]['/components']['/form-detail'] = {
          '/index.ts': `import FormDetail from './FormDetail.vue'
                        export type FormDetailInstance = InstanceType<typeof FormDetail>
                        export { FormDetail }
                        `,
          '/FormDetail.vue': genFormDetailComponentCode(options),
        }
      }
    }
    for (const item of tableColumnOperationsHasForm) {
      const dashName = `row-${item.value}`
      viewObject['/components'][`/${dashName}`] = {}
      viewObject['/components'][`/${dashName}`]['/index.ts'] = genIndexOfComponent(dashName)
      viewObject['/components'][`/${dashName}`][`/${pascal(dashName)}.vue`] = undefined
      if (item.formConfig) {
        viewObject['/components'][`/${dashName}`]['/components'] = {}
        viewObject['/components'][`/${dashName}`]['/components']['/index.ts'] =
          `export * from './form-detail'`
        viewObject['/components'][`/${dashName}`]['/components']['/form-detail'] = {
          '/index.ts': `import FormDetail from './FormDetail.vue'
                        export type FormDetailInstance = InstanceType<typeof FormDetail>
                        export { FormDetail }
                        `,
          '/FormDetail.vue': genFormDetailComponentCode(options),
        }
      }
    }
  }
  return viewObject
}

// 解析视图api对象结构
export function resolveApiObjectOfView(
  options: Record<string, any>,
  components: Record<string, any>[],
) {
  const apiObject: Record<string, any> = {}
  const { name } = options ?? {}
  if (name) {
    const nameArr = name.split('/').filter(e => !!e)
    apiObject.base = `/api${nameArr.length > 1 ? `/${nameArr.slice(0, nameArr.length - 1).join('/')}` : ''}`
    apiObject[`/${dash(last(nameArr)!)}.ts`] = genApiCodeOfView(components)
  }
  return apiObject
}

// 解析视图store对象结构
export function resolveStoreObjectOfView(
  options: Record<string, any>,
  components: Record<string, any>[],
) {
  const storeObject: Record<string, any> = {}
  const { name } = options ?? {}
  if (name) {
    const nameArr = name.split('/').filter(e => !!e)
    storeObject.base = `/stores${nameArr.length > 1 ? `/${nameArr.slice(0, nameArr.length - 1).join('/')}` : ''}`
    storeObject[`/${dash(last(nameArr)!)}.ts`] = genStoreCodeOfView(options, components)
  }
  return storeObject
}

// 生成视图组件代码
function genViewComponentCode(options: Record<string, any>, components: Record<string, any>[]) {
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
      !e.apiConfig?.useGlobalApi &&
      e.apiConfig?.method &&
      e.apiConfig?.url,
  )
  const tableColumnItemsNeedStore = tableColumnItems?.filter(
    e =>
      e.formatterType === 'dynamic_data_transform' &&
      !e.apiConfig?.useGlobalApi &&
      e.apiConfig?.method &&
      e.apiConfig?.url,
  )
  const asyncComponentConstants = genAsyncComponentConst(
    tableOperationsHasForm,
    tableColumnOperationsHasForm,
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
    `@/api${name.startsWith('/') ? name : `/${name}`}`,
    importCodeArr,
  )
  addImportCode('module', [`useViewDataStore`], `@/stores${`/${nameArr.join('/')}`}`, importCodeArr)
  if (findSearch || findTable /** 有搜索或表格，需导入vs-search, vs-table组件的相关类型 */) {
    addImportCode(
      'type',
      genVswiftComponentsTypeImports(findSearch, findTable),
      '@/components',
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
    if (asyncComponentConstants.length /** 有异步组件，导入异步组件实例类型 */) {
      addImportCode(
        'type',
        asyncComponentConstants.map(e => `${pascal(e)}Instance`),
        './components',
        importCodeArr,
      )
    }
  }

  // 生成定义代码片段并存储
  const apiNamesForSearch = searchConditionItems
    ?.filter(e => !!e.apiConfig?.useGlobalApi)
    ?.map(e => e.apiConfig.useGlobalApi)

  const apiNamesForTable = tableColumnItems
    ?.filter(e => !!e.apiConfig?.useGlobalApi)
    ?.map(e => e.apiConfig.useGlobalApi)
  const _apiNamesForSearch: string[] = Array.from(new Set(apiNamesForSearch))
  const _apiNamesForTable: string[] = Array.from(new Set(apiNamesForTable))
  const apiNames = Array.from(new Set([..._apiNamesForSearch, ..._apiNamesForTable]))
  if (apiNames.length) {
    storeCodeSnippets(['// 全局接口store'], varCodeArr)
    for (const apiName of apiNames /** 全局api引用相关代码生成 */) {
      storeCodeSnippetOfDestructuringVar(apiName, 'useGlobalApiStore()', varCodeArr)
      storeCodeSnippetOfDestructuringVar(
        apiName.replace(/^get/, ''),
        'storeToRefs(useGlobalApiStore())',
        varCodeArr,
      )
    }
    storeCodeSnippets([''], varCodeArr)
  }
  if (
    tableOperationsHasPermissionCode?.length ||
    tableColumnOperationsHasPermissionCode?.length /** 有 useUserInfoStore 定义 */
  ) {
    storeCodeSnippets(['// 用户信息store'], varCodeArr)
    storeCodeSnippetOfDestructuringVar(
      'permissionCodes',
      'storeToRefs(useUserInfoStore())',
      varCodeArr,
    )
    storeCodeSnippets([''], varCodeArr)
  }
  const useStoreConst = genUseStoreConst(searchConditionItemsNeedStore, tableColumnItemsNeedStore)
  if (useStoreConst.length /**有 useViewStore 定义 */) {
    storeCodeSnippets(['// 视图store'], varCodeArr)
    for (const item of useStoreConst) {
      storeCodeSnippetOfDestructuringVar(`get${pascal(item)}`, `useViewDataStore()`, varCodeArr)
      storeCodeSnippetOfDestructuringVar(item, `storeToRefs(useViewDataStore())`, varCodeArr)
    }
    storeCodeSnippets([''], varCodeArr)
  }
  if (asyncComponentConstants.length /** 有异步组件，异步组件定义在最上面 */) {
    storeCodeSnippets(
      [
        '// 异步组件及其实例定义',
        ...asyncComponentConstants.map(
          e =>
            `const ${camel(e)} = defineAsyncComponent(() => import('./components/${e}/${pascal(e)}.vue'))`,
        ),
        ...asyncComponentConstants.map(e => `const ${pascal(e)}Ref = ref<${pascal(e)}Instance>()`),
        '',
      ],
      varCodeArr,
    )
  }
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
  if (findTable?.options?.showPagination /**有分页 */) {
    storeCodeSnippets(
      [`${genSpace(2)}pageIndex: 1,`, `${genSpace(2)}pageSize: getPageSize(),`],
      paramsCodeArr,
    )
  }

  if (findTable /**有表格 */) {
    storeCodeSnippets(
      [
        '// 获取列表数据',
        `const getTableList = async(params: PagingParams) {`,
        `${genSpace(2)}table.value.loading = true`,
        `${genSpace(2)}const res = await queryUserList(params)`,
        `${genSpace(2)}table.value.loading = false`,
        `${genSpace(2)}table.value.total = res?.total ?? 0`,
        `${genSpace(2)}table.value.data = res?.list ?? []`,
        `}`,
        '',
      ],
      funcCodeArr,
    )
  }

  if (findTable?.options.showPagination /** 有分页 */) {
    storeCodeSnippets(
      [
        ...[
          '// 搜索',
          `const onInquire = (val: Record<string, any>) => {`,
          `${genSpace(2)}params.value = { ...params.value, ...val, pageIndex: 1 }`,
          `${genSpace(2)}getTableList(params.value)`,
          `}`,
        ],
        '',
        ...[
          '// 重置',
          `const onReset = () => {`,
          `${genSpace(2)}params.value.pageIndex = 1`,
          `${genSpace(2)}getTableList(params.value)`,
          `}`,
        ],
        '',
        ...[
          '// 分页改变',
          `const onPagingChange = (val: PagingParams) {`,
          `${genSpace(2)}params.value.pageIndex = val.pageIndex`,
          `${genSpace(2)}params.value.pageSize = val.pageSize`,
          `${genSpace(2)}getTableList(params.value)`,
          `}`,
        ],
        '',
      ],
      funcCodeArr,
    )
  }

  // 生成 onOperate 代码
  for (const item of tableOperations /** 表格操作 */) {
    if (item.formConfig && Object.keys(item.formConfig).length /** 有表单配置 */) {
      storeCodeSnippets(
        [
          `${genSpace(4)}case '${item.value}': {`,
          `${genSpace(6)}Table${pascal(item.value)}Ref.value?.open()`,
          `${genSpace(6)}break`,
          `${genSpace(4)}}`,
        ],
        onOperateCodeArr,
      )
    } else {
      // 批量操作，只需配一个参数，这里只取第一个参数
      const [param] = item.apiConfig.params
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
          `${genSpace(6)}if (await ${item.apiConfig.apiName}({ ${param.key} })) {`,
          `${genSpace(8)}ElMessage.success('${item.label}成功')`,
          `${genSpace(8)}getTableList(params.value)`,
          `${genSpace(6)}}`,
          `${genSpace(4)}}`,
        ],
        onOperateCodeArr,
      )
    }
  }
  for (const item of tableColumnOperations /** 表列操作 */) {
    if (item.formConfig && Object.keys(item.formConfig).length /** 有表单配置 */) {
      storeCodeSnippets(
        [
          `${genSpace(4)}case '${item.value}': {`,
          `${genSpace(6)}Table${pascal(item.value)}Ref.value?.open(val)`,
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
          `${genSpace(6)}if (await ${item.apiConfig.name}({${transParams(item.apiConfig.params)}})) {`,
          `${genSpace(8)}ElMessage.success('${item.label}成功')`,
          `${genSpace(8)}getTableList(params.value)`,
          `${genSpace(6)}}`,
          `${genSpace(6)}break`,
          `${genSpace(4)}}`,
        ],
        onOperateCodeArr,
      )
    }
  }

  // 生成 onMounted 代码
  if (findTable /**有表格 */) {
    storeCodeSnippets([`${genSpace(2)}getTableList(params.value)`], onMountedCodeArr)
  }
  for (const apiName of apiNames) {
    storeCodeSnippets([`${genSpace(2)}${apiName}()`], onMountedCodeArr)
  }

  // 生成template代码
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
        ...genTableTemplate(tableColumnItems),
        `${genSpace(4)}</VsTable>`,
      ],
      templateCodeArr,
    )
  }

  const _scriptCodeArr = [
    `<script setup lang="ts">`,
    ...importCodeArr,
    '',
    ...varCodeArr,
    ...['// 参数定义', `const params = ref<PagingParams>({`, ...paramsCodeArr, `})`],
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
function genConstantsCode(options: Record<string, any>) {
  const { saticDataConfig = [] } = options
  const genValueOptionsCode = (data: Record<string, any>[]) => {
    return data
      .map(
        e =>
          `{ label: '${e.label}', value: ${e.valueType === 'number' ? +e.value : `'${e.value}'`} }`,
      )
      .join(',')
  }
  return `${saticDataConfig.map(item => `export const ${item.key} = [${genValueOptionsCode(item.value)}]`).join('\n')}`
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
function genIndexOfComponents(components: Record<string, any>[]) {
  const findTable = components.find(e => e.type === 'Table')
  const tableOperations = findTable?.options?.tableOperations
  const tableColumnOperations = findTable?.options?.tableColumnOperations
  const tableOperationsHasForm = tableOperations?.filter(
    e => !e.formConfig?.useOtherOperateForm && !!e.formConfig,
  )
  const tableColumnOperationsHasForm = tableColumnOperations?.filter(
    e => !e.formConfig?.useOtherOperateForm && !!e.formConfig,
  )
  const mergeData = [...(tableOperationsHasForm ?? []), ...(tableColumnOperationsHasForm ?? [])]
  return `${mergeData.map(item => `export * from './table-${item.value}'`).join('\n')}`
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
  options: Record<string, any>,
  operationItem: Record<string, any>,
) {
  // 提取数据
  const { name } = options
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
      "import { toSubmitData } from '../../utils'",
    ],
    importCodeArr,
  )
  storeCodeSnippets(["(e: 'succeed'): void"], emitCodeArr)
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
        `${genSpace(2)}if (await addItem(toSubmitData(form.value))) {`,
        `${genSpace(4)}ElMessage.success('${label}成功')`,
        `${genSpace(4)}emit('succeed')`,
        `${genSpace(2)}}`,
        `${genSpace(2)}loading.value = false`,
        `${genSpace(2)}show.value = false`,
        `}`,
      ],
      ...[
        '// 关闭弹框',
        `const onClose = async () => {`,
        `${genSpace(2)}form.value = genInitFormData()`,
        `${genSpace(2)}await sleep(50)`,
        `${genSpace(2)}FormDetailRef.value?.clearValidate()`,
        `}`,
      ],
      '',
      ...['// 生成初始表单数据', `const genInitFormData = () => ({})`],
      '',
      ...['// 以下 defineExpose', `const open = () => {`, `${genSpace(2)}show.value = true`, `}`],
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
    ...definitionCodeArr,
    `</script>`,
  ]
  const _templateCodeArr = [`<template>`, ...templateCodeArr, `</template>`]

  return [..._scriptCodeArr, '', ..._templateCodeArr].join('\n')
}

// 生成表单详情组件代码
function genFormDetailComponentCode(
  options: Record<string, any>,
  // formConfig: Record<string, any>,
) {
  // 提取数据
  const { name } = options
  const nameArr = name.split('/').filter(e => !!e)
  const storePath = nameArr.length > 1 ? `/${nameArr.slice(0, nameArr.length - 1).join('/')}` : ''

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 存储组件定义代码
  const definitionCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []

  // 存储代码片段
  storeCodeSnippets(
    [
      `import { use${pascal(last(nameArr)!)}Store } from '@/stores${storePath}'`,
      "import type { FormInstance } from 'element-plus'",
    ],
    importCodeArr,
  )

  storeCodeSnippets(
    [
      'const formRef = ref<FormInstance>()',
      'const form = defineModel<Record<string, any>>({ default: () => ({}) })',
      '',
      ...[
        `// 以下 defineExpose`,
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

  storeCodeSnippets(
    [
      `${genSpace(2)}<el-form ref="formRef" :model="form" label-width="100px" :inline="false">`,
      `${genSpace(4)}<!-- 根据表单详情配置数据动态生成... -->`,
      `${genSpace(4)}<el-form-item label="输入框" prop="input" :rules="[{ required: true, message: '必填项' }]">`,
      `${genSpace(6)}<el-input v-model="form.input" placeholder="请输入" />`,
      `${genSpace(4)}</el-form-item>`,
      `${genSpace(4)}<el-form-item label="数字输入框" prop="input_number" :rules="[{ required: true, message: '必填项' }]">`,
      `${genSpace(6)}<el-input-number v-model="form.input_number" placeholder="请输入" :min="0" :max="Number.MAX_SAFE_INTEGER" :step="1" :controls="true" controls-position="right" />`,
      `${genSpace(4)}</el-form-item>`,
      `${genSpace(4)}<el-form-item label="备注" prop="remark">`,
      `${genSpace(6)}<el-input v-model="form.remark" type="textarea" placeholder="请输入" autosize />`,
      `${genSpace(4)}</el-form-item>`,
      `${genSpace(2)}</el-form>`,
    ],
    templateCodeArr,
  )

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
function genApiCodeOfView(components: Record<string, any>[]) {
  const codeArr: string[] = []
  // 提取数据
  const findSearch = components.find(e => e.type === 'Search')
  const findTable = components.find(e => e.type === 'Table')
  const tableOperations = findTable?.options?.tableOperations
  const tableColumnOperations = findTable?.options?.tableColumnOperations
  const apiConfigOfTable = findTable?.options?.apiConfig?.useGlobalApi
    ? []
    : [{ ...findTable?.options?.apiConfig, useGlobalApi: undefined }]
  const apiConfigOfSearchConditionItems = findSearch?.options?.searchConditionItems
    ?.filter(e => !e.apiConfig?.useGlobalApi && e.apiConfig?.method && e.apiConfig?.url)
    ?.map(e => ({ ...e.apiConfig, useGlobalApi: undefined }))
  const apiConfigOfTableOperations = tableOperations
    ?.filter(
      e =>
        (!e.apiConfig?.useGlobalApi && e.apiConfig?.method && e.apiConfig?.url) ||
        (!e.echoApiConfig?.useGlobalApi && e.echoApiConfig?.method && e.echoApiConfig?.url),
    )
    ?.map(e => ({ ...e.apiConfig, useGlobalApi: undefined }))
  const apiConfigOfTableColumnOperations = tableColumnOperations
    ?.filter(
      e =>
        (!e.apiConfig?.useGlobalApi && e.apiConfig?.method && e.apiConfig?.url) ||
        (!e.echoApiConfig?.useGlobalApi && e.echoApiConfig?.method && e.echoApiConfig?.url),
    )
    ?.map(e => ({ ...e.apiConfig, useGlobalApi: undefined }))

  const mergeApiConfig = [
    ...apiConfigOfTable,
    ...apiConfigOfSearchConditionItems,
    ...apiConfigOfTableOperations,
    ...apiConfigOfTableColumnOperations,
  ]

  const toArg = (e: Record<string, any>) =>
    `${e.params?.length ? (e.method === 'GET' ? 'params' : 'data') : ''}`
  const toArgType = (e: Record<string, any>) => `${e.params?.length ? ': Record<string, any>' : ''}`

  codeArr.push(`import { http } from '@/utils/http'`, '')
  for (const item of mergeApiConfig) {
    // export const ${e.name} = async (${toArg(e)}${toArgType(e)}) => {
    //   try {
    //     await http({
    //       method: '${e.method}',
    //       url: '${e.url}',
    //       ${toArg(e)}
    //     })
    //     return true
    //   } catch (error) {
    //     console.error('${e.name} ->', error)
    //   }
    // }
    codeArr.push(
      `export const ${item.name} = async (${toArg(item)}${toArgType(item)}) => {`,
      `${genSpace(2)}try {`,
      `${genSpace(4)}await http({`,
      `${genSpace(6)}method: '${item.method}',`,
    )
    if (toArg(item)) {
      codeArr.push(`${genSpace(6)}${toArg(item)}`)
    }
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

  return codeArr.join('\n')
}

// 生成视图store代码
function genStoreCodeOfView(options: Record<string, any>, components: Record<string, any>[]) {
  const codeArr: string[] = []
  // 提取数据
  const { name } = options
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const findSearch = components.find(e => e.type === 'Search')
  const findTable = components.find(e => e.type === 'Table')
  const tableColumnItems = findTable?.options?.tableColumnItems.reduce(
    (pre: Record<string, any>[], cur: Record<string, any>) => {
      return [...pre, ...(cur.tableColumnItems?.length ? [cur, ...cur.tableColumnItems] : [cur])]
    },
    [],
  )
  const apiConfigOfSearchConditionItems = findSearch?.options?.searchConditionItems
    ?.filter(e => !e.apiConfig?.useGlobalApi && e.apiConfig?.method && e.apiConfig?.url)
    ?.map(e => ({ ...e.apiConfig, useGlobalApi: undefined }))
  const apiConfigOfTableColumnItems = tableColumnItems
    ?.filter(e => !e.apiConfig?.useGlobalApi && e.apiConfig?.method && e.apiConfig?.url)
    ?.map(e => ({ ...e.apiConfig, useGlobalApi: undefined }))

  const mergeApiConfig = [...apiConfigOfSearchConditionItems, ...apiConfigOfTableColumnItems]

  const toName = (e: Record<string, any>) => `${e.name?.replace(/^query/, '')}`

  codeArr.push(
    `import { defineStore } from 'pinia'`,
    `import { ${mergeApiConfig.map(e => `${e.name}`).join(',')} } from '@/api${base}'`,
    '',
  )
  codeArr.push(`export const useViewDataStore = defineStore('${base}', () => {`)
  codeArr.push(
    ...mergeApiConfig.map(
      e => `${genSpace(2)}const ${toName(e)}Data = ref<Record<string, any>[]>()`,
    ),
    '',
  )
  for (const item of mergeApiConfig) {
    // async function get${capitalize(toName(e))}() {
    //   if (${toName(e)}.value?.length) return ${toName(e)}.value
    //   ${toName(e)}.value = await ${e.name}()
    //   return ${toName(e)}.value
    // }

    // function set${capitalize(toName(e))}(data?: Record<string, any>[]) {
    //   ${toName(e)}.value = data
    // }
    codeArr.push(
      `${genSpace(2)}async function get${capitalize(toName(item))}Data() {`,
      `${genSpace(4)}if (${toName(item)}Data.value?.length) return ${toName(item)}Data.value`,
      `${genSpace(4)}${toName(item)}Data.value = await ${item.name}()`,
      `${genSpace(4)}return ${toName(item)}Data.value`,
      `${genSpace(2)}}`,
      '',
      `${genSpace(2)}function set${capitalize(toName(item))}Data(data?: Record<string, any>[]) {`,
      `${genSpace(4)}${toName(item)}Data.value = data`,
      `${genSpace(2)}}`,
    )
  }
  codeArr.push(
    '',
    `${genSpace(2)}return {`,
    `${genSpace(4)}${mergeApiConfig.map(e => `${toName(e)}Data, get${capitalize(toName(e))}Data, set${capitalize(toName(e))}Data`).join(',')}`,
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
function genSearchConfig(searchConfig: Record<string, any>) {
  const codeArr: string[] = []
  const { options } = searchConfig
  if (options.labelWidth) {
    codeArr.push(`${genSpace(2)}labelWidth: '${options.labelWidth}px',`)
  }
  codeArr.push(`${genSpace(2)}options: [`)
  for (const item of options.searchConditionItems) {
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
    codeArr.push(`${genSpace(6)}} as S${pascal(item.type)}Props`)
    codeArr.push(`${genSpace(4)}}`)
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
    codeArr.push(`${genSpace(2)}operateColumnWidth: ${options.operateColumnWidth}px`)
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
      codeArr.push(`${genSpace(4)}}`)
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
      codeArr.push(`${genSpace(4)}}`)
    }
    codeArr.push(`${genSpace(2)}],`)
  }
  return codeArr
}

// 生成 Table 模板
function genTableTemplate(tableColumnItems: Record<string, any>[]) {
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
      const { useGlobalApi, name } = apiConfig
      const optionsDataVarName = useGlobalApi
        ? `${useGlobalApi.replace(/^get/, '')}`
        : `${name.replace(/^get/, '')}`
      if (isTreeData) {
        codeArr.push(
          `${genSpace(6)}<template #${prop}="{ row }">`,
          `${genSpace(8)}{{findArraryValueFromTreeData(row.${prop}, ${optionsDataVarName}, {returnType: 'labels'})?.join('/')}}`,
          `${genSpace(6)}</template>`,
        )
      } else {
        codeArr.push(
          `${genSpace(6)}<template #${prop}="{ row }">`,
          `${genSpace(8)}{{getLabelByValue(row.${prop}, ${optionsDataVarName}, {label: 'label'})}}`,
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

function transPropsForSearch(item: Record<string, any>) {
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
        codeArr.push(`${genSpace(8)}options: '${item.staticDataKey}',`)
      } else if (item.optionDataType === 'definition' /** 定义 */) {
        if (item.dataSource === 'api' /** 接口定义 */) {
          codeArr.push(`${genSpace(8)}options: async () => await get${pascal(item.key)}Data()`)
        } else if (item.dataSource === 'custom' /** 自定义 */) {
          codeArr.push(`${genSpace(8)}options: [`)
          for (const optionItem of item.options) {
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
          codeArr.push(`${genSpace(8)}options: async () => await get${pascal(item.key)}Data()`)
        } else if (item.dataSource === 'custom' /** 自定义 */) {
          codeArr.push(`${genSpace(8)}options: [`)
          for (const optionItem of item.options) {
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
      codeArr.push(`${genSpace(space + 2)}}`)
    }
    codeArr.push(`${genSpace(space)}],`)
    return codeArr
  }
  return looper(items, 2)
}
