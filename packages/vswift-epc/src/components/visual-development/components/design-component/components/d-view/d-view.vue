<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { IdEditor, NameEditor } from '../property-editor';
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
      <NameEditor :options="formData.options" label="视图名称"></NameEditor>
    </ResponsiveCol>
  </el-row>
</template>
