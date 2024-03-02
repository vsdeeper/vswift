<script setup lang="ts">
import { DesignDataOptions } from '@/components';
import { TABLE_LAYOUT_OPTIONS } from './constants';
import { FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
  }>(),
  {
    label: '表格的布局方式',
    formItemProp: () => ['options', 'tableLayout'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-select v-model="options.tableLayout" placeholder="请选择" clearable>
      <el-option
        v-for="item in TABLE_LAYOUT_OPTIONS"
        :key="item.value"
        :label="`${item.label} - ${item.value}`"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
