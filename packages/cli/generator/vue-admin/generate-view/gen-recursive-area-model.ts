import type { WidgetDesignData } from 'vswift-form'
import type { ViewDesignDataOptions } from 'visual-development'
import { camel, dash, last, pascal, snake, title } from 'radash'
import {
  forinRecursive,
  forofRecursive,
  genConstName,
  storeCodeSnippetOfDestructuringVar,
  storeCodeSnippets,
  transKeyToVar,
} from '../../utils.js'
import { getWidgetListHasStaticDataFromFormWidgetList } from './utils.js'
import { genFormItemsCodeSnippets } from '../utils/gen-form-items.js'

export const genRecursiveAreaModel = (options: ViewDesignDataOptions, widget: WidgetDesignData) => {
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
    const names = widgetListHasStaticData.map(e => genConstName(e.idAlias ?? 'undefined'))
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

  /** defineAsyncComponent start */
  for (const item of widget.widgetList ?? []) {
    if (['data-table', 'recursive-area'].includes(item.type)) {
      const suffix = `Of${pascal(title(widget.idAlias))}`
      const name = `${pascal(title(item.idAlias ?? 'undefined'))}${suffix}Model`
      storeCodeSnippets(
        [`const ${name} = defineAsyncComponent(() => import('./${name}.vue'))`],
        definitionCodeArr,
      )
    }
  }
  /** defineAsyncComponent end */

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
  const genInitObj = (widgetList?: WidgetDesignData[]) => {
    if (!widgetList?.length) return {}
    const obj = {}
    forofRecursive<WidgetDesignData>(widgetList, (widget, parent) => {
      if (['data-table', 'recursive-area'].includes(widget.type)) {
        if (parent) {
          forinRecursive(obj, (key, parent1) => {
            if (key === widget.idAlias) {
              parent1 && (parent1[key] = [])
              return
            }
          })
        } else {
          obj[widget.idAlias ?? 'undefined'] = []
        }
      }
    })
    return JSON.stringify(obj)
  }
  storeCodeSnippets(
    [`const onAdd = () => {`, `model.value.push(${genInitObj(widget.widgetList)})`, `}`, ''],
    definitionCodeArr,
  )
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
  const formItemsCodeSnippets = genFormItemsCodeSnippets(widget.widgetList ?? [], {
    model: 'item',
    recursive: true,
    where: 'recursive-area',
    suffix: `Of${pascal(title(widget.idAlias))}`,
  })
  storeCodeSnippets(
    [
      `<el-card v-for="(item, index) in model" :key="'card' + index" shadow="hover">`,
      `<template #header>`,
      `<div>{{ index + 1 }}-${widget.options.label}</div>`,
      `<el-button type="danger" size="small" :icon="SemiSelect" circle @click="onDelete(index)" />`,
      `</template>`,
    ],
    templateCodeArr,
  )
  for (const items of formItemsCodeSnippets) {
    storeCodeSnippets(items, templateCodeArr)
  }
  storeCodeSnippets(
    [
      `</el-card>`,
      `<el-divider v-if="!model?.length" class="nodata">暂无数据</el-divider>`,
      `<el-button type="primary" @click="onAdd">+ 新增</el-button>`,
      '</div>',
    ],
    templateCodeArr,
  )
  /** template end */

  /** style start */
  storeCodeSnippets(
    [
      `.${className} {`,
      `width: 100%;`,
      `& > div[class*="-card"] {`,
      `& + div[class*="-card"] {`,
      `margin-top: 8px;`,
      `}`,
      `:deep(div[class*='-card__header']) {`,
      `display: flex;`,
      `align-items: center;`,
      `justify-content: space-between;`,
      `line-height: 1;`,
      `padding: 12px;`,
      `}`,
      `div[class*='-form-item'] {`,
      `margin-bottom: 18px;`,
      `}`,
      `}`,
      `& > button[class*='-button'] {`,
      `width: 100%;`,
      `margin-top: 12px;`,
      `}`,
      `}`,
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
