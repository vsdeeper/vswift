<script setup lang="ts">
import type { SInputProps } from '.'

defineProps<{
  props?: SInputProps
}>()

const model = defineModel<string>()
</script>

<template>
  <el-input v-model="model" v-bind="{ ...props, clearable: props?.clearable ?? true }"></el-input>
</template>
