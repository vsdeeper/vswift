<script setup lang="ts">
import { DesignDataOptions } from '@/components';
import { FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
    showAlpha?: boolean;
  }>(),
  {
    label: '颜色',
    formItemProp: () => ['options', 'color'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <my-color-picker v-model="options.color" :show-alpha="showAlpha"></my-color-picker>
  </el-form-item>
</template>
