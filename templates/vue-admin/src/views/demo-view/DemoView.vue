<script setup lang="ts">
import { useAppSettingStore } from '@/stores/global'
import { queryTableList, deleteItems, deleteItem } from '@/api/demo-view'
import { useDemoViewStore } from '@/stores/demo-view'
import type {
  VsSearchProps,
  SInputProps,
  SSelectProps,
  SInputNumberProps,
  VsTableInstance,
  VsTableProps,
} from '@/components'
import { STATUS_OPTIONS } from './constants'
import { getLabelByValue } from '@/utils'

// 应用设置store
const { getPageSize } = useAppSettingStore()

// 视图store
const { getDeptListData } = useDemoViewStore()
const { deptListData } = storeToRefs(useDemoViewStore())

// 异步组件及其实例定义
const TableAdd = defineAsyncComponent(() => import('./components/table-add/TableAdd.vue'))
const RowCheck = defineAsyncComponent(() => import('./components/row-check/RowCheck.vue'))
const RowEdit = defineAsyncComponent(() => import('./components/row-edit/RowEdit.vue'))
const TableAddRef = ref<InstanceType<typeof TableAdd>>()
const RowCheckRef = ref<InstanceType<typeof RowCheck>>()
const RowEditRef = ref<InstanceType<typeof RowEdit>>()

// 搜索定义
const search = ref<VsSearchProps>({
  labelWidth: '110px',
  options: [
    {
      id: 'name',
      type: 'Input',
      label: '名称',
      props: {} as SInputProps,
    },
    {
      id: 'status',
      type: 'Select',
      label: '状态',
      props: {
        options: STATUS_OPTIONS,
      } as SSelectProps,
    },
    {
      id: 'amount',
      type: 'InputNumber',
      label: '数量',
      props: {} as SInputNumberProps,
    },
    {
      id: 'deptId',
      type: 'Select',
      label: '部门',
      props: {
        itemValue: 'id',
        options: async () => await getDeptListData(),
      } as SSelectProps,
    },
  ],
})

// 表格定义
const TableRef = ref<VsTableInstance>()
const table = ref<Partial<VsTableProps>>({
  loading: false,
  total: 0,
  operateColumnWidth: '150px',
  data: [],
  columns: [
    {
      label: 'ID',
      prop: 'id',
      width: 80,
    },
    {
      label: '名称',
      prop: 'name',
    },
    {
      label: '状态',
      prop: 'status',
      width: 180,
    },
    {
      label: '部门',
      prop: 'deptId',
    },
  ],
  operateOptions: [
    {
      type: 'primary',
      label: '新增',
      value: 'add',
    },
    {
      type: 'danger',
      label: '批量删除',
      value: 'batch_deletion',
    },
  ],
  rowOperateOptions: [
    {
      type: 'primary',
      label: '查看',
      value: 'check',
    },
    {
      type: 'primary',
      label: '编辑',
      value: 'edit',
    },
    {
      type: 'danger',
      label: '删除',
      value: 'delete',
    },
  ],
})

// 参数定义
const params = ref<PagingParams>({
  pageIndex: 1,
  pageSize: getPageSize(),
})

// 获取列表数据
const getTableList = async () => {
  table.value.loading = true
  const res = await queryTableList(params.value)
  table.value.loading = false
  table.value.total = res?.total ?? 0
  table.value.data = res?.list ?? []
}

// 搜索
const onInquire = (val: Record<string, any>) => {
  params.value = { ...params.value, ...val, pageIndex: 1 }
  getTableList()
}

// 重置
const onReset = () => {
  params.value = { pageIndex: 1, pageSize: getPageSize() }
  getTableList()
}

// 分页改变
const onPagingChange = (val: PagingParams) => {
  params.value.pageIndex = val.pageIndex
  params.value.pageSize = val.pageSize
  getTableList()
}

// 操作
const onOperate = async (key: string, val?: any) => {
  switch (key) {
    case 'add': {
      TableAddRef.value?.open()
      break
    }
    case 'batch_deletion': {
      const selected = TableRef.value?.getSelectionRows()
      if (!selected?.length) {
        ElMessage.error('请选择要批量删除的项')
        return
      }
      await ElMessageBox.confirm('确定批量删除吗？', '提示', { type: 'warning' })
      const ids = selected.map(e => e.id)
      if (await deleteItems({ ids })) {
        ElMessage.success('批量删除成功')
        getTableList()
      }
    }
    case 'check': {
      RowCheckRef.value?.open(val)
      break
    }
    case 'edit': {
      RowEditRef.value?.open(val)
      break
    }
    case 'delete': {
      if (await deleteItem({ id: val!.id })) {
        ElMessage.success('删除成功')
        getTableList()
      }
      break
    }
  }
}

// 组件挂载完成
onMounted(() => {
  getTableList()
})
</script>

<template>
  <ViewWrapper>
    <VsSearch v-bind="search" @inquire="onInquire" @reset="onReset"></VsSearch>
    <VsTable
      ref="TableRef"
      v-bind="table"
      v-model:page-size="params.pageSize"
      v-model:current-page="params.pageIndex"
      @paging-change="onPagingChange"
      @operate="onOperate"
    >
      <template #status="{ row }">
        {{ getLabelByValue(row.status, STATUS_OPTIONS) }}
      </template>
      <template #deptId="{ row }">
        {{ getLabelByValue(row.deptId, deptListData ?? [], { label: 'label' }) }}
      </template>
    </VsTable>

    <TableAdd ref="TableAddRef" @succeed="getTableList" />
    <RowCheck ref="RowCheckRef" @succeed="getTableList" />
    <RowEdit ref="RowEditRef" @succeed="getTableList" />
  </ViewWrapper>
</template>
