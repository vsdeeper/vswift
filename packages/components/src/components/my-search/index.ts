import MySearch from './my-search.vue'

export interface MySearchOptionItem {
  // 唯一标识，与后端交互字段名称
  id: string
  // 组件类型
  type:
    | 'input'
    | 'select'
    | 'cascader'
    | 'date'
    | 'month'
    | 'daterange'
    | 'datetimerange'
    | 'my-tree-select'
  placeholder?: string
  // 选择范围使用
  startPlaceholder?: string
  endPlaceholder?: string
  // 默认值
  defaultValue?: unknown
  // YYYY-MM-DD HH:mm:ss | x(时间戳)
  valueFormat?: string
  // 选项数据源，可从接口异步获取
  options?: Record<string, any>[] | ((data?: unknown) => Promise<Record<string, any>[]>)
  // 选项数据，label别名，默认label
  label?: string
  // 选项数据，value别名，默认value
  value?: string
  // 选项数据，children别名，默认children
  children?: string
  // 多选
  multiple?: boolean
  // 是否严格的遵守父子节点不互相关联
  checkStrictly?: boolean
  // type="zonst-tree-select"时可用，用于过滤选中项
  filterValue?: (data: Record<string, any>[]) => Record<string, any>[]
  // 是否启用虚拟渲染
  virtualized?: boolean
  // 自定义远程搜索方法
  remoteMethod?: (query: string, id: string) => void
}
export type MySearchOptions = MySearchOptionItem[]
export type MySearchInstance = InstanceType<typeof MySearch>
export { MySearch }
