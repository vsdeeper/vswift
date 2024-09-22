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
  const codeArr: string[] = ['const search = ref<VsSearchProps>({']
  const findSearch = components.find(e => e.type === 'Search')
  if (findSearch) {
    const { options } = findSearch
    if (options.labelWidth) {
      codeArr.push(`labelWidth: '${options.labelWidth}px',`)
    }
    codeArr.push('options: [')
    for (const item of options.searchConditionItems) {
      codeArr.push(
        `{ id: ${item.key}, type: ${item.type}, label: ${item.label}, props: {} as S${pascal(item.type)}Props }`,
      )
    }
    codeArr.push('})')
  }
  return codeArr
}
