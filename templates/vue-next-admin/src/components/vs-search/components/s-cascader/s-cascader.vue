<script setup lang="ts">
import type { CascaderValue } from 'element-plus'
import type { SCascaderProps } from '.'

defineProps<{
  props?: SCascaderProps
}>()

const model = defineModel<CascaderValue>()
</script>

<template>
  <el-cascader
    v-model="model"
    v-bind="{
      ...props,
      clearable: props?.clearable ?? true,
      filterable: props?.filterable ?? true,
      props: { ...props?.props, value: props?.props?.value ?? 'id' }
    }"
  >
  </el-cascader>
</template>
