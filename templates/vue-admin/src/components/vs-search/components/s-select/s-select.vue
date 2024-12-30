<script setup lang="ts">
import type { SSelectProps } from '.'

const _props = defineProps<{
  props?: SSelectProps
}>()

const model = defineModel<string | number | boolean | Record<string, any> | any[]>()
const options = ref<Record<string, any>[]>([])

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
  <el-select
    v-model="model"
    v-bind="{
      ...props,
      clearable: props?.clearable ?? true,
      filterable: props?.filterable ?? true
    }"
  >
    <el-option
      v-for="item in options"
      :key="item[props?.itemValue ?? 'value']"
      :label="item[props?.itemLabel ?? 'label']"
      :value="item[props?.itemValue ?? 'value']"
    >
    </el-option>
  </el-select>
</template>
