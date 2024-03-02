<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { ColorEditor, FontSizeEditor, HeightEditor, IdEditor, NameEditor, SuffixIconEditor } from '../property-editor';
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
      <NameEditor :options="formData.options"></NameEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColorEditor :options="formData.options"></ColorEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <HeightEditor :options="formData.options"></HeightEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <FontSizeEditor :options="formData.options"></FontSizeEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <SuffixIconEditor :options="formData.options"></SuffixIconEditor>
    </ResponsiveCol>
  </el-row>
</template>
