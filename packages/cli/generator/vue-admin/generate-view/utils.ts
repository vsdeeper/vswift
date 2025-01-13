import { camel, dash, last, pascal, snake, title } from 'radash'
import {
  storeCodeSnippets,
  addImportCode,
  storeCodeSnippetOfDestructuringVar,
  genSpace,
  forofRecursive,
  transKeyToVar,
} from '../../utils.js'
import { genFormItemsCodeSnippets } from '../utils/gen-form-items.js'
import type {
  ApiConfigModel,
  MergeDesignData,
  Method,
  OptionsConfigItem,
  SearchConditionItem,
  SearchDesignData,
  TableColumnItem,
  TableDesignData,
  TableDesignDataOptions,
  TableOperationsItem,
  ViewDesignDataOptions,
} from 'visual-development'
import type { WidgetDesignData } from 'vswift-form'
import { genDataTableModel } from './gen-data-table-model.js'
import { genRecursiveAreaModel } from './gen-recursive-area-model.js'

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
    viewObject['/constants.ts'] = genConstantsCode(options, components)
  }
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  if (findTable) {
    viewObject['/utils.ts'] = genUtilsCode()
    viewObject['/components'] = {}
    for (const item of getTableOperationsHasForm(findTable)) {
      const dashName = `table-${item.value}`
      viewObject['/components'][`/${dashName}`] = {}
      viewObject['/components'][`/${dashName}`][`/${pascal(dashName)}.vue`] =
        genTableOperationComponentCode(options, item, components)
      if (!item.formConfig?.useOtherForm && item.formConfig?.data) {
        viewObject['/components'][`/${dashName}`]['/components'] = {}
        viewObject['/components'][`/${dashName}`]['/components']['/form-detail'] = {
          '/FormDetail.vue': genFormDetailComponentCode(options, item, components),
        }
        forofRecursive<WidgetDesignData>(
          item.formConfig.data?.widgetList ?? [],
          (widget, parent) => {
            if (widget.type === 'data-table') {
              let suffix = ''
              if (parent?.type === 'recursive-area') {
                suffix = `Of${pascal(title(parent.idAlias))}`
              }
              viewObject['/components'][`/${dashName}`]['/components']['/form-detail'][
                `/${pascal(title(widget.idAlias ?? 'undefined'))}${suffix}Model.vue`
              ] = genDataTableModel(options, widget)
            } else if (widget.type === 'recursive-area') {
              let suffix = ''
              if (parent?.type === 'recursive-area') {
                suffix = `Of${pascal(title(parent.idAlias))}`
              }
              viewObject['/components'][`/${dashName}`]['/components']['/form-detail'][
                `/${pascal(title(widget.idAlias ?? 'undefined'))}${suffix}Model.vue`
              ] = genRecursiveAreaModel(options, widget)
            }
          },
          { children: 'widgetList' },
        )
      }
    }
    for (const item of getTableColumnOperationsHasForm(findTable)) {
      const dashName = `row-${item.value}`
      viewObject['/components'][`/${dashName}`] = {}
      viewObject['/components'][`/${dashName}`][`/${pascal(dashName)}.vue`] =
        genTableItemOperationComponentCode(options, item, components)
      if (!item.formConfig?.useOtherForm && item.formConfig?.data) {
        viewObject['/components'][`/${dashName}`]['/components'] = {}
        viewObject['/components'][`/${dashName}`]['/components']['/form-detail'] = {
          '/FormDetail.vue': genFormDetailComponentCode(options, item, components),
        }
        forofRecursive<WidgetDesignData>(
          item.formConfig.data?.widgetList ?? [],
          (widget, parent) => {
            if (widget.type === 'data-table') {
              let suffix = ''
              if (parent?.type === 'recursive-area') {
                suffix = `Of${pascal(title(parent.idAlias))}`
              }
              viewObject['/components'][`/${dashName}`]['/components']['/form-detail'][
                `/${pascal(title(widget.idAlias ?? 'undefined'))}${suffix}Model.vue`
              ] = genDataTableModel(options, widget)
            } else if (widget.type === 'recursive-area') {
              let suffix = ''
              if (parent?.type === 'recursive-area') {
                suffix = `Of${pascal(title(parent.idAlias))}`
              }
              viewObject['/components'][`/${dashName}`]['/components']['/form-detail'][
                `/${pascal(title(widget.idAlias ?? 'undefined'))}${suffix}Model.vue`
              ] = genRecursiveAreaModel(options, widget)
            }
          },
          { children: 'widgetList' },
        )
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
  }
  /** import end */

  /** useAppSettingStore start  */
  if (findTable?.options?.showPagination /**有分页 */) {
    storeCodeSnippetOfDestructuringVar('getPageSize', 'useAppSettingStore()', varCodeArr)
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
        ...asyncComponentConstants.map(
          e =>
            `const ${pascal(e)} = defineAsyncComponent(() => import('./components/${e}/${pascal(e)}.vue'))`,
        ),
        ...asyncComponentConstants.map(
          e => `const ${pascal(e)}Ref = ref<InstanceType<typeof ${pascal(e)}>>()`,
        ),
        '',
      ],
      varCodeArr,
    )
  }
  /** defineAsyncComponent end */

  /** search start */
  if (findSearch /**有搜索 */) {
    storeCodeSnippets(
      [`const search = ref<VsSearchProps>({`, ...genSearchConfig(findSearch), `})`, ''],
      varCodeArr,
    )
  }
  /** search end */

  /** table start */
  if (findTable /**有表格 */) {
    storeCodeSnippets(
      [
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
    storeCodeSnippets(
      [
        `const getTableList = async () => {`,
        `${genSpace(2)}table.value.loading = true`,
        `${genSpace(2)}const res = await queryTableList(params.value)`,
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
          `${genSpace(6)}if (await ${transKeyToVar('table', item.value ?? 'undefined')}({ ${param.key} })) {`,
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
          `${genSpace(6)}if (await ${transKeyToVar('row', item.value ?? 'undefined')}({${transParams(item.apiConfig?.params ?? [])}})) {`,
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
      const apiName = transKeyToVar('query', item.prop ?? 'undefined', 'list')
      if (
        !getSearchConditionItemsNeedStore(findSearch)?.some(
          e => transKeyToVar('query', e.key ?? 'undefined', 'list') === apiName,
        ) /** 规避接口重复调用 */
      ) {
        storeCodeSnippets(
          [`${genSpace(2)}get${transKeyToVar('', item.prop ?? 'undefined', 'list')}Data()`],
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
    const genPageProps = (showPagination?: boolean) => {
      return showPagination
        ? 'v-model:page-size="params.pageSize" v-model:current-page="params.pageIndex" @paging-change="onPagingChange"'
        : ''
    }
    storeCodeSnippets(
      [
        `${genSpace(4)}<VsTable ref="TableRef" v-bind="table" ${genPageProps(findTable?.options?.showPagination)} @operate="onOperate">`,
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
      `const params = ref<${findTable?.options.showPagination ? 'PagingParams' : 'Record<string, any>'}>({`,
      ...paramsCodeArr,
      `})`,
    ],
    '',
    ...funcCodeArr,
    ...[
      `const onOperate = async (key: string, val?: any) => {`,
      `${genSpace(2)}switch (key) {`,
      ...onOperateCodeArr,
      `${genSpace(2)}}`,
      `}`,
    ],
    '',
    ...[`onMounted(() => {`, ...onMountedCodeArr, `})`],
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
function genConstantsCode(options: ViewDesignDataOptions, components: MergeDesignData[]) {
  const { saticDataConfig = [] } = options
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  const widgetListHasStaticData = getWidgetListHasStaticDataFromTable(findTable)
  const genValueOptionsCode = (data: OptionsConfigItem[]) => {
    return data
      .map(
        e =>
          `{ label: '${e.label}', value: ${e.valueType === 'number' ? +e.value : `'${e.value}'`} }`,
      )
      .join(',')
  }
  const _saticDataConfig = [...saticDataConfig]
  for (const widget of widgetListHasStaticData) {
    const key = `${snake(title(widget.idAlias)).toUpperCase()}_OPTIONS`
    if (!saticDataConfig.some(e => e.key === widget.key)) {
      _saticDataConfig.push({ key, value: widget.options.options })
    }
  }
  return `${_saticDataConfig.map(e => `export const ${e.key} = [${genValueOptionsCode(e.value ?? [])}]`).join('\n\n')}`
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

// 生成表格操作组件代码
function genTableOperationComponentCode(
  options: ViewDesignDataOptions,
  operationItem: TableOperationsItem,
  components: MergeDesignData[],
) {
  // 提取数据
  const { name = '' } = options
  const { formConfig } = operationItem
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const storeName = `use${pascal(last(name.split('/'))!)}Store`
  const findSearch = components.find(e => e.type === 'Search') as SearchDesignData | undefined
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  const resolvedApiInfo = resolveApiFromFormConfig(findSearch, findTable)

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
    codeArr.push(transKeyToVar('table', operationItem.value ?? 'undefined'))
    for (const api of resolvedApiInfo.allApis) {
      codeArr.push(api.var)
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
  if (resolvedApiInfo.widgetListNeedDefineApi.length) {
    storeCodeSnippets([`import { ${storeName} } from '@/stores${base}'`], importCodeArr)
  }
  storeCodeSnippets(["import { toSubmitData } from '../../utils'"], importCodeArr)
  /** import end */

  /** defineEmits start */
  storeCodeSnippets(
    ['const emit = defineEmits<{', `${genSpace(2)}(e: 'succeed'): void`, '}>()', ''],
    emitCodeArr,
  )
  /** defineEmits end */

  /** const start */
  if (resolvedApiInfo.allApis.length) {
    for (const api of resolvedApiInfo.allApis) {
      const setName = `set${api.var.replace(/^query/, '')}Data`
      storeCodeSnippetOfDestructuringVar(setName, `${storeName}()`, definitionCodeArr)
    }
    storeCodeSnippets([''], definitionCodeArr)
  }

  if (formConfig?.useOtherForm) {
    let dashName = getFormOperationDashNameByUseOtherForm(formConfig.useOtherForm, findTable)
    storeCodeSnippets(
      [
        `const FormDetail = defineAsyncComponent(() => import('../${dashName}/components/form-detail/FormDetail.vue'))`,
      ],
      definitionCodeArr,
    )
  } else {
    storeCodeSnippets(
      [
        `const FormDetail = defineAsyncComponent(() => import('./components/form-detail/FormDetail.vue'))`,
      ],
      definitionCodeArr,
    )
  }
  storeCodeSnippets(
    ['const FormDetailRef = ref<InstanceType<typeof FormDetail>>()', ''],
    definitionCodeArr,
  )

  storeCodeSnippets(
    [
      'const show = ref(false)',
      'const loading = ref(false)',
      'const genInitForm = () => ({})',
      'const form = ref<Record<string, any>>(genInitForm())',
      '',
    ],
    definitionCodeArr,
  )

  storeCodeSnippets(
    [
      `const onConfirm = async () => {`,
      `${genSpace(2)}const valid = await FormDetailRef.value?.validate()`,
      `${genSpace(2)}if (!valid) return`,
      `${genSpace(2)}loading.value = true`,
      `${genSpace(2)}if (await ${transKeyToVar('table', operationItem.value ?? 'undefined')}(toSubmitData(form.value))) {`,
      `${genSpace(4)}ElMessage.success('${operationItem.label}成功')`,
      `${genSpace(4)}emit('succeed')`,
      `${genSpace(2)}}`,
      `${genSpace(2)}loading.value = false`,
      `${genSpace(2)}show.value = false`,
      `}`,
      '',
    ],
    definitionCodeArr,
  )

  storeCodeSnippets(
    [
      `const onClose = async () => {`,
      `${genSpace(2)}form.value = genInitForm()`,
      `${genSpace(2)}await sleep(50)`,
      `${genSpace(2)}FormDetailRef.value?.clearValidate()`,
      `}`,
      '',
    ],
    definitionCodeArr,
  )

  /** const open start */
  storeCodeSnippets([`const open = () => {`, `${genSpace(2)}show.value = true`], definitionCodeArr)
  for (const api of resolvedApiInfo.allApis) {
    const setName = `set${api.var.replace(/^query/, '')}Data`
    storeCodeSnippets([`${api.var}().then(res => ${setName}(res))`], definitionCodeArr)
  }
  storeCodeSnippets(['}', ''], definitionCodeArr)
  /** const open end */

  storeCodeSnippets([`defineExpose({`, `${genSpace(2)}open`, `})`], definitionCodeArr)
  /** const end */

  /** template start */
  storeCodeSnippets(
    [
      `${genSpace(2)}<el-dialog class="adaptive-dialog" v-model="show" title="${operationItem.label}" @close="onClose">`,
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
  operationItem: TableOperationsItem,
  components: MergeDesignData[],
) {
  // 提取数据
  const { name = '' } = options
  const { label, formConfig } = operationItem
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const storeName = `use${pascal(last(name.split('/'))!)}Store`
  const findSearch = components.find(e => e.type === 'Search') as SearchDesignData | undefined
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  const resolvedApiInfo = resolveApiFromFormConfig(findSearch, findTable)

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 存储emit代码
  const emitCodeArr: string[] = []
  // 存储组件定义代码
  const definitionCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []

  /** import start */
  if (!operationItem.readonly) {
    storeCodeSnippets(["import { sleep } from 'radash'"], importCodeArr)
  }
  const genImportApiNames = () => {
    const codeArr: string[] = []
    if (!operationItem.readonly) {
      codeArr.push(transKeyToVar('row', operationItem.value ?? 'undefined'))
    }
    for (const api of resolvedApiInfo.allApis) {
      codeArr.push(api.var)
    }
    return codeArr
  }
  storeCodeSnippets(
    [`import { ${genImportApiNames().join(',')} } from '@/api${base}'`],
    importCodeArr,
  )
  if (resolvedApiInfo.widgetListNeedDefineApi.length) {
    storeCodeSnippets([`import { ${storeName} } from '@/stores${base}'`], importCodeArr)
  }
  const genImportUtilsNames = () => {
    const codeArr: string[] = []
    codeArr.push('toRenderData')
    if (!operationItem.readonly) {
      codeArr.push('toSubmitData')
    }
    return codeArr
  }
  storeCodeSnippets(
    [`import { ${genImportUtilsNames().join(',')} } from '../../utils'`],
    importCodeArr,
  )
  /** import end */

  /** defineEmits start */
  if (!operationItem.readonly) {
    storeCodeSnippets(
      ['const emit = defineEmits<{', `${genSpace(2)}(e: 'succeed'): void`, '}>()', ''],
      emitCodeArr,
    )
  }
  /** defineEmits end */

  /** const start */
  if (resolvedApiInfo.allApis.length) {
    for (const api of resolvedApiInfo.allApis) {
      const setName = `set${api.var.replace(/^query/, '')}Data`
      storeCodeSnippetOfDestructuringVar(setName, `${storeName}()`, definitionCodeArr)
    }
    storeCodeSnippets([''], definitionCodeArr)
  }

  if (formConfig?.useOtherForm) {
    let dashName = getFormOperationDashNameByUseOtherForm(formConfig.useOtherForm, findTable)
    storeCodeSnippets(
      [
        `const FormDetail = defineAsyncComponent(() => import('../${dashName}/components/form-detail/FormDetail.vue'))`,
      ],
      definitionCodeArr,
    )
  } else {
    storeCodeSnippets(
      [
        `const FormDetail = defineAsyncComponent(() => import('./components/form-detail/FormDetail.vue'))`,
      ],
      definitionCodeArr,
    )
  }

  storeCodeSnippets(
    ['const FormDetailRef = ref<InstanceType<typeof FormDetail>>()', ''],
    definitionCodeArr,
  )

  storeCodeSnippets(['const show = ref(false)'], definitionCodeArr)
  if (!operationItem.readonly) {
    storeCodeSnippets(['const loading = ref(false)'], definitionCodeArr)
  }
  storeCodeSnippets(['const form = ref<Record<string, any>>({})', ''], definitionCodeArr)

  if (!operationItem.readonly) {
    storeCodeSnippets(
      [
        `const onConfirm = async () => {`,
        `${genSpace(2)}const valid = await FormDetailRef.value?.validate()`,
        `${genSpace(2)}if (!valid) return`,
        `${genSpace(2)}loading.value = true`,
        `${genSpace(2)}if (await ${transKeyToVar('row', operationItem.value ?? 'undefined')}(toSubmitData(form.value))) {`,
        `${genSpace(4)}ElMessage.success('${label}成功')`,
        `${genSpace(4)}emit('succeed')`,
        `${genSpace(2)}}`,
        `${genSpace(2)}loading.value = false`,
        `${genSpace(2)}show.value = false`,
        `}`,
        '',
      ],
      definitionCodeArr,
    )
  }

  if (!operationItem.readonly) {
    storeCodeSnippets(
      [
        `const onClose = async () => {`,
        `${genSpace(2)}form.value = {}`,
        `${genSpace(2)}await sleep(50)`,
        `${genSpace(2)}FormDetailRef.value?.clearValidate()`,
        `}`,
        '',
      ],
      definitionCodeArr,
    )
  }

  /** const open start */
  storeCodeSnippets(
    [
      `const open = (row: Record<string, any>) => {`,
      `${genSpace(2)}show.value = true`,
      `form.value = toRenderData(row)`,
    ],
    definitionCodeArr,
  )
  for (const api of resolvedApiInfo.allApis) {
    const setName = `set${api.var.replace(/^query/, '')}Data`
    storeCodeSnippets([`${api.var}().then(res => ${setName}(res))`], definitionCodeArr)
  }
  storeCodeSnippets(['}', ''], definitionCodeArr)
  /** const open end */

  storeCodeSnippets([`defineExpose({`, `${genSpace(2)}open`, `})`], definitionCodeArr)
  /** const end */

  /** template start */
  const genOnCloseProp = () => {
    if (!operationItem.readonly) {
      return `@close="onClose"`
    }
    return ''
  }
  const genDisabledProp = () => {
    if (operationItem.readonly) {
      return `disabled`
    }
    return ''
  }
  storeCodeSnippets(
    [
      `${genSpace(2)}<el-dialog class="adaptive-dialog" v-model="show" title="${label}" ${genOnCloseProp()}>`,
      `${genSpace(4)}<FormDetail ref="FormDetailRef" v-model="form" ${genDisabledProp()} />`,
    ],
    templateCodeArr,
  )
  if (!operationItem.readonly) {
    storeCodeSnippets(
      [
        `${genSpace(4)}<template #footer>`,
        `${genSpace(6)}<el-button @click="show = false">取消</el-button>`,
        `${genSpace(6)}<el-button type="primary" :loading="loading" @click="onConfirm">确定</el-button>`,
        `${genSpace(4)}</template>`,
      ],
      templateCodeArr,
    )
  }
  storeCodeSnippets([`${genSpace(2)}</el-dialog>`], templateCodeArr)
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

// 生成表单详情组件代码
function genFormDetailComponentCode(
  options: ViewDesignDataOptions,
  operationItem: TableOperationsItem,
  components: MergeDesignData[],
) {
  // 提取数据
  const { formConfig } = operationItem
  if (formConfig?.useOtherForm /** 使用其他表单无需生成代码 */) return
  const { name = '' } = options
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const form = formConfig?.data?.form
  const storeName = `use${pascal(last(name.split('/'))!)}Store`
  const findSearch = components.find(e => e.type === 'Search') as SearchDesignData | undefined
  const findTable = components.find(e => e.type === 'Table') as TableDesignData | undefined
  const resolvedApiInfo = resolveApiFromFormConfig(findSearch, findTable)
  const widgetListHasStaticData = getWidgetListHasStaticDataFromFormWidgetList(
    operationItem.formConfig?.data?.widgetList ?? [],
  )
  const widgetList = formConfig?.data?.widgetList ?? []

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
    ],
    importCodeArr,
  )
  if (widgetListHasStaticData.length) {
    const names = Array.from(
      new Set(widgetListHasStaticData.map(e => `${snake(title(e.idAlias)).toUpperCase()}_OPTIONS`)),
    )
    storeCodeSnippets(
      [`import { ${names.join(',')} } from '@/views${base}/constants'`, ''],
      importCodeArr,
    )
  }
  /** import end */

  /** defineProps start */
  storeCodeSnippets(['defineProps<{', 'disabled?: boolean', '}>()'], importCodeArr)
  /** defineProps end */

  /** const start */
  for (const widget of formConfig?.data?.widgetList ?? []) {
    if (['data-table', 'recursive-area'].includes(widget.type)) {
      const name = `${pascal(title(widget.idAlias ?? 'undefined'))}Model`
      storeCodeSnippets(
        [`const ${name} = defineAsyncComponent(() => import('./${name}.vue'))`],
        definitionCodeArr,
      )
    }
  }

  storeCodeSnippets(
    [
      '',
      'const formRef = ref<FormInstance>()',
      'const model = defineModel<Record<string, any>>({ default: () => ({}) })',
    ],
    definitionCodeArr,
  )
  if (resolvedApiInfo.allApis.length) {
    for (const api of resolvedApiInfo.allApis) {
      if (!resolvedApiInfo.innerApis.some(e => e.var === api.var)) {
        const name = `${camel(api.var.replace(/^query/, ''))}Data`
        storeCodeSnippetOfDestructuringVar(name, `storeToRefs(${storeName}())`, definitionCodeArr)
      }
    }
    storeCodeSnippets([''], definitionCodeArr)
  }

  if (
    widgetList.some(e =>
      [
        'radio',
        'checkbox',
        'select',
        'cascader',
        'date-picker',
        'datetime-picker',
        'time-picker',
      ].includes(e.type),
    )
  ) {
    storeCodeSnippets(
      [`const onChange = async (key: string, val: any) => { }`, ''],
      definitionCodeArr,
    )
  }

  storeCodeSnippets(
    [
      `const validate = async () => {`,
      `${genSpace(2)}return await formRef.value?.validate()`,
      `}`,
      '',
      `const clearValidate = () => {`,
      `${genSpace(2)}formRef.value?.clearValidate()`,
      `}`,
      '',
      `defineExpose({`,
      `${genSpace(2)}validate,`,
      `${genSpace(2)}clearValidate,`,
      `})`,
    ],
    definitionCodeArr,
  )
  /** const end */

  /** template start */
  storeCodeSnippets(
    [
      `${genSpace(2)}<el-form ref="formRef" :model label-position="${form?.labelPosition ?? 'left'}" label-width="${form?.labelWidth ?? 120}px" :disabled>`,
    ],
    templateCodeArr,
  )
  for (const items of genFormItemsCodeSnippets(widgetList, { space: 4 })) {
    storeCodeSnippets(items, templateCodeArr)
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
  const toArg = (method: Method) => `${method === 'GET' ? 'params' : 'data'}`
  const apiConfig = getApiConfigOfTable(findTable)
  const toUrl = (url?: string) => {
    if (url?.startsWith('/mock/example')) {
      return `${url}.json?t=${+new Date()}`
    }
    return url
  }
  codeArr.push(
    `export const queryTableList = async (${toArg(apiConfig?.method ?? 'GET')}: Record<string, any>) => {`,
    `${genSpace(2)}try {`,
    `${genSpace(4)}const { data: res } = await http({`,
    `${genSpace(6)}method: '${apiConfig?.method ?? 'GET'}',`,
    `${genSpace(6)}url: '${toUrl(apiConfig?.url)}',`,
  )
  codeArr.push(`${genSpace(6)}${toArg(apiConfig?.method ?? 'GET')}`)
  codeArr.push(
    `${genSpace(4)}})`,
    `${genSpace(4)}return res as Record<string, any>`,
    `${genSpace(2)}} catch (error) {`,
    `${genSpace(4)}console.error('queryTableList ->', error)`,
    `${genSpace(2)}}`,
    `}`,
    '',
  )
  for (const item of [
    ...getApiConfigOfTableOperations(findTable),
    ...getApiConfigOfTableColumnOperations(findTable),
  ]) {
    codeArr.push(
      `export const ${item.name} = async (${toArg(item.method ?? 'GET')}: Record<string, any>) => {`,
      `${genSpace(2)}try {`,
      `${genSpace(4)}await http({`,
      `${genSpace(6)}method: '${item.method}',`,
      `${genSpace(6)}url: '${toUrl(item.url)}',`,
    )
    codeArr.push(`${genSpace(6)}${toArg(item.method ?? 'GET')}`)
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
      `${genSpace(6)}method: '${item.method ?? 'GET'}',`,
      `${genSpace(6)}url: '${toUrl(item.url)}',`,
    )
    if (args.length) {
      codeArr.push(`${genSpace(6)}${toArg(item.method ?? 'GET')}: { ${args.join(',')} }`)
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

  const resolvedApiInfo = resolveApiFromFormConfig(findSearch, findTable)
  for (const item of resolvedApiInfo.widgetListNeedDefineApi) {
    const apiName = transKeyToVar('query', item.idAlias ?? 'undefined', 'list')
    codeArr.push(
      `export const ${apiName} = async () => {`,
      `${genSpace(2)}try {`,
      `${genSpace(4)}const { data: res } = await http({`,
      `${genSpace(6)}method: 'GET',`,
      `${genSpace(6)}url: '${toUrl(item.options.systemApi)}',`,
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
      ...resolveApiFromFormConfig(findSearch, findTable).widgetListNeedDefineApi.map(e =>
        transKeyToVar('query', e.idAlias ?? 'undefined', 'list'),
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
  codeArr.push('queryTableList')
  for (const item of tableOperationsNeedApi) {
    if (item.enableConfirmation /** 需二次确认的接口才会在view中调用  */) {
      codeArr.push(transKeyToVar('table', item.value ?? 'undefined'))
    }
  }
  for (const item of tableColumnOperationsNeedApi) {
    if (item.enableConfirmation /** 需二次确认的接口才会在view中调用  */) {
      codeArr.push(transKeyToVar('row', item.value ?? 'undefined'))
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
function genTableConfig(tableConfig: TableDesignData) {
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
      if (typeof item.enableConfirmation === 'boolean')
        codeArr.push(`${genSpace(6)}showPopconfirm: ${item.enableConfirmation},`)
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
    const { prop, formatterType, staticDataKey, isTreeData, format } = tableColumnItem
    if (formatterType === 'static_data_transform') {
      codeArr.push(
        `${genSpace(6)}<template #${prop}="{ row }">`,
        `${genSpace(8)}{{getLabelByValue(row.${prop}, ${staticDataKey})}}`,
        `${genSpace(6)}</template>`,
      )
    } else if (formatterType === 'dynamic_data_transform') {
      const optionsDataVarName = camel(transKeyToVar('', prop ?? 'undefined', 'list', 'data'))
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
  searchConditionItemsNeedStore?: SearchConditionItem[],
  tableColumnItemsNeedStore?: TableColumnItem[],
) {
  const codeArr: string[] = []
  if (searchConditionItemsNeedStore?.length) {
    codeArr.push(
      ...searchConditionItemsNeedStore.map(
        e => `${transKeyToVar('', e.key ?? 'undefined', 'list')}`,
      ),
    )
  }

  if (tableColumnItemsNeedStore?.length) {
    codeArr.push(
      ...tableColumnItemsNeedStore.map(e => `${transKeyToVar('', e.prop ?? 'undefined', 'list')}`),
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
      } else if (item.optionDataType === 'dynamic_data' /** 动态数据 */) {
        const apiName = transKeyToVar('', item.key ?? 'undefined', 'list')
        codeArr.push(`${genSpace(8)}options: async () => await get${apiName}Data()`)
      }
      break
    }
    case 'Cascader': {
      if (item.itemLabel) {
        codeArr.push(`${genSpace(8)}itemLabel: '${item.itemLabel}',`)
      }
      if (item.itemValue) {
        codeArr.push(`${genSpace(8)}itemValue: '${item.itemValue}',`)
      }
      if (item.itemChildren) {
        codeArr.push(`${genSpace(8)}itemChildren: '${item.itemChildren}',`)
      }
      if (typeof item.multiple === 'boolean') {
        codeArr.push(`${genSpace(8)}multiple: ${item.multiple},`)
      }
      const apiName = transKeyToVar('', item.key ?? 'undefined', 'list')
      codeArr.push(`${genSpace(8)}options: async () => await get${apiName}Data()`)
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
        e.optionDataType === 'dynamic_data' &&
        e.apiConfig?.method &&
        e.apiConfig?.url,
    ) ?? []
  )
}

function getApiNamesOfSearchConditionItems(findSearch?: SearchDesignData) {
  return (
    getSearchConditionItems(findSearch)
      ?.filter(e => e.optionDataType === 'dynamic_data' && e.apiConfig?.method && e.apiConfig?.url)
      ?.map(e => transKeyToVar('query', e.key ?? 'undefined', 'list')) ?? []
  )
}

function getApiConfigOfSearchConditionItems(findSearch?: SearchDesignData) {
  return (
    getSearchConditionItems(findSearch)
      ?.filter(e => e.optionDataType === 'dynamic_data' && e.apiConfig?.method && e.apiConfig?.url)
      ?.map(e => ({
        ...e.apiConfig,
        name: transKeyToVar('query', e.key ?? 'undefined', 'list'),
      })) ?? []
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
        (e.apiConfig?.method && e.apiConfig?.url) ||
        (e.echoApiConfig?.method && e.echoApiConfig?.url),
    ) ?? []
  )
}

function getApiConfigOfTableColumnItems(findTable?: TableDesignData) {
  return (
    getTableColumnItems(findTable)
      ?.filter(e => e.apiConfig?.method && e.apiConfig?.url)
      ?.map(e => ({
        ...e.apiConfig,
        name: transKeyToVar('query', e.prop ?? 'undefined', 'list'),
      })) ?? []
  )
}

function getApiConfigOfTableOperations(findTable?: TableDesignData) {
  return (
    getTableOperations(findTable)
      ?.filter(
        e =>
          (e.apiConfig?.method && e.apiConfig?.url) ||
          (e.echoApiConfig?.method && e.echoApiConfig?.url),
      )
      ?.map(e => ({ ...e.apiConfig, name: transKeyToVar('table', e.value ?? 'undefined') })) ?? []
  )
}

function getApiConfigOfTableColumnOperations(findTable?: TableDesignData) {
  return (
    getTableColumnOperations(findTable)
      ?.filter(
        e =>
          (e.apiConfig?.method && e.apiConfig?.url) ||
          (e.echoApiConfig?.method && e.echoApiConfig?.url),
      )
      ?.map(e => ({ ...e.apiConfig, name: transKeyToVar('row', e.value ?? 'undefined') })) ?? []
  )
}

function getTableColumnOperationsNeedApi(findTable?: TableDesignData) {
  return (
    getTableColumnOperations(findTable)?.filter(
      e =>
        (e.apiConfig?.method && e.apiConfig?.url) ||
        (e.echoApiConfig?.method && e.echoApiConfig?.url),
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

function getWidgetListHasStaticDataFromTable(findTable?: TableDesignData) {
  const widgetList: WidgetDesignData[] = []
  const operationItems = [
    ...getTableOperationsHasForm(findTable),
    ...getTableColumnOperationsHasForm(findTable),
  ]
  for (const operationItem of operationItems) {
    forofRecursive<WidgetDesignData>(
      operationItem.formConfig?.data?.widgetList ?? [],
      widget => {
        if (['radio', 'checkbox'].includes(widget.type)) {
          widgetList.push(widget)
        } else if (widget.type === 'select' && widget.options.dataSource === 'customize') {
          widgetList.push(widget)
        }
      },
      { children: 'widgetList' },
    )
  }
  return widgetList
}

export function getWidgetListHasStaticDataFromFormWidgetList(widgetList?: WidgetDesignData[]) {
  const _widgetList: WidgetDesignData[] = []
  for (const widget of widgetList ?? []) {
    if (['radio', 'checkbox'].includes(widget.type)) {
      _widgetList.push(widget)
    } else if (widget.type === 'select' && widget.options.dataSource === 'customize') {
      _widgetList.push(widget)
    }
  }
  return _widgetList
}

function getTableColumnItemsNeedStore(findTable?: TableDesignData) {
  return (
    getTableColumnItems(findTable)?.filter(
      e => e.formatterType === 'dynamic_data_transform' && e.apiConfig?.method && e.apiConfig?.url,
    ) ?? []
  )
}

function getApiNamesOfTableColumnItems(findTable?: TableDesignData) {
  return (
    getTableColumnItems(findTable)
      ?.filter(
        e =>
          e.formatterType === 'dynamic_data_transform' && e.apiConfig?.method && e.apiConfig?.url,
      )
      ?.map(e => transKeyToVar('query', e.prop ?? 'undefined', 'list')) ?? []
  )
}

function getFormOperationDashNameByUseOtherForm(
  useOtherFormId: string,
  findTable?: TableDesignData,
) {
  let dashName: string | undefined
  const tableOperationsHasForm = getTableOperationsHasForm(findTable)
  const findFromtableOperationsHasForm = tableOperationsHasForm.find(e => e.id === useOtherFormId)
  if (findFromtableOperationsHasForm) {
    dashName = `table-${dash(findFromtableOperationsHasForm.value ?? 'undefined')}`
  } else {
    const tableColumnOperationsHasForm = getTableColumnOperationsHasForm(findTable)
    const findFromtableColumnOperationsHasForm = tableColumnOperationsHasForm.find(
      e => e.id === useOtherFormId,
    )
    if (findFromtableColumnOperationsHasForm) {
      dashName = `row-${dash(findFromtableColumnOperationsHasForm.value ?? 'undefined')}`
    }
  }
  return dashName
}

function resolveApiFromFormConfig(findSearch?: SearchDesignData, findTable?: TableDesignData) {
  const widgetListNeedDefineApi: WidgetDesignData[] = []
  const allApis: { var: string; url: string }[] = []
  const innerApis: { var: string; url: string }[] = []
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

  // 从配置的表单控件中筛选出接口信息
  for (const item of operationsHasForm) {
    forofRecursive<WidgetDesignData>(
      item.formConfig?.data?.widgetList ?? [],
      (widget, parent) => {
        if (['select', 'cascader'].includes(widget.type) && widget.options?.systemApi) {
          let apiObj
          const find = apiConfigItems.find(
            e => e.name === transKeyToVar('query', widget.idAlias ?? 'undefined', 'list'),
          )
          if (find /** 判断表单中配置的接口是否已定义 */) {
            apiObj = { var: find.name, url: find.url }
          } else {
            apiObj = {
              var: transKeyToVar('query', widget.idAlias ?? 'undefined', 'list'),
              url: widget.options?.systemApi,
            }
            widgetListNeedDefineApi.push(widget)
          }
          allApis.push(apiObj)

          if (parent?.type && ['data-table', 'recursive-area'].includes(parent.type)) {
            innerApis.push(apiObj)
          }
        }
      },
      { children: 'widgetList' },
    )
  }
  return {
    widgetListNeedDefineApi,
    allApis,
    innerApis,
  }
}
