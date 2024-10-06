<script setup lang="ts">
import type { VsSearchProps, VsTableInstance, VsTableProps, SSelectProps, SInputProps } from '@/components'
import { useAppSettingDataStore, useUserInfoStore } from '@/stores/global'
import { EMPLOYEE_STATUS_OPTIONS } from '@/utils/constants'
import { copyItem, deleteItems, queryUserList } from '@/api/system/user'
import { findArraryValueFromTreeData, getLabelByValue } from '@/utils'
import { format } from 'date-fns'
import type { AddItemInstance, CheckItemInstance, EditItemInstance } from './components'
import { useUserStore } from '@/stores/system/user'

const AddItem = defineAsyncComponent(() => import('./components/add-item/AddItem.vue'))
const EditItem = defineAsyncComponent(() => import('./components/edit-item/EditItem.vue'))
const CheckItem = defineAsyncComponent(() => import('./components/check-item/CheckItem.vue'))
const AddItemRef = ref<AddItemInstance>()
const EditItemRef = ref<EditItemInstance>()
const CheckItemRef = ref<CheckItemInstance>()

const { permissionCodes } = storeToRefs(useUserInfoStore())
const { getPageSize } = useAppSettingDataStore()
const params = ref<PagingParams>({
  pageIndex: 1,
  pageSize: getPageSize()
})
const search = ref<VsSearchProps>({
  labelWidth: '110px',
  options: [
    {
      id: 'searchStr',
      type: 'input',
      label: '员工姓名/工号',
      props: {} as SInputProps
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
      label: '手机号',
      props: {} as SInputProps
    }
  ]
})
const TableRef = ref<VsTableInstance>()
const table = ref<Partial<VsTableProps>>({
  loading: false,
  total: 0,
  data: [],
  showSelection: true,
  operateColumnWidth: '180px',
  operateOptions: [
    {
      label: '新增',
      value: 'add',
      code: 'add',
      show: (code) => permissionCodes.value.includes(code)
    },
    {
      label: '批量删除',
      value: 'batch_delete',
      code: 'delete',
      type: 'danger',
      show: (code) => permissionCodes.value.includes(code)
    }
  ],
  rowOperateOptions: [
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
  ],
  columns: [
    { label: '员工姓名', prop: 'name' },
    { label: '员工工号', prop: 'code' },
    { label: '员工状态', prop: 'status' },
    { label: '部门', prop: 'departmentId' },
    { label: '职位', prop: 'positionName' },
    { label: '手机号', prop: 'phone' },
    { label: '邮箱', prop: 'email' },
    { label: '更新信息', prop: 'updatedInfo' },
    { label: '创建信息', prop: 'createdInfo' }
  ]
})
const departmentOptions = ref<Record<string, any>[]>([])
const { getdDepartmentData } = useUserStore()

onMounted(() => {
  getdDepartmentData().then((res) => (departmentOptions.value = res ?? []))
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
  table.value.loading = true
  const res = await queryUserList(params)
  table.value.loading = false
  table.value.total = res?.total ?? 0
  table.value.data = res?.list ?? []
}

async function onOperate(key: string, val?: any) {
  switch (key) {
    case 'add': {
      AddItemRef.value?.open()
      break
    }
    case 'check': {
      CheckItemRef.value?.open(val)
      break
    }
    case 'edit': {
      EditItemRef.value?.open(val)
      break
    }
    case 'copy': {
      if (await copyItem(val!.id)) {
        ElMessage.success('复制成功')
        getTableList(params.value)
      }
      break
    }
    case 'delete': {
      if (await deleteItems([val!.id])) {
        ElMessage.success('删除成功')
        getTableList(params.value)
      }
      break
    }
    case 'batch_delete': {
      const selected = TableRef.value?.getSelectionRows()
      if (!selected?.length) {
        ElMessage.error('请选择要删除的项')
        return
      }
      await ElMessageBox.confirm('确定删除吗？', '提示', { type: 'warning' })
      const ids = selected.map((e) => e.id)
      if (await deleteItems(ids)) {
        ElMessage.success('删除成功')
        getTableList(params.value)
      }
    }
  }
}

function onPagingChange(val: PagingParams) {
  params.value.pageIndex = val.pageIndex
  params.value.pageSize = val.pageSize
  getTableList(params.value)
}
</script>

<template>
  <ViewWrapper>
    <VsSearch v-bind="search" @inquire="onInquire" @reset="onReset"></VsSearch>
    <VsTable
      ref="TableRef"
      v-model:page-size="params.pageSize"
      v-model:current-page="params.pageIndex"
      v-bind="table"
      @operate="onOperate"
      @paging-change="onPagingChange"
    >
      <template #status="{ row }">
        {{ getLabelByValue(row.status, EMPLOYEE_STATUS_OPTIONS) }}
      </template>
      <template #departmentId="{ row }">
        {{
          findArraryValueFromTreeData(row.departmentId, departmentOptions, {
            returnType: 'labels'
          })?.join('/')
        }}
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
  <CheckItem ref="CheckItemRef" />
</template>
