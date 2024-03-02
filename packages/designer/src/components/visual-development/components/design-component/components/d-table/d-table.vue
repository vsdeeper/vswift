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
      <IdEditor :form-data="formData" />
    </ResponsiveCol>
    <ResponsiveCol>
      <TableLayoutEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ItemHasChildrenEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ItemChildrenEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <RowKeyEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <LazyEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <VirtualizedEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <AutoCalcMaxHeightEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ShowCheckboxEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <HighlightCurrentRowEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ShowPaginationEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <FlexibleEditor :options="formData.options" />
    </ResponsiveCol>
    <el-col :span="24">
      <ApiConfigEditor
        :options="formData.options"
        :form-item-rules="[{ required: true }]"
        api-label="列表接口"
        params-label="接口参数"
      ></ApiConfigEditor>
    </el-col>
    <el-col v-if="formData.options.lazy" :span="24">
      <ApiConfigEditor
        :options="formData.options"
        :form-item-rules="[{ required: true }]"
        :map="{ api: 'loadApi', apiMethod: 'loadApiMethod', apiParams: 'loadApiParams' }"
        api-label="懒加载子节点接口"
        params-label="接口参数"
      ></ApiConfigEditor>
    </el-col>
    <el-col :span="24">
      <my-divider-title label="表列设置"></my-divider-title>
      <TableColumnItemsEditor :options="formData.options" />
    </el-col>
  </el-row>
</template>
