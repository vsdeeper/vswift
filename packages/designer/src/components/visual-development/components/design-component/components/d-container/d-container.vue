<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { IdEditor, DirectionEditor } from '../property-editor';
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
    <ResponsiveCol>
      <DirectionEditor :options="formData.options"></DirectionEditor>
    </ResponsiveCol>
  </el-row>
</template>
