<script setup lang="ts">
import type { SDateValue, SDateProps } from '.'

defineProps<{
  props?: SDateProps
}>()

const model = defineModel<SDateValue>()
</script>

<template>
  <el-date-picker
    v-model="model"
    v-bind="{
      valueFormat: 'x',
      clearable: true,
      ...props,
    }"
  >
  </el-date-picker>
</template>
