<script setup lang="ts">
import type { VsSearchOptionItem, VsTableColumnItem, VsTableOperateItem } from '@/components'
import type { SSelectProps } from '@/components/vs-search/components'
import { queryUserList } from '@/api/system/user'
import { useAppSettingDataStore } from '@/stores/global'
import { EMPLOYEE_STATUS_OPTIONS } from '@/utils'
import { getLabelByValue } from '@vswift/utils'
import { format } from 'date-fns'
import type { AddItemInstance, EditItemInstance } from './components'

const AddItem = defineAsyncComponent(() => import('./components/add-item/AddItem.vue'))
const EditItem = defineAsyncComponent(() => import('./components/edit-item/EditItem.vue'))
const AddItemRef = ref<AddItemInstance>()
const EditItemRef = ref<EditItemInstance>()

const { getPageSize } = useAppSettingDataStore()
const permissionCodes = ref(['add', 'check', 'edit', 'copy', 'delete'])
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
      options: EMPLOYEE_STATUS_OPTIONS
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
  { label: '员工工号', prop: 'code' },
  { label: '员工状态', prop: 'status' },
  { label: '职位', prop: 'position' },
  { label: '手机号', prop: 'phone' },
  { label: '邮箱', prop: 'email' },
  { label: '更新信息', prop: 'updatedInfo' },
  { label: '创建信息', prop: 'createdInfo' }
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
    label: '复制',
    value: 'copy',
    code: 'copy',
    showPopconfirm: true,
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

function onInquire(val: Record<string, any>) {
  params.value.pageIndex = 1
  getTableList({ ...params.value, ...val })
}

function onReset() {
  params.value.pageIndex = 1
  getTableList(params.value)
}

async function getTableList(params: PagingParams) {
  loading.value = true
  const res = await queryUserList(params)
  loading.value = false
  total.value = res?.total ?? 0
  tableData.value = res?.list ?? []
}

function onOperate(key: string, val?: any) {
  switch (key) {
    case 'add': {
      AddItemRef.value?.open()
      break
    }
    case 'check': {
      break
    }
    case 'edit': {
      break
    }
    case 'copy': {
      break
    }
    case 'delete': {
      break
    }
  }
}
</script>

<template>
  <ViewWrapper>
    <VsSearch
      label-width="110px"
      :options="searchOptions"
      @inquire="onInquire"
      @reset="onReset"
    ></VsSearch>
    <VsTable
      v-model:page-size="params.pageSize"
      v-model:current-page="params.pageIndex"
      :table-columns
      :table-operate-options
      :row-operate-options
      :table-data
      :total
      :loading
      operate-column-width="180px"
      @operate="onOperate"
    >
      <template #status="{ row }">
        {{ getLabelByValue(row.status, EMPLOYEE_STATUS_OPTIONS) }}
      </template>
      <template #updatedInfo="{ row }">
        {{ row.updatedBy }}<br />
        {{ format(row.updatedAt, 'yyyy-MM-dd HH:mm:ss') }}
      </template>
      <template #createdInfo="{ row }">
        {{ row.createdBy }}<br />
        {{ format(row.createdAt, 'yyyy-MM-dd HH:mm:ss') }}
      </template>
    </VsTable>
  </ViewWrapper>
  <AddItem ref="AddItemRef" />
  <EditItem ref="EditItemRef" />
</template>
