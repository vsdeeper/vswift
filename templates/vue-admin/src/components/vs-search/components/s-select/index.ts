import type { ISelectProps } from 'element-plus'
import SSelect from './s-select.vue'

export type SSelectInstance = InstanceType<typeof SSelect>
export type SSelectProps = Partial<ISelectProps> & {
  options?: { id?: number | string; label?: string; [key: string]: any }[] // 选项数据源
  itemLabel?: string // 指定选项标签为选项对象的某个属性值
  itemValue?: string // 指定选项的值为选项对象的某个属性值
}
export { SSelect }
