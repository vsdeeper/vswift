import type { ButtonProps, PopconfirmProps, TableColumnCtx } from 'element-plus'
import VsTable from './vs-table.vue'

export type VsTableInstance = InstanceType<typeof VsTable>
export interface VsTableColumnItem {
  label: string
  prop?: string
  columnProps?: Partial<TableColumnCtx<any>>
  children?: VsTableColumnItem[]
}
export interface VsTableOperateItem {
  label: string
  value: string
  code: string // 权限标识符
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  showPopconfirm?: boolean
  show?: (code: string, row?: Record<string, any>) => boolean
  popconfirmProps?: Partial<PopconfirmProps>
  buttonProps?: Partial<ButtonProps>
}
export { VsTable }
