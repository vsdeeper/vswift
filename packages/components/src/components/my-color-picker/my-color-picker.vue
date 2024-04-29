<script setup lang="ts">
import { type ColorPickerInstance } from 'element-plus';

withDefaults(
  defineProps<{
    showAlpha?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: '请选择',
  },
);
const model = defineModel<string>();
const colorPickerRef = ref<ColorPickerInstance>();

function clickInput() {
  colorPickerRef.value?.show();
}
</script>

<template>
  <dvi class="my-color-picker">
    <el-input v-model="model" :placeholder="placeholder" readonly @click="clickInput">
      <template #append>
        <el-color-picker ref="colorPickerRef" v-model="model" :show-alpha="showAlpha" />
      </template>
    </el-input>
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
