<script setup lang="ts">
import type {
  VsRowOperateOptionItem,
  VsSearchOptionItem,
  VsTableColumnItem,
  VsTableInstance,
  VsTableOperateItem
} from '@/components'
import type { SSelectProps } from '@/components/vs-search/components'
import { copyItem, deleteItems, queryUserList } from '@/api/system/user'
import { useAppSettingDataStore } from '@/stores/global'
import { EMPLOYEE_STATUS_OPTIONS } from '@/utils'
import { findArraryValueFromTreeData, getLabelByValue } from '@vswift/utils'
import { format } from 'date-fns'
import type { AddItemInstance, EditItemInstance } from './components'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/system/user'

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
const TableRef = ref<VsTableInstance>()
const tableColumns = ref<VsTableColumnItem[]>([
  { label: '员工姓名', prop: 'name' },
  { label: '员工工号', prop: 'code' },
  { label: '员工状态', prop: 'status' },
  { label: '部门', prop: 'departmentId' },
  { label: '职位', prop: 'positionName' },
  { label: '手机号', prop: 'phone' },
  { label: '邮箱', prop: 'email' },
  { label: '更新信息', prop: 'updatedInfo' },
  { label: '创建信息', prop: 'createdInfo' }
])
const loading = ref(false)
const total = ref(0)
const tableData = ref<Record<string, any>[]>([])
const tableOperateOptions = ref<VsTableOperateItem[]>([
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
])
const rowOperateOptions = ref<VsRowOperateOptionItem[]>([
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
  loading.value = true
  const res = await queryUserList(params)
  loading.value = false
  total.value = res?.total ?? 0
  tableData.value = res?.list ?? []
}

async function onOperate(key: string, val?: any) {
  switch (key) {
    case 'add': {
      AddItemRef.value?.open()
      break
    }
    case 'check': {
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

const findArraryValuesFromTreeData = (
  targetId: string | number,
  tree: Record<string, any>[],
  options?: {
    id?: string
    label?: string
    children?: string
    returnType?: 'ids' | 'names'
  }
) => {
  const { id = 'id', label = 'label', children = 'children', returnType = 'ids' } = options || {}
  const toFlatArr = (tree: Record<string, any>[], parentId?: string | number) => {
    return tree.reduce(
      (pre: Record<string, any>[], cur: Record<string, any>): Record<string, any>[] => {
        return [
          ...pre,
          typeof parentId === 'undefined' ? cur : { ...cur, parentId },
          ...(cur[children] && cur[children].length ? toFlatArr(cur[children], cur[id]) : [])
        ]
      },
      []
    )
  }
  const getIds = (flatArr: Record<string, any>[]) => {
    let ids = [targetId]
    let child = flatArr.find((e) => e[id] === targetId)
    while (child && typeof child.parentId !== 'undefined') {
      ids = [child.parentId, ...ids]
      child = flatArr.find((e) => e[id] === child!.parentId)
    }
    return ids
  }
  const getNames = (flatArr: Record<string, any>[]) => {
    let child = flatArr.find((e) => e[id] === targetId)
    let names = (child && [child[label]]) || []
    while (child && typeof child.parentId !== 'undefined') {
      const find = flatArr.find((e) => e[id] === child!.parentId)
      names = [find![label], ...names]
      child = flatArr.find((e) => e[id] === child!.parentId)
    }
    return names
  }
  if (returnType === 'names') return getNames(toFlatArr(tree))
  else return getIds(toFlatArr(tree))
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
      ref="TableRef"
      v-model:page-size="params.pageSize"
      v-model:current-page="params.pageIndex"
      :table-columns
      :table-operate-options
      :row-operate-options
      :table-data
      show-selection
      :total
      :loading
      operate-column-width="180px"
      @operate="onOperate"
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
</template>
