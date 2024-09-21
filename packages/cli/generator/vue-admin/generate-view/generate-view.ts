import { $ } from 'execa'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { pathExistsSync } from 'fs-extra/esm'
import handlebars from 'handlebars'
import path from 'path'
import { camel, dash, last, pascal } from 'radash'
import { parseConfig } from '../../../utils/index.js'
import consola from 'consola'
import chalk from 'chalk'

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
  const code = `${generateScript(configData)}`
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

function generateScript(configData: Record<string, any>) {
  const { components } = configData
  return `<script setup lang="ts">
          ${generateImportVswiftComponents(components)}
          ${generateImportDateFns(components)}
          ${generateImportStoresGlobal(components)}
          ${generateImportConstants(components)}
          ${generateImportUtils(components)}
          ${generateImportApi(configData)}
          ${generateImportStores(configData)}

          ${generateAsyncComponentImports(components)}
          ${generateUseStoreConst(configData)}
          </script>`
}

function generateImportVswiftComponents(components: Record<string, any>[]) {
  const compile = handlebars.compile('{{ImportVswiftComponentsType components}}')
  const code = compile({ components })
  if (code) {
    return `import type { ${code} } from '@vswift/components'`
  }
  return ''
}

function generateImportStoresGlobal(components: Record<string, any>[]) {
  const compile = handlebars.compile('{{ImportStoresGlobal components}}')
  const code = compile({ components })
  if (code) {
    return `import { ${code} } from '@/stores/global'`
  }
  return ''
}

function generateImportConstants(components: Record<string, any>[]) {
  const compile = handlebars.compile('{{ImportConstants components}}')
  const code = compile({ components })
  if (code) {
    return `import { ${code} } from './constants'`
  }
  return ''
}

function generateImportDateFns(components: Record<string, any>[]) {
  const compile = handlebars.compile('{{ImportDateFns components}}')
  const code = compile({ components })
  if (code) {
    return `import { ${code} } from 'date-fns'`
  }
  return ''
}

function generateImportUtils(components: Record<string, any>[]) {
  const compile = handlebars.compile('{{ImportUtils components}}')
  const code = compile({ components })
  if (code) {
    return `import { ${code} } from '@/utils'`
  }
  return ''
}

function generateImportApi(configData: Record<string, any>) {
  const { components, options } = configData
  const compile = handlebars.compile('{{ImportApi components}}')
  const code = compile({ components })
  if (code) {
    if (!options.name) {
      consola.error(`视图名称未配置 -> id=${configData.id}`)
      return
    }
    return `import { ${code} } from '@/api/'${options.name}`
  }
  return ''
}

function generateImportStores(configData: Record<string, any>) {
  const { options } = configData
  if (!options.name) {
    consola.error(`视图名称未配置 -> id=${configData.id}`)
    return
  }
  return `import { use${pascal(last(options.name.split('/'))!)}Store } from '@/stores/'${options.name}`
}

function generateAsyncComponentImports(components: Record<string, any>[]) {
  const compile = handlebars.compile('{{AsyncComponentImports components}}')
  const code = compile({ components })
  return code || ''
}

function generateUseStoreConst(configData: Record<string, any>) {
  const { components, options } = configData
  const compile = handlebars.compile('{{UseStoreConst components}}')
  const code = compile({ components })
  if (code) {
    if (!options.name) {
      consola.error(`视图名称未配置 -> id=${configData.id}`)
      return
    }
    return `const { ${code} } = use${pascal(last(options.name.split('/'))!)}Store()`
  }
  return ''
}

// 以下定义handlebars helper
handlebars.registerHelper('ImportVswiftComponentsType', (components: Record<string, any>[]) => {
  const codeArr: string[] = []
  if (components.some(e => e.type === 'Search')) {
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
  return codeArr.join(',')
})

handlebars.registerHelper('ImportStoresGlobal', (components: Record<string, any>[]) => {
  const codeArr: string[] = []
  const filterTables = components.filter(e => e.type === 'Table')
  if (filterTables.some(e => e.options.showPagination)) {
    codeArr.push('useAppSettingDataStore')
  }
  return codeArr.join(',')
})

handlebars.registerHelper('ImportConstants', (components: Record<string, any>[]) => {
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

  codeArr.push(
    ...Array.from(new Set(staticDataKeyArrInSearch)),
    ...Array.from(new Set(staticDataKeyArrInTable)),
  )

  return codeArr.join(',')
})

handlebars.registerHelper('ImportDateFns', (components: Record<string, any>[]) => {
  const codeArr: string[] = []
  const tableColumnItems = components
    .filter(e => e.type === 'Table')
    .reduce((pre: Record<string, any>[], cur) => {
      return [...pre, ...(cur.options.tableColumnItems ?? [])]
    }, [])
  if (tableColumnItems.some(e => e.formatterType === 'date_format')) {
    codeArr.push('format')
  }
  return codeArr.join(',')
})

handlebars.registerHelper('ImportUtils', (components: Record<string, any>[]) => {
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
  return codeArr.join(',')
})

handlebars.registerHelper('ImportApi', (components: Record<string, any>[]) => {
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

  return codeArr.join(',')
})

handlebars.registerHelper('AsyncComponentImports', (components: Record<string, any>[]) => {
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

  return [
    ...codeArr.map(
      e =>
        `const ${camel(e)} = defineAsyncComponent(() => import('./components/${e}/${pascal(e)}.vue'))`,
    ),
    ...codeArr.map(e => `const ${pascal(e)}Ref = ref<${pascal(e)}Instance>()`),
  ].join('\n')
})

handlebars.registerHelper('UseStoreConst', (components: Record<string, any>[]) => {
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

  return codeArr.map(e => `get${pascal(e)}`).join(',')
})
