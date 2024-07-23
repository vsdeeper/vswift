<script setup lang="ts">
import type { VsSearchOptionItem } from '@/components'
import type { SSelectProps } from '@/components/vs-search/components'

const searchOptions = ref<VsSearchOptionItem[]>([
  {
    id: 'searchStr',
    type: 'input',
    label: '员工姓名/工号'
  },
  {
    id: 'status',
    type: 'select',
    label: '员工状态',
    props: {
      options: [
        { id: 1, label: '在职' },
        { id: 2, label: '离职' },
        { id: 3, label: '停职' }
      ]
    } as SSelectProps
  },
  {
    id: 'phone',
    type: 'input',
    label: '手机号'
  }
])
</script>

<template>
  <ViewWrapper>
    <VsSearch label-width="110px" :options="searchOptions"></VsSearch>
    <VsTable></VsTable>
  </ViewWrapper>
</template>
