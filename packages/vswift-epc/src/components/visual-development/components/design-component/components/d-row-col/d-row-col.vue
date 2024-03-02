<script setup lang="ts">
import { SemiSelect, Plus } from '@element-plus/icons-vue';
import { MergeDesignData, RowColDesignData } from '@/components';
import {
  IdEditor,
  RowGutterEditor,
  RowJustifyEditor,
  RowAlignEditor,
  ColSpanEditor,
  ColXsEditor,
  ColSmEditor,
  ColMdEditor,
  ColLgEditor,
  ColXlEditor,
  InlineEditor,
} from '../property-editor';
import { ROW_GUTTER } from '../constants';
import {
  findIndexColInRow,
  findParentComponentOfComponent,
  genId,
  isRowComponent,
} from '@/components/visual-development/util';
import { useGlobal } from '@/stores';

defineProps<{
  formData: MergeDesignData;
}>();

function addCol(row: RowColDesignData) {
  !row.options?.components && (row.options!.components = []);
  row.options!.components.push({
    id: genId(`${row.type}col`),
    type: row.type,
    label: row.label,
    options: {
      components: [],
      colSpan: 24,
    },
  });
}

function deleteCol(targetId: string, cols: RowColDesignData[]) {
  const findIdx = cols.findIndex(e => e.id === targetId);
  cols.splice(findIdx, 1);
}

function findRow(item: MergeDesignData, designData: MergeDesignData[]) {
  return findParentComponentOfComponent(item, designData) as MergeDesignData;
}
</script>

<template>
  <el-collapse v-if="isRowComponent(formData)" :model-value="['row', 'col']">
    <el-collapse-item title="布局-Row" name="row">
      <el-row :gutter="ROW_GUTTER">
        <ResponsiveCol>
          <IdEditor :form-data="formData"></IdEditor>
        </ResponsiveCol>
        <ResponsiveCol>
          <RowGutterEditor :options="formData.options"></RowGutterEditor>
        </ResponsiveCol>
        <ResponsiveCol>
          <RowJustifyEditor :options="formData.options"></RowJustifyEditor>
        </ResponsiveCol>
        <ResponsiveCol>
          <RowAlignEditor :options="formData.options"></RowAlignEditor>
        </ResponsiveCol>
        <ResponsiveCol>
          <InlineEditor :options="formData.options"></InlineEditor>
        </ResponsiveCol>
      </el-row>
    </el-collapse-item>
    <el-collapse-item title="布局-Row-Cols" name="col">
      <template v-for="item in formData.options?.components" :key="item.id">
        <div class="divider-box">
          <el-divider content-position="left" border-style="dashed"
            >布局-Col-{{ findIndexColInRow(item, useGlobal().designData)! + 1 }}</el-divider
          >
          <el-button
            type="danger"
            :icon="SemiSelect"
            circle
            size="small"
            @click="deleteCol(item.id, formData.options!.components!)"
          ></el-button>
        </div>
        <el-row :gutter="ROW_GUTTER">
          <ResponsiveCol>
            <IdEditor :form-data="item"></IdEditor>
          </ResponsiveCol>
          <template v-if="!formData.options?.inline">
            <ResponsiveCol>
              <ColSpanEditor :options="item.options"></ColSpanEditor>
            </ResponsiveCol>
            <ResponsiveCol>
              <ColXsEditor :options="item.options"></ColXsEditor>
            </ResponsiveCol>
            <ResponsiveCol>
              <ColSmEditor :options="item.options"></ColSmEditor>
            </ResponsiveCol>
            <ResponsiveCol>
              <ColMdEditor :options="item.options"></ColMdEditor>
            </ResponsiveCol>
            <ResponsiveCol>
              <ColLgEditor :options="item.options"></ColLgEditor>
            </ResponsiveCol>
            <ResponsiveCol>
              <ColXlEditor :options="item.options"></ColXlEditor>
            </ResponsiveCol>
          </template>
        </el-row>
      </template>
      <el-button class="add-btn" type="primary" plain :icon="Plus" @click="addCol(formData)">新增Col</el-button>
    </el-collapse-item>
  </el-collapse>
  <el-row v-else :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <template v-if="!findRow(formData, useGlobal().designData).options?.inline">
      <ResponsiveCol>
        <ColSpanEditor :options="formData.options"></ColSpanEditor>
      </ResponsiveCol>
      <ResponsiveCol>
        <ColXsEditor :options="formData.options"></ColXsEditor>
      </ResponsiveCol>
      <ResponsiveCol>
        <ColSmEditor :options="formData.options"></ColSmEditor>
      </ResponsiveCol>
      <ResponsiveCol>
        <ColMdEditor :options="formData.options"></ColMdEditor>
      </ResponsiveCol>
      <ResponsiveCol>
        <ColLgEditor :options="formData.options"></ColLgEditor>
      </ResponsiveCol>
      <ResponsiveCol>
        <ColXlEditor :options="formData.options"></ColXlEditor>
      </ResponsiveCol>
    </template>
  </el-row>
</template>

<style lang="scss" scoped>
.add-btn {
  width: 100%;
}

.divider-box {
  display: flex;
  align-items: center;
}
</style>
