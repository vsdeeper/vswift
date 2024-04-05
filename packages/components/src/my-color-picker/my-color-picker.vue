<script setup lang="ts">
const msg = ref('test')
</script>

<template>
  <dvi class="my-color-picker">
    {{ msg }}
  </dvi>
</template>

<style lang="scss" scoped>
.my-color-picker {
  :deep(.el-input-group__append) {
    padding: 0;
  }
  :deep(.el-color-picker__trigger) {
    border: 0 none;
  }
}
</style>
