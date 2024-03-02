<script setup lang="ts">
import * as Icons from '@element-plus/icons-vue';
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
    label: '后缀图标',
    formItemProp: () => ['options', 'suffixIcon'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-select v-model="options.suffixIcon" placeholder="请选择" clearable filterable>
      <el-option v-for="item in Icons" :key="item.name" :label="item.name" :value="item.name">
        <el-icon><component :is="(Icons as Record<string, any>)[item.name]"></component></el-icon>
        <span>{{ item.name }}</span>
      </el-option>
    </el-select>
  </el-form-item>
</template>

<style lang="scss" scoped>
.el-icon {
  margin-right: 10px;
}
</style>
