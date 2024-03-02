<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { IdEditor, SearchConditionItemsEditor } from '../property-editor';
import { ROW_GUTTER } from '../constants';

defineProps<{
  formData: MergeDesignData;
}>();
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <el-col :span="24">
      <my-divider-title label="搜索条件设置"></my-divider-title>
      <SearchConditionItemsEditor :options="formData.options"></SearchConditionItemsEditor>
    </el-col>
  </el-row>
</template>
