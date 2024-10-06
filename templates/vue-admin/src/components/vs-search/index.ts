import VsSearch from './vs-search.vue'

export * from './components'

export interface VsSearchOptionItem {
  // 唯一标识，与后端交互字段名称
  id: string
  // 组件类型
  type?: 'input' | 'select' | 'cascader' | 'date' | 'time' | 'tree-select'
  label?: string
  // el组件的源属性设置或其他自定义属性
  props?: Record<string, any>
}
export type VsSearchOptions = VsSearchOptionItem[]
export type VsSearchInstance = InstanceType<typeof VsSearch>
export interface VsSearchProps {
  options?: VsSearchOptions
  labelWidth?: string | number
  showDividerLine?: boolean
  [key: string]: any
}
export { VsSearch }
