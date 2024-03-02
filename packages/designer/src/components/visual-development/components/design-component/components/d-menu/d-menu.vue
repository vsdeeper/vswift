<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { ApiConfigEditor, IdEditor } from '../property-editor';
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
      <ModeEditor :options="formData.options"></ModeEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <RouterEditor :options="formData.options"></RouterEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <PopperEffectEditor :options="formData.options"></PopperEffectEditor>
    </ResponsiveCol>
    <el-col :span="24">
      <ApiConfigEditor
        :options="formData.options"
        :form-item-rules="[{ required: true }]"
        api-label="菜单接口"
        params-label="接口参数"
      ></ApiConfigEditor>
    </el-col>
  </el-row>
</template>
