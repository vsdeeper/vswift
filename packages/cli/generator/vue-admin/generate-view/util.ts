import { camel, dash, last, pascal } from 'radash'

export function getVswiftComponentsTypeImports(components: Record<string, any>[]) {
  const codeArr: string[] = []
  if (components.some((e: Record<string, any>) => e.type === 'Search')) {
    codeArr.push('VsSearchProps')
    const filterSearch = components.filter(e => e.type === 'Search')
    const searchConditionItems = filterSearch.reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.searchConditionItems ?? [])]
    }, [])
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
  if (components.some(e => e.type === 'Table')) {
    codeArr.push('VsTableInstance', 'VsTableProps')
  }
  return codeArr
}

export function getDateFnsImports(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const tableColumnItems = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableColumnItems ?? [])]
    }, [])

  if (tableColumnItems.some(e => e.formatterType === 'date_format')) {
    codeArr.push('format')
  }
  return codeArr
}

export function getStoresGlobalImports(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const filterTables = components.filter(e => e.type === 'Table')
  const tableOperationsHasPermissionCode = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableOperations ?? [])]
    }, [])
    .filter(e => !!e.code)
  const tableColumnOperationsHasPermissionCode = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableColumnOperations ?? [])]
    }, [])
    .filter(e => !!e.code)

  if (filterTables.some(e => e.options.showPagination)) {
    codeArr.push('useAppSettingDataStore')
  }
  if (tableOperationsHasPermissionCode.length || tableColumnOperationsHasPermissionCode.length) {
    codeArr.push('permissionCodes')
  }
  return codeArr
}

export function getConstantsImports(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const staticDataKeyArrInSearch = components
    .filter(e => e.type === 'Search')
    .reduce((pre: string[], cur) => {
      return [
        ...pre,
        ...(cur.options.searchConditionItems
          ?.filter(
            (a: Record<string, any>) => a.optionDataType === 'static_data' && !!a.staticDataKey,
          )
          ?.map((b: Record<string, any>) => b.staticDataKey) ?? []),
      ]
    }, [])
  const staticDataKeyArrInTable = components
    .filter(e => e.type === 'Table')
    .reduce((pre: string[], cur) => {
      return [
        ...pre,
        ...(cur.options.tableColumnItems
          ?.filter(
            (a: Record<string, any>) =>
              a.formatterType === 'static_data_transform' && !!a.staticDataKey,
          )
          ?.map((b: Record<string, any>) => b.staticDataKey) ?? []),
      ]
    }, [])

  const toDeduplicateStaticDataKeyArrInSearch = Array.from(new Set(staticDataKeyArrInSearch))
  const toDeduplicateStaticDataKeyArrInTable = Array.from(new Set(staticDataKeyArrInTable))

  if (toDeduplicateStaticDataKeyArrInSearch.length) {
    codeArr.push(...toDeduplicateStaticDataKeyArrInSearch)
  }

  if (toDeduplicateStaticDataKeyArrInTable.length) {
    codeArr.push(...toDeduplicateStaticDataKeyArrInTable)
  }

  return codeArr
}

export function getUtilsImports(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const tableColumnItems = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableColumnItems ?? [])]
    }, [])
  if (tableColumnItems.some(e => e.formatterType === 'dynamic_data_transform' && e.isTreeData)) {
    codeArr.push('findArraryValueFromTreeData')
  }
  if (
    tableColumnItems.some(e => e.formatterType === 'dynamic_data_transform' && !e.isTreeData) ||
    tableColumnItems.some(e => e.formatterType === 'static_data_transform' && !!e.staticDataKey)
  ) {
    codeArr.push('getLabelByValue')
  }
  return codeArr
}

