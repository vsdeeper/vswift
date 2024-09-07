import { $ } from 'execa'
import { readFileSync, writeFileSync } from 'fs'
import { pathExistsSync } from 'fs-extra/esm'
import handlebars from 'handlebars'
import path from 'path'
import { pascal } from 'radash'
import { parseConfig } from '../../utils/index.js'
import consola from 'consola'
import chalk from 'chalk'

export async function generateView(dest: string, fileName: string) {
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
  const filePath = path.resolve(dest, `src/views/${viewName}/${pascal(viewName)}.vue`)
  writeFileSync(filePath, code)
  await $({ shell: true })`pnpm prettier ${filePath} --write`
}

function generateScript(configData: Record<string, any>) {
  const { components } = configData
  return `<script setup lang="ts">
          ${generateImportStoresGlobal(components)}
          ${generateImportVswiftComponents(components)}
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
