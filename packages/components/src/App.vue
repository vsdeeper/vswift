<script setup lang="ts">
import { MyTreeSelectTest } from '@/test'
</script>

<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="my-tree-select">
      <MyTreeSelectTest />
    </el-tab-pane>
    <el-tab-pane label="Config" />
    <el-tab-pane label="Role" />
    <el-tab-pane label="Task" />
  </el-tabs>
</template>

<style lang="scss" scoped>
.el-tabs {
  display: flex;
  padding: 15px 15px 15px 0;
  :deep(.el-tabs__content) {
    flex: 1;
  }
}
</style>
