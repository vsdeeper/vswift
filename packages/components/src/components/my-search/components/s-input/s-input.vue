<script setup lang="ts">
import type { InputProps } from 'element-plus';

defineProps<{
  props?: InputProps
}>()
const model = defineModel<string>()
</script>

<template>
  <el-input v-model="model" v-bind="props" placeholder="请输入" clearable></el-input>
</template>