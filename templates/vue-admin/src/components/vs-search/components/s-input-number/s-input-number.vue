<script setup lang="ts">
import type { SInputNumberProps } from '.'

defineProps<{
  props?: SInputNumberProps
}>()

const model = defineModel<number>()
</script>

<template>
  <el-input-number
    v-model="model"
    v-bind="{
      max: Number.MAX_SAFE_INTEGER,
      step: 1,
      controls: true,
      controlsPosition: 'right',
      ...props,
    }"
  />
</template>
