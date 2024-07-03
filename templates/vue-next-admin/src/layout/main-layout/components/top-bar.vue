<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'

const collapse = defineModel<boolean>()

function onCollapse() {
  collapse.value = !collapse.value
}
</script>

<template>
  <div class="top-bar">
    <el-button
      class="my-button"
      :icon="collapse ? Expand : Fold"
      size="large"
      circle
      @click="onCollapse"
    />
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  height: 100%;
  align-items: center;
  .my-button {
    border: 0 none;
    & > i[class*='-icon'] {
      font-size: 20px;
    }
  }
}
</style>
