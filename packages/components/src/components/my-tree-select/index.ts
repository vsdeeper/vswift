import { type TreeKey } from 'element-plus/es/components/tree/src/tree.type'
import MyTreeSelect from './my-tree-select.vue'

export type MyTreeSelectValueItem = TreeKey | Record<string, any>
export type MyTreeSelectValue = MyTreeSelectValueItem | MyTreeSelectValueItem[]
export type MyTreeSelectInstance = InstanceType<typeof MyTreeSelect>
export { MyTreeSelect }
