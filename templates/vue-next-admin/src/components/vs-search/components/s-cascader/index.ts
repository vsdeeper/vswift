import type { ExtractPropTypes } from 'vue'
import SCascader from './s-cascader.vue'
import type { cascaderProps } from 'element-plus'

export type SCascaderInstance = InstanceType<typeof SCascader>
export type SCascaderProps = Partial<ExtractPropTypes<typeof cascaderProps>>
export { SCascader }
