<script setup lang="ts">
import { DesignDataOptions } from '@/components';
import { JUSTIFY_OPTIONS } from './constants';
import { FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
  }>(),
  {
    label: '水平排列方式',
    formItemProp: () => ['options', 'rowJustify'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-select v-model="options.rowJustify" clearable placeholder="请选择">
      <el-option
        v-for="item in JUSTIFY_OPTIONS"
        :key="item.value"
        :label="`${item.label} - ${item.value}`"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
