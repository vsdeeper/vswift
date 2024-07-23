<script setup lang="ts">
import type { VsTableColumnItem } from '.'
import { getSlots } from './util'

defineProps<{
  col: VsTableColumnItem
}>()
</script>

<template>
  <el-table-column
    v-if="col.children?.length"
    v-bind="col.columnProps"
    :prop="col.prop"
    :label="col.label"
  >
    <template v-if="col.prop" #header="scope">
      <slot :name="`${col.prop}-header`" v-bind="scope"> {{ scope.column.label }}</slot>
    </template>
    <TableColumn
      v-for="(col1, index1) in col.children"
      :key="`${col1.label}${col1.prop}${index1}`"
      :col="col1"
    >
      <template v-for="slot in getSlots(col.children)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
      <template v-for="slot in getSlots(col.children).map((e) => `${e}-header`)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </TableColumn>
  </el-table-column>
  <el-table-column v-else v-bind="col.columnProps" :prop="col.prop" :label="col.label">
    <template v-if="col.prop" #default="scope">
      <slot :name="col.prop" v-bind="scope">
        {{ scope.row[col.prop] }}
      </slot>
    </template>
    <template v-if="col.prop" #header="scope">
      <slot :name="`${col.prop}-header`" v-bind="scope"> {{ scope.column.label }}</slot>
    </template>
  </el-table-column>
</template>
