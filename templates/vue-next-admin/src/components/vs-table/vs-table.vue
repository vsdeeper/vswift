<script setup lang="ts">
import type { VsTableColumnItem, VsTableOperateItem } from '.'
import TableColumn from './table-column.vue'
import { getSlots } from './util'
import type { LoadingBinding } from 'element-plus/es/components/loading/src/directive.mjs'
import type { PaginationProps, TableColumnCtx, TableInstance, TableProps } from 'element-plus'

const props = withDefaults(
  defineProps<{
    // 自定义属性
    loading?: LoadingBinding
    showIndex?: boolean
    showSelection?: boolean
    showPagination?: boolean
    showRowOperate?: boolean
    paginationAlign?: 'left' | 'right'
    tableOperateAlign?: 'left' | 'right'
    columns?: VsTableColumnItem[]
    rowOperateItems?: VsTableOperateItem[]
    tableOperateItems?: VsTableOperateItem[]
    currentPage?: number
    pageSize?: number

    // 源属性
    tableProps?: Partial<TableProps<Record<string, any>>>
    operateColumnProps?: Partial<TableColumnCtx<any>>
    paginationProps?: Partial<PaginationProps>
  }>(),
  {
    loading: false,
    showRowOperate: true,
    showPagination: true,
    paginationAlign: 'left',
    tableOperateAlign: 'left'
  }
)

const emit = defineEmits<{
  // 以下自定义 emit 事件
  (e: 'operate', key: string, row?: Record<string, any>): void
  (e: 'pagination-change', val: { currentPage: number; pageSize: number }): void
  (e: 'update:currentPage', val: number): void
  (e: 'update:pageSize', val: number): void
  // 以下 ElTable emit 事件
  <T = any>(e: 'select', selection: T[], row: T): void
  (e: 'select-all', selection: any[]): void
  (e: 'selection-change', newSelection: any[]): void
  (e: 'cell-mouse-enter', row: any, column: any, cell: HTMLTableCellElement, event: Event): void
  (e: 'cell-mouse-leave', row: any, column: any, cell: HTMLTableCellElement, event: Event): void
  (e: 'cell-click', row: any, column: any, cell: HTMLTableCellElement, event: Event): void
  (e: 'cell-dblclick', row: any, column: any, cell: HTMLTableCellElement, event: Event): void
  (e: 'cell-contextmenu', row: any, column: any, cell: HTMLTableCellElement, event: Event): void
  (e: 'row-click', row: any, column: any, event: Event): void
  (e: 'row-contextmenu', row: any, column: any, event: Event): void
  (e: 'row-dblclick', row: any, column: any, event: Event): void
  (e: 'header-contextmenu', column: any, event: Event): void
  (e: 'sort-change', data: { column: any; prop: string; order: any }): void
  (e: 'filter-change', newFilters: any): void
  (e: 'current-change', currentRow: any, oldCurrentRow: any): void
  (e: 'header-dragend', newWidth: number, oldWidth: number, column: any, event: MouseEvent): void
  (e: 'expand-change', row: any, expanded: any[] | boolean): void
}>()

const tableRef = ref<TableInstance>()
const _currentPage = ref<number>()
const _pageSize = ref<number>()
const paginationLayout = ref('total, sizes, prev, pager, next, jumper')
const paginationPagerCount = ref(5)

