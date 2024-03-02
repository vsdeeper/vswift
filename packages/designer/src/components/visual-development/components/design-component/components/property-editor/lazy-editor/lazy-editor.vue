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
    label: '懒加载子节点数据',
    formItemProp: () => ['options', 'lazy'],
  },
);

const emit = defineEmits<{
  (e: 'change', val: string | number | boolean): void;
}>();

const options = toRef(props, 'options');

function change(val: string | number | boolean, options: DesignDataOptions) {
  if (val) options.loadApiMethod = 'GET';
}
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-radio-group v-model="options.lazy" @change="change($event, options)">
      <el-radio-button :label="true">是</el-radio-button>
      <el-radio-button :label="false">否</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>
