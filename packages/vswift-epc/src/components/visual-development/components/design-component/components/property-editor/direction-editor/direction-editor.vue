<script setup lang="ts">
import { DesignDataOptions } from '@/components';
import { DIRECTION_OPTIONS } from './constants';
import { FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
  }>(),
  {
    label: '子元素的排列方向',
    formItemProp: () => ['options', 'direction'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-radio-group v-model="options.direction">
      <el-radio v-for="item in DIRECTION_OPTIONS" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>
