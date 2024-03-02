<script setup lang="ts">
import { FormInstance } from 'element-plus';
import { ActiveDesignData } from '../..';
import { DesignComponent } from './components';

withDefaults(
  defineProps<{
    title?: string;
    formData: ActiveDesignData;
    fullscreen?: boolean;
  }>(),
  {
    title: '设计组件',
  },
);

const formRef = ref<FormInstance>();
const show = ref(false);

function open() {
  show.value = true;
}

function toTitle(title: string, formData?: ActiveDesignData) {
  if (formData?.type === 'Project') return '设计项目';
  return title;
}

defineExpose({
  open,
});
</script>

<template>
  <el-dialog v-model="show" :title="toTitle(title, formData)" :fullscreen="fullscreen">
    <div class="design-component">
      <el-form ref="formRef" :model="formData" label-position="top">
        <component v-if="formData" :is="DesignComponent[formData.type]" :form-data="formData"></component>
      </el-form>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.design-component {
  :deep(.el-input-number) {
    flex: 1;
  }

  :deep(.el-select) {
    flex: 1;
  }
}
</style>