export function getApiImports(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const tableOperationsNeedApi = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableOperations ?? [])]
    }, [])
    .filter(
      e =>
        (e.apiConfig?.method && e.apiConfig?.url) ||
        (e.echoApiConfig?.method && e.echoApiConfig?.url),
    )

  const tableColumnOperationsNeedApi = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableColumnOperations ?? [])]
    }, [])
    .filter(
      e =>
        (e.apiConfig?.method && e.apiConfig?.url) ||
        (e.echoApiConfig?.method && e.echoApiConfig?.url),
    )
  if (tableOperationsNeedApi.length) {
    for (const item of tableOperationsNeedApi) {
      if (item.apiConfig?.method && item.apiConfig?.url) {
        codeArr.push(item.apiConfig.name || last(item.apiConfig.url.split('/')))
      }
      if (item.echoApiConfig?.method && item.echoApiConfig?.url) {
        codeArr.push(item.echoApiConfig.name || last(item.echoApiConfig.url.split('/')))
      }
    }
  }
  if (tableColumnOperationsNeedApi.length) {
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

export function getAsyncComponentConst(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const tableOperationsHasForm = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableOperations ?? [])]
    }, [])
    .filter(e => !!e.formConfig)

  const tableColumnItemsHasForm = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableColumnItems ?? [])]
    }, [])
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.tableColumnItems?.length ? [cur, ...cur.tableColumnItems] : [cur])]
    }, [])
    .filter(e => !!e.formConfig)

  if (tableOperationsHasForm.length) {
    codeArr.push(...tableOperationsHasForm.map(e => `table-${dash(e.value)}`))
  }

  if (tableColumnItemsHasForm.length) {
    codeArr.push(...tableColumnItemsHasForm.map(e => `row-${dash(e.value)}`))
  }

  return codeArr
}

export function getUseStoreConst(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const searchConditionItemsNeedStore = components
    .filter(e => e.type === 'Search')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.searchConditionItems ?? [])]
    }, [])
    .filter(
      e =>
        ['Select', 'Cascader'].includes(e.type) &&
        e.optionDataType === 'definition' &&
        e.dataSource === 'api' &&
        e.apiConfig?.method &&
        e.apiConfig?.url,
    )
  const tableColumnItemsNeedStore = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableColumnItems ?? [])]
    }, [])
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.tableColumnItems?.length ? [cur, ...cur.tableColumnItems] : [cur])]
    }, [])
    .filter(
      e => e.formatterType === 'dynamic_data_transform' && e.apiConfig?.method && e.apiConfig?.url,
    )

  if (searchConditionItemsNeedStore.length) {
    codeArr.push(
      ...searchConditionItemsNeedStore.map(
        e => e.apiConfig.name || last(e.apiConfig.url.split('/')),
      ),
    )
  }

  if (tableColumnItemsNeedStore.length) {
    codeArr.push(
      ...tableColumnItemsNeedStore.map(e => e.apiConfig.name || last(e.apiConfig.url.split('/'))),
    )
  }

  return codeArr.map(e => `${camel(e)}Data`)
}

export function getUseUserInfoStoreConst(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const tableOperationsHasPermissionCode = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableOperations ?? [])]
    }, [])
    .filter(e => !!e.code)
  const tableColumnOperationsHasPermissionCode = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableColumnOperations ?? [])]
    }, [])
    .filter(e => !!e.code)
  if (tableOperationsHasPermissionCode.length || tableColumnOperationsHasPermissionCode.length) {
    codeArr.push('permissionCodes')
  }
  return codeArr
}

export function getParams(components: Record<string, any>[]) {
  const codeArr: string[] = ['const params = ref<PagingParams>({']
  const filterTables = components.filter(e => e.type === 'Table')
  if (filterTables.some(e => e.options.showPagination)) {
    codeArr.push('pageIndex: 1,', 'pageSize: getPageSize()')
  }
  codeArr.push('})')
  return codeArr
}

export function getSearch(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const findSearch = components.find(e => e.type === 'Search')
  if (findSearch) {
    codeArr.push('const search = ref<VsSearchProps>({')
    const { options } = findSearch
    if (options.labelWidth) {
      codeArr.push(`labelWidth: '${options.labelWidth}px',`)
    }
    codeArr.push('options: [')
    for (const item of options.searchConditionItems) {
      codeArr.push(
        `{ id: ${item.key}, type: ${item.type}, label: ${item.label}, props: { ${transPropsForSearch(item).join('\n')} } as S${pascal(item.type)}Props }`,
      )
    }
    codeArr.push(']')
    codeArr.push('})')
  }
  return codeArr
}

export function getTable(components: Record<string, any>[]) {
  const codeArr: string[] = []
  const findTable = components.find(e => e.type === 'Table')
  if (findTable) {
    codeArr.push('const TableRef = ref<VsTableInstance>()')
    codeArr.push('const table = ref<Partial<VsTableProps>>({')
    codeArr.push('loading: false,')
    const { options } = findTable
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
      codeArr.push('columns: [')
      // TODO 子表列
      for (const item of options.tableColumnItems) {
        codeArr.push(
          `{
            label: ${item.label},
            prop: ${item.prop},
            ${item.width ? `width: ${item.width},` : ''}
          }`,
        )
      }
      codeArr.push('],')
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

    codeArr.push('})')
  }
  return codeArr
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
