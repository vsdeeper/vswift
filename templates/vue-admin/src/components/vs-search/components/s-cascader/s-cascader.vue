<script setup lang="ts">
import type { CascaderOption, CascaderValue } from 'element-plus'
import type { CascaderPropTypes, SCascaderProps } from '.'

const _props = defineProps<{
  props?: SCascaderProps
}>()

const model = defineModel<CascaderValue>()
const options = ref<CascaderOption[]>([])

watch(
  () => _props.props?.options,
  async () => {
    if (Array.isArray(_props.props?.options)) {
      options.value = _props.props!.options
    } else if (Object.prototype.toString.call(_props.props?.options) === '[object AsyncFunction]') {
      options.value = await _props.props!.options!()
    }
  },
  { once: true }
)
</script>

<template>
  <el-cascader
    v-model="model"
    v-bind="
      {
        ...props,
        clearable: props?.clearable ?? true,
        filterable: props?.filterable ?? true,
        props: { ...props?.props, value: props?.props?.value ?? 'id', options }
      } as CascaderPropTypes
    "
  >
  </el-cascader>
</template>
