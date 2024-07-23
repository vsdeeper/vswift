<script setup lang="ts">
import { VsTreeSelect, type VsTreeSelectValue } from '@/components/vs-tree-select'
import type { STreeSelectProps } from '.'

defineProps<{
  props?: STreeSelectProps
}>()

const model = defineModel<VsTreeSelectValue>()
</script>

<template>
  <VsTreeSelect v-model="model" v-bind="props" />
</template>
