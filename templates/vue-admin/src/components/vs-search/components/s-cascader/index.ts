import type { ExtractPropTypes } from 'vue'
import SCascader from './s-cascader.vue'
import type { CascaderOption, cascaderProps } from 'element-plus'

export type SCascaderInstance = InstanceType<typeof SCascader>
export type CascaderPropTypes = Partial<ExtractPropTypes<typeof cascaderProps>>
export type SCascaderProps = Omit<CascaderPropTypes, 'options'> & {
  options?: CascaderOption[] | (() => Promise<CascaderOption[]>)
}
export { SCascader }
