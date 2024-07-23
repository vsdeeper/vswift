import { type TreeKey } from 'element-plus/es/components/tree/src/tree.type'
import VsTreeSelect from './vs-tree-select.vue'

export type VsTreeSelectValueItem = TreeKey | Record<string, any>
export type VsTreeSelectValue = VsTreeSelectValueItem | VsTreeSelectValueItem[]
export interface VsTreeSelectProps {
  modelValue?: VsTreeSelectValue
  options?: Record<string, any>[] // 可选数据
  sourceOptions?: Record<string, any>[] // 全量数据，包含禁用状态
  title?: string
  lazy?: boolean
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  virtualized?: boolean // 是否使用虚拟tree组件
  checkStrictly?: boolean
  itemLabel?: string
  itemValue?: string
  itemChildren?: string
  returnObject?: boolean // 返回TreeKey还是Record<string, any>
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  appendToBody?: boolean
  filterValue?: (data: Record<string, any>[]) => Record<string, any>[]
  icon?: any
}
export type VsTreeSelectInstance = InstanceType<typeof VsTreeSelect>
export { VsTreeSelect }
