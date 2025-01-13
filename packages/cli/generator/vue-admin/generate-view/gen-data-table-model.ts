import type { WidgetDesignData } from 'vswift-form'
import type { ViewDesignDataOptions } from 'visual-development'
import { camel, dash, last, pascal, snake, title } from 'radash'
import {
  storeCodeSnippetOfDestructuringVar,
  storeCodeSnippets,
  transKeyToVar,
} from '../../utils.js'
import { getWidgetListHasStaticDataFromFormWidgetList } from './utils.js'
import { genFormItemsCodeSnippets } from '../utils/gen-form-items.js'

export const genDataTableModel = (options: ViewDesignDataOptions, widget: WidgetDesignData) => {
  const { name = '' } = options
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const storeName = `use${pascal(last(name.split('/'))!)}Store`
  const widgetListHasStaticData = getWidgetListHasStaticDataFromFormWidgetList(
    widget.widgetList ?? [],
  )
  const widgetListNeedDefineApi = widget.widgetList?.filter(
    e => e.type === 'cascader' || (e.type === 'select' && e.options.dataSource === 'systemApi'),
  )

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 存储组件定义代码
  const definitionCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []
  // 存储style代码
  const styleCodeArr: string[] = []

  /** import start */
  if (widgetListNeedDefineApi?.length) {
    storeCodeSnippets([`import { ${storeName} } from '@/stores${base}'`], importCodeArr)
  }
  storeCodeSnippets([`import { SemiSelect } from '@element-plus/icons-vue'`], importCodeArr)
  if (widgetListHasStaticData.length) {
    const names = widgetListHasStaticData.map(
      e => `${snake(title(e.idAlias)).toUpperCase()}_OPTIONS`,
    )
    storeCodeSnippets(
      [`import { ${names.join(',')} } from '@/views${base}/constants'`, ''],
      importCodeArr,
    )
  }
  /** import end */

  /** defineProps start */
  storeCodeSnippets(
    [`const props = defineProps<{`, `formItemProp: string`, `}>()`, ''],
    definitionCodeArr,
  )
  /** defineProps end */

  /** const start */
  storeCodeSnippets(
    ['const model = defineModel<Record<string, any>[]>({ default: () => [] })'],
    definitionCodeArr,
  )
  if (widgetListNeedDefineApi?.length) {
    for (const item of widgetListNeedDefineApi) {
      const name = camel(transKeyToVar('', item.idAlias ?? 'undefined', 'list', 'data'))
      storeCodeSnippetOfDestructuringVar(name, `storeToRefs(${storeName}())`, definitionCodeArr)
    }
    storeCodeSnippets([''], definitionCodeArr)
  }

  if (
    widget.widgetList?.some(e =>
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
    [`const onDelete = (index: number) => {`, `model.value.splice(index, 1)`, `}`, ''],
    definitionCodeArr,
  )
  storeCodeSnippets([`const onAdd = () => {`, `model.value.push({})`, `}`, ''], definitionCodeArr)
  storeCodeSnippets(
    [
      `const genFormItemProp = (prop: string) => {`,
      'return `${props.formItemProp}.${prop}`',
      '}',
      '',
    ],
    definitionCodeArr,
  )
  /** const end */

  /** template start */
  const className = `${dash(title(widget.idAlias).toLowerCase())}-model`
  storeCodeSnippets([`<div class="${className}">`], templateCodeArr)
  storeCodeSnippets([`<el-table :data="model" border stripe>`], templateCodeArr)
  const formItemsCodeSnippets = genFormItemsCodeSnippets(widget.widgetList ?? [], {
    model: 'row',
    recursive: true,
    where: 'data-table',
  })
  widget.widgetList?.map((item, index) => {
    storeCodeSnippets(
      [
        `<el-table-column prop="${item.idAlias}">`,
        `<template #header>`,
        `<el-text type="danger" style="margin-right: 4px;">*</el-text>${item.options.label}`,
        `</template>`,
        `<template #default="{ row, $index: index }">`,
      ],
      templateCodeArr,
    )
    storeCodeSnippets(formItemsCodeSnippets[index], templateCodeArr)
    storeCodeSnippets([`</template>`, `</el-table-column>`], templateCodeArr)
  })
  storeCodeSnippets(
    [
      `<el-table-column label="操作" width="70px" fixed="right">`,
      `<template #default="{ $index: index }">`,
      `<el-button type="danger" size="small" :icon="SemiSelect" circle @click="onDelete(index)" />`,
      `</template>`,
      `</el-table-column>`,
    ],
    templateCodeArr,
  )
  storeCodeSnippets([`</el-table>`], templateCodeArr)
  storeCodeSnippets(
    [`<el-button type="primary" @click="onAdd">`, '+ 新增', `</el-button>`],
    templateCodeArr,
  )
  storeCodeSnippets([`</div>`], templateCodeArr)
  /** template end */

  /** style start */
  storeCodeSnippets(
    [
      `.${className} {`,
      'width: 100%;',
      "& > button[class*='-button'] {",
      'width: 100%;',
      'margin-top: 12px;',
      '}',
      '}',
    ],
    styleCodeArr,
  )
  /** style end */

  const _scriptCodeArr = [
    `<script setup lang="ts">`,
    ...importCodeArr,
    '',
    ...definitionCodeArr,
    `</script>`,
  ]
  const _templateCodeArr = [`<template>`, ...templateCodeArr, `</template>`]
  const _styleCodeArr = [`<style lang="scss" scoped>`, ...styleCodeArr, `</style>`]

  return [..._scriptCodeArr, '', ..._templateCodeArr, '', ..._styleCodeArr].join('\n')
}
