import type {
  ButtonProps,
  PaginationProps,
  PopconfirmProps,
  TableColumnCtx,
  TableProps
} from 'element-plus'
import VsTable from './vs-table.vue'
import type { LoadingBinding } from 'element-plus/es/components/loading/src/directive.mjs'

export type VsTableInstance = InstanceType<typeof VsTable>
export interface VsTableColumnItem {
  label: string
  prop?: string
  width?: string | number
  columnProps?: Partial<TableColumnCtx<any>>
  children?: VsTableColumnItem[]
}
export interface VsTableOperateItem {
  label: string
  value: string
  code?: string // 权限标识符
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  show?: (code?: string, row?: Record<string, any>) => boolean
  buttonProps?: Partial<ButtonProps>
}
export interface VsRowOperateOptionItem extends VsTableOperateItem {
  showPopconfirm?: boolean
  popconfirmTitle?: string
  popconfirmProps?: Partial<PopconfirmProps>
}
export interface VsTableProps {
  // 自定义属性
  loading?: LoadingBinding
  showIndex?: boolean
  showSelection?: boolean
  showPagination?: boolean
  showRowOperate?: boolean
  paginationAlign?: 'left' | 'right'
  tableOperateAlign?: 'left' | 'right'
  operateColumnWidth?: string | number
  total?: number
  data?: Record<string, any>[]
  columns?: VsTableColumnItem[]
  operateOptions?: VsTableOperateItem[]
  rowOperateOptions?: VsRowOperateOptionItem[]
  currentPage?: number
  pageSize?: number

  // 源属性
  tableProps?: Partial<TableProps<Record<string, any>>>
  operateColumnProps?: Partial<TableColumnCtx<any>>
  paginationProps?: Partial<PaginationProps>
  [key: string]: any
}
export { VsTable }
