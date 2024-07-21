<script setup lang="ts">
import type { SSelectProps } from '.'

defineProps<{
  props?: SSelectProps
}>()

const model = defineModel<string | number | boolean | Record<string, any> | any[]>()
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
      v-for="item in props?.options"
      :key="item[props?.itemValue ?? 'id']"
      :label="item[props?.itemLabel ?? 'label']"
      :value="item[props?.itemValue ?? 'id']"
    >
    </el-option>
  </el-select>
</template>