onMounted(() => {
  handleWindowResize()
  window.addEventListener('resize', handleWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})

watch(
  () => props.currentPage,
  (val) => {
    _currentPage.value = val
  },
  { immediate: true }
)

watch(
  () => props.pageSize,
  (val) => {
    _pageSize.value = val
  },
  { immediate: true }
)

watch(_currentPage, (val) => {
  emit('update:currentPage', val!)
})

watch(_pageSize, (val) => {
  emit('update:pageSize', val!)
})

function handleWindowResize() {
  const el = document.documentElement
  const ww = el.clientWidth
  if (ww < 768) {
    paginationLayout.value = 'total, prev, pager, next'
    paginationPagerCount.value = 3
  } else {
    paginationLayout.value = 'total, sizes, prev, pager, next, jumper'
    paginationPagerCount.value = 5
  }
}

function displayOperateItem(row: Record<string, any>, item: VsTableOperateItem) {
  const { show, code /** 权限标识符 */ } = item
  if (!show) return true
  return show(row, code)
}

function displayTableOperateItem(item: VsTableOperateItem) {
  const { show, code /** 权限标识符 */ } = item
  if (!show) return true
  return show(code)
}

function onOperate(key: string, val?: any) {
  emit('operate', key, val)
}

function handleSizeChange(val: number) {
  emit('pagination-change', { currentPage: 1, pageSize: val })
}

function handleCurrentChange(val: number) {
  emit('pagination-change', { currentPage: val, pageSize: _pageSize.value! })
}

// 以下 ElTable Expose
function clearSelection() {
  tableRef.value?.clearSelection()
}

function getSelectionRows() {
  return tableRef.value?.getSelectionRows()
}

function toggleRowSelection(row: any, selected: boolean) {
  tableRef.value?.toggleRowSelection(row, selected)
}

function toggleAllSelection() {
  tableRef.value?.toggleAllSelection()
}

function toggleRowExpansion(row: any, expanded?: boolean) {
  tableRef.value?.toggleRowExpansion(row, expanded)
}

function setCurrentRow(row: any) {
  tableRef.value?.setCurrentRow(row)
}

function clearSort() {
  tableRef.value?.clearSort()
}

function clearFilter(columnKeys?: string[]) {
  tableRef.value?.clearFilter(columnKeys)
}

function doLayout() {
  tableRef.value?.doLayout()
}

function sort(prop: string, order: string) {
  tableRef.value?.sort(prop, order)
}

function scrollTo(options: number | ScrollToOptions, yCoord?: number) {
  tableRef.value?.scrollTo(options, yCoord)
}

function setScrollTop(top?: number) {
  tableRef.value?.setScrollTop(top)
}

function setScrollLeft(left?: number) {
  tableRef.value?.setScrollLeft(left)
}

defineExpose({
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft
})
</script>

<template>
  <div v-loading="loading" class="vs-table">
    <div v-if="tableOperateItems?.length" :class="['table-operate', tableOperateAlign]">
      <template
        v-for="(item, index) in tableOperateItems"
        :key="`tableOperateItem${item.value}${index}`"
      >
        <el-popconfirm
          v-if="item.showPopconfirm && displayTableOperateItem(item)"
          v-bind="item.popconfirmProps"
          @confirm="onOperate(item.value)"
        >
          <template #reference>
            <el-button v-bind="{ ...item.buttonProps, type: item.buttonProps?.type ?? 'primary' }">
              {{ item.label }}
            </el-button>
          </template>
        </el-popconfirm>
        <template v-else>
          <el-button
            v-if="displayTableOperateItem(item)"
            v-bind="{ ...item.buttonProps, type: item.buttonProps?.type ?? 'primary' }"
            @click="onOperate(item.value)"
          >
            {{ item.label }}
          </el-button>
        </template>
      </template>
    </div>
    <el-table v-if="columns?.length" ref="tableRef" v-bind="tableProps">
      <template #append="scope">
        <slot name="append" v-bind="scope"></slot>
      </template>
      <template #empty="scope">
        <slot name="empty" v-bind="scope"></slot>
      </template>
      <el-table-column v-if="showSelection" type="selection" fixed="left" width="55" />
      <el-table-column v-if="showIndex" type="index" width="50" :index="(index) => index + 1" />
      <TableColumn v-for="(col, index) in columns" :key="`${col.label}${col.prop}${index}`" :col>
        <template v-for="slot in getSlots(columns)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
        <template v-for="slot in getSlots(columns).map((e) => `${e}-header`)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </TableColumn>
      <el-table-column
        v-if="showRowOperate"
        class-name="column-operate"
        v-bind="{ label: '操作', fixed: 'right', ...operateColumnProps }"
      >
        <template #default="{ row }">
          <template
            v-for="(item, index) in rowOperateItems"
            :key="`rowOperateItem${item.value}${index}`"
          >
            <el-popconfirm
              v-if="item.showPopconfirm && displayOperateItem(row, item)"
              v-bind="item.popconfirmProps"
              @confirm="onOperate(item.value, row)"
            >
              <template #reference>
                <el-button
                  v-bind="{
                    ...item.buttonProps,
                    type: item.buttonProps?.type ?? 'primary',
                    link: true
                  }"
                >
                  {{ item.label }}
                </el-button>
              </template>
            </el-popconfirm>
            <template v-else>
              <el-button
                v-if="displayOperateItem(row, item)"
                v-bind="{
                  ...item.buttonProps,
                  type: item.buttonProps?.type ?? 'primary',
                  link: true
                }"
                @click="onOperate(item.value, row)"
              >
                {{ item.label }}
              </el-button>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-text v-else class="no-data" type="info" tag="i">未配置表格列</el-text>
    <div v-if="showPagination" :class="['pagination', paginationAlign]">
      <el-pagination
        v-model:current-page="_currentPage"
        v-model:page-size="_pageSize"
        v-bind="{
          pageSizes: [10, 20, 30, 40, 50],
          layout: paginationLayout,
          pagerCount: paginationPagerCount,
          background: true,
          ...paginationProps
        }"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vs-table {
  .table-operate {
    display: flex;
    margin: 10px 0;
    &.right {
      justify-content: flex-end;
    }
    &.left {
      justify-content: flex-start;
    }
    :deep(button[class*='-button'] + button[class*='-button']) {
      margin-left: 5px;
    }
  }
  :deep(table[class*='-table__body']) {
    .column-operate {
      .cell {
        margin-left: -2px;
        button[class*='-button'] + button[class*='-button'] {
          margin: 0;
        }
      }
    }
  }
  .pagination {
    display: flex;
    margin: 16px 0;
    &.right {
      justify-content: flex-end;
    }
    &.left {
      justify-content: flex-start;
    }
  }

  .no-data {
    display: block;
    padding: 16px;
  }
}
</style>
