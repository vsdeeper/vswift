<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

defineProps<{
  breadcrumbData?: Record<string, any>[]
}>()
</script>

<template>
  <el-breadcrumb class="my-breadcrumb" :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in breadcrumbData" :key="item.path" :to="{ path: item.path }">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.my-breadcrumb {
  padding: 20px 0;
}
</style>
