<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { IdEditor, HeightEditor } from '../property-editor';
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
      <HeightEditor :options="formData.options"></HeightEditor>
    </ResponsiveCol>
  </el-row>
</template>
