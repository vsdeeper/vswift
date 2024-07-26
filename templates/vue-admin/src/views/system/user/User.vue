<script setup lang="ts">
import type { VsSearchOptionItem, VsTableColumnItem, VsTableOperateItem } from '@/components'
import type { SSelectProps } from '@/components/vs-search/components'
import { queryUserList } from '@/api/system/user'
import { useAppSettingDataStore } from '@/stores/global'

const { getPageSize } = useAppSettingDataStore()
const permissionCodes = ref(['add', 'check', 'edit', 'delete'])
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
const params = ref<PagingParams>({
  pageIndex: 1,
  pageSize: getPageSize()
})
const tableColumns = ref<VsTableColumnItem[]>([
  { label: '员工姓名', prop: 'name' },
  { label: '员工工号', prop: 'code' }
])
const loading = ref(false)
const total = ref(0)
const tableData = ref<Record<string, any>[]>([])
const tableOperateOptions = ref<VsTableOperateItem[]>([
  { label: '新增', value: 'add', code: 'add', show: (code) => permissionCodes.value.includes(code) }
])
const rowOperateOptions = ref<VsTableOperateItem[]>([
  {
    label: '查看',
    value: 'check',
    code: 'check',
    show: (code) => permissionCodes.value.includes(code)
  },
  {
    label: '编辑',
    value: 'edit',
    code: 'edit',
    show: (code) => permissionCodes.value.includes(code)
  },
  {
    label: '删除',
    type: 'danger',
    value: 'delete',
    code: 'delete',
    showPopconfirm: true,
    show: (code) => permissionCodes.value.includes(code)
  }
])
onMounted(() => {
  getTableList(params.value)
})

async function getTableList(params: PagingParams) {
  loading.value = true
  const res = await queryUserList(params)
  loading.value = false
  total.value = res?.total ?? 0
  tableData.value = res?.list ?? []
}
</script>

<template>
  <ViewWrapper>
    <VsSearch label-width="110px" :options="searchOptions"></VsSearch>
    <VsTable
      v-model:page-size="params.pageSize"
      v-model:current-page="params.pageIndex"
      :table-columns
      :table-operate-options
      :row-operate-options
      :table-data
      :total
      :loading
    >
    </VsTable>
  </ViewWrapper>
</template>
