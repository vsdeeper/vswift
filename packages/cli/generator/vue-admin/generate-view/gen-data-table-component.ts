import type { WidgetDesignData } from 'vswift-form'
import type { ViewDesignDataOptions } from 'visual-development'
import { camel, dash, last, pascal, title } from 'radash'
import {
  storeCodeSnippetOfDestructuringVar,
  storeCodeSnippets,
  transKeyToVar,
} from '../../utils.js'
import { getWidgetListHasStaticDataFromFormConfig } from './utils.js'
import { genFormItemsCodeSnippets } from '../utils/gen-form-items.js'

export const genDataTableComponent = (options: ViewDesignDataOptions, widget: WidgetDesignData) => {
  const { name = '' } = options
  const base = `${name.startsWith('/') ? name : `/${name}`}`
  const storeName = `use${pascal(last(name.split('/'))!)}Store`
  const widgetListHasStaticData = getWidgetListHasStaticDataFromFormConfig(widget.widgetList ?? [])

  // 存储组件导入代码
  const importCodeArr: string[] = []
  // 存储组件定义代码
  const definitionCodeArr: string[] = []
  // 存储template代码
  const templateCodeArr: string[] = []
  // 存储style代码
  const styleCodeArr: string[] = []

  /** import start */
  storeCodeSnippets(
    [
      `import { ${storeName} } from '@/stores${base}'`,
      `import { SemiSelect } from '@element-plus/icons-vue'`,
    ],
    importCodeArr,
  )
  if (widgetListHasStaticData.length) {
    const names = Array.from(
      new Set(widgetListHasStaticData.map(e => `${e.idAlias?.toUpperCase()}_OPTIONS`)),
    )
    storeCodeSnippets(
      [`import { ${names.join(',')} } from '../../../../constants'`, ''],
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
  const widgetListNeedDefineApi = widget.widgetList?.filter(e =>
    ['select', 'cascader'].includes(e.type),
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
  storeCodeSnippets(
    [`<div class="${dash(title(widget.idAlias).toLowerCase())}-model">`],
    templateCodeArr,
  )
  storeCodeSnippets([`<el-table :data="model" border stripe>`], templateCodeArr)
  const formItemsCodeSnippets = genFormItemsCodeSnippets(widget.widgetList ?? [], {
    model: 'row',
    recursive: true,
  })
  widget.widgetList?.map((item, index) => {
    storeCodeSnippets(
      [
        `<el-table-column prop="${item.idAlias}" label="${item.options.label}">`,
        `<template #default="{ row, $index }">`,
      ],
      templateCodeArr,
    )
    storeCodeSnippets(formItemsCodeSnippets[index], templateCodeArr)
    storeCodeSnippets([`</template>`, `</el-table-column>`], templateCodeArr)
  })
  storeCodeSnippets(
    [
      `<el-table-column label="操作" width="80px" fixed="right">`,
      `<template #default="{ $index }">`,
      `<el-button type="danger" size="small" :icon="SemiSelect" circle @click="onDelete($index)" />`,
      `</template>`,
      `</el-table-column>`,
    ],
    templateCodeArr,
  )
  storeCodeSnippets([`</el-table>`], templateCodeArr)
  storeCodeSnippets(
    [`<el-button class="add-btn" type="primary" @click="onAdd">`, '+ 新增', `</el-button>`],
    templateCodeArr,
  )
  storeCodeSnippets([`</div>`], templateCodeArr)
  /** template end */

  /** style start */
  storeCodeSnippets([`.add-btn {`, `width: 100%;`, `margin-top: 5px;`, `}`], styleCodeArr)
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
