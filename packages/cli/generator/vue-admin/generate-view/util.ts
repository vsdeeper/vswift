import consola from 'consola'
import { camel, dash, last, pascal } from 'radash'

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
    codeArr.push('useAppSettingDataStore')
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
    codeArr.push('useApi')
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
  findSearch: Record<string, any>,
  findTable: Record<string, any>,
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
