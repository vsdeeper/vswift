<script setup lang="ts">

withDefaults(defineProps<{
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}>(), {
  md: 12,
  lg: 8,
  xl: 6
})

</script>
<template>
  <el-col :span="24" :xs="xs" :sm="sm" :md="md" :lg="lg" :xl="xl">
   <slot></slot>
  </el-col>
</template>