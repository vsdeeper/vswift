<script setup lang="ts">
import type { SInputProps } from '.'

defineProps<{
  props?: SInputProps
}>()

const model = defineModel<string>()
</script>

<template>
  <el-input v-model="model" v-bind="{ clearable: true, ...props }"></el-input>
</template>
