<script setup lang="ts">
import draggable from 'vuedraggable';
import { MergeDesignData, RowColDesignData, VdComponents } from '@/components';
import { isActiveDesign, isRowComponent } from '@/components/visual-development/util';
import { useGlobal } from '@/stores';
import { genStyle } from '../util';

defineProps<{
  data: MergeDesignData;
  isActive?: boolean;
}>();
</script>

<template>
  <!-- 在布局-row组件中添加组件时 -->
  <el-row v-if="isRowComponent(data)" :gutter="data.options?.rowGutter" :justify="data.options?.rowJustify">
    <draggable
      :list="data.options?.components"
      :component-data="{
        type: 'transition-group',
      }"
      v-bind="{
        animation: 300,
        group: 'design-skeleton-draggable',
      }"
      item-key="id"
    >
      <template #item="{ element: item }">
        <el-col
          :span="(item as RowColDesignData).options?.colSpan"
          :xs="(item as RowColDesignData).options?.colXs"
          :sm="(item as RowColDesignData).options?.colSm"
          :md="(item as RowColDesignData).options?.colMd"
          :lg="(item as RowColDesignData).options?.colLg"
          :xl="(item as RowColDesignData).options?.colXl"
          :class="{ 'col-inline': data.options?.inline }"
        >
          <component
            :is="VdComponents[(item as MergeDesignData).type]"
            :data="item"
            :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
          ></component>
        </el-col>
      </template>
    </draggable>
  </el-row>
  <!-- 在布局-col组件中添加组件时 -->
  <draggable
    v-else
    :list="data.options?.components"
    :component-data="{
      type: 'transition-group',
    }"
    v-bind="{
      animation: 300,
      group: 'design-skeleton-draggable',
    }"
    item-key="id"
  >
    <template #item="{ element: item }">
      <div class="group-item" :style="genStyle(item)">
        <component
          :is="VdComponents[(item as MergeDesignData).type]"
          :data="item"
          :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
        ></component>
      </div>
    </template>
  </draggable>
</template>
