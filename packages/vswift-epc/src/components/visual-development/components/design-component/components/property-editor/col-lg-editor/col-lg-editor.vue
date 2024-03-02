<script setup lang="ts">
import { DesignDataOptions } from '@/components';
import { FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
  }>(),
  {
    label: '≥1200px 响应式栅格数',
    formItemProp: () => ['options', 'colLg'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-input-number v-model="options.colLg" controls-position="right" :min="1" :max="24" />
  </el-form-item>
</template>
