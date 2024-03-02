<script setup lang="ts">
import { DesignDataOptions } from '@/components';
import { POPPER_EFFECT_OPTIONS } from './constants';
import { FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
  }>(),
  {
    label: 'Tooltip 主题',
    formItemProp: () => ['options', 'popperEffect'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-select v-model="options.popperEffect" placeholder="请选择" clearable>
      <el-option
        v-for="item in POPPER_EFFECT_OPTIONS"
        :key="item.value"
        :label="`${item.label} - ${item.value}`"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
