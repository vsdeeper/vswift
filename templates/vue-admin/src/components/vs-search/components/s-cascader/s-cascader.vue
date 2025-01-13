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
  { immediate: true },
)
</script>

<template>
  <el-cascader
    v-model="model"
    v-bind="
      {
        clearable: true,
        filterable: true,
        props: { value: 'id', options, ...props?.props },
        ...props,
      } as CascaderPropTypes
    "
  >
  </el-cascader>
</template>
