<script setup lang="ts">
defineProps<{
  label: string;
  suffixIcon?: any;
}>();

const emit = defineEmits<{
  (e: 'click-suffix-icon'): void;
}>();
</script>

<template>
  <div class="my-divider-title">
    <el-divider content-position="left" border-style="dashed">
      {{ label }}
    </el-divider>
    <el-button
      v-if="suffixIcon"
      type="primary"
      size="small"
      :icon="suffixIcon"
      plain
      circle
      @click="emit('click-suffix-icon')"
    >
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.my-divider-title {
  display: flex;
  align-items: center;
  line-height: 1;
  :deep(.el-divider__text.is-left) {
    left: 0;
    padding: 0 5px 0 0;
    color: var(--el-text-color-regular);
    font-weight: normal;
  }
}
</style>
