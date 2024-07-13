<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import type { BreadcrumbDataItem } from '.'

const breadcrumbData = inject<Ref<BreadcrumbDataItem[]>>('breadcrumbData')
</script>

<template>
  <el-card class="view-wrapper">
    <template #header>
      <el-breadcrumb class="my-breadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in breadcrumbData"
          :key="item.path"
          :to="{ path: item.path }"
        >
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.view-wrapper {
  margin-top: 8px;
}
</style>
