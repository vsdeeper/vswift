<script setup lang="ts">
import { throttle } from 'radash'
import { Close } from '@element-plus/icons-vue'
import type { TreeKey, TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'
import { type InputInstance, ElTree as MyTree, ElTreeV2 as MyTreeV2 } from 'element-plus'
import type { VsTreeSelectProps, VsTreeSelectValue, VsTreeSelectValueItem } from '.'
import { findArraryValueFromTreeData, isArraryObject } from '@vswift/utils'

const props = withDefaults(defineProps<VsTreeSelectProps>(), {
  modelValue: undefined,
  options: () => [],
  sourceOptions: undefined, // 未设置则以data为准
  title: '请选择',
  lazy: false,
  disabled: undefined,
  multiple: true,
  placeholder: '请选择',
  virtualized: true,
  checkStrictly: false,
  itemLabel: 'label',
  itemValue: 'id',
  itemChildren: 'children',
  returnObject: true,
  filterValue: undefined,
  appendToBody: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', v?: VsTreeSelectValue): void
  (e: 'click-selected-tag', v: TreeKey): void
}>()

const formDisabled = inject<Ref<boolean>>('formDisabled') // 父组件注入的formDisabled
const _disabled = computed(() => formDisabled?.value ?? props.disabled)
const show = ref(false)
const loading = ref(false)
const filterText = ref('')
const filterTextSelected = ref('')
const treeRef = ref()
const treeV2Ref = ref()
const value = ref<VsTreeSelectValue>() // 接收modelValue的值，辅助渲染select框中的选中项，类型和modelValue保持一致
const copySourceOptions = ref<Record<string, any>[]>([]) // 源数据，只用于做选项回显
const renderOptions = ref<Record<string, any>[]>([]) // 弹框左侧选项渲染数据
const renderCheckedNodes = ref<TreeNodeData[]>() // 弹框右侧选中项渲染数据
const filterInputRef = ref<InputInstance>()
const allSelected = computed(
  () =>
    getRenderCheckedNodes(renderCheckedNodes.value, props.filterValue).length ===
    getAllKeys().length
)

watch(
  [() => props.modelValue, () => props.options, () => props.sourceOptions],
  (res) => {
    const [val, options, sourceOptions] = res
    if (!options?.length) return
    if (Array.isArray(val)) {
      value.value = val ?? []
    } else {
      value.value = val ? [val] : []
    }
    // 选项渲染数据
    renderOptions.value = options
    loading.value = false
    // 备份源数据，仅用于外部回显
    copySourceOptions.value = sourceOptions ?? JSON.parse(JSON.stringify(options))
    // 设置选中项
    getTreeRef()?.setCheckedKeys(getTreeKeysByValue(value.value))
    renderCheckedNodes.value = getTreeRef()?.getCheckedNodes()

    // 虚拟渲染时，手动展开所有选项，防止异步数据延迟
    if (props.virtualized) expandAllForTreeV2(renderOptions.value)
  },
  { immediate: true }
)

const confirm = () => {
  const checkedNodes = getRenderCheckedNodes(renderCheckedNodes.value, props.filterValue)
  if (props.returnObject) {
    emit(
      'update:modelValue',
      props.multiple
        ? checkedNodes.map((e) => ({
            [props.itemValue]: e[props.itemValue],
            [props.itemLabel]: e[props.itemLabel]
          }))
        : checkedNodes.map((e) => ({
            [props.itemValue]: e[props.itemValue],
            [props.itemLabel]: e[props.itemLabel]
          }))[0]
    )
  } else {
    emit(
      'update:modelValue',
      props.multiple
        ? checkedNodes.map((e) => e[props.itemValue])
        : checkedNodes.map((e) => e[props.itemValue])[0]
    )
  }
  show.value = false
}

const filterMethod = (value: string, data: TreeNodeData) => {
  if (!value) return true
  return data[props.itemLabel]?.includes(value)
}

const operate = (type: string, data?: unknown) => {
  switch (type) {
    case 'click.field': {
      if (_disabled.value) return
      show.value = true
      loading.value = true
      break
    }
    case 'opened.dialog': {
      // 设置选中项
      getTreeRef()?.setCheckedKeys(getTreeKeysByValue(value.value))
      renderCheckedNodes.value = getTreeRef()?.getCheckedNodes()
      /** 如果是虚拟渲染，则手动设置全部展开 */
      if (props.virtualized) expandAllForTreeV2(renderOptions.value)
      setTimeout(() => {
        if (renderOptions.value.length) {
          filterInputRef.value?.focus()
        }
        loading.value = false
      }, 300)
      break
    }
    case 'closed.dialog': {
      filterText.value = ''
      filterTextSelected.value = ''
      break
    }
    case 'click.selectedTag': {
      emit('click-selected-tag', data as TreeKey)
      break
    }
    case 'clear.dialog': {
      getTreeRef()?.setCheckedKeys([])
      renderCheckedNodes.value = getTreeRef()?.getCheckedNodes()
      break
    }
    case 'clear.field': {
      if (_disabled.value) return
      value.value = undefined
      emit('update:modelValue', undefined)
      break
    }
    case 'delete.dialog': {
      const findIndex1 = renderCheckedNodes.value!.findIndex(
        (node) => node[props.itemValue] === (data as TreeNodeData)[props.itemValue]
      )
      findIndex1 > -1 && renderCheckedNodes.value!.splice(findIndex1, 1)

      const checkedNodes = getTreeRef()?.getCheckedNodes() || []
      const findIndex2 = checkedNodes.findIndex(
        (node) => node[props.itemValue] === (data as TreeNodeData)[props.itemValue]
      )
      findIndex2 > -1 && checkedNodes.splice(findIndex2, 1)
      getTreeRef()?.setCheckedKeys(checkedNodes.map((node) => node[props.itemValue]))
      break
    }
    case 'delete.field': {
      if (_disabled.value) return
      if (Array.isArray(value.value)) {
        if (isArraryObject(value.value)) {
          const findIndex = (value.value as Record<string, any>[])!.findIndex(
            (e) => e[props.itemValue] === (data as Record<string, any>)[props.itemValue]
          )
          findIndex > -1 && (value.value as Record<string, any>[])!.splice(findIndex, 1)
        } else {
          const findIndex = (value.value as TreeKey[])!.findIndex((e) => e === (data as TreeKey))
          findIndex > -1 && (value.value as TreeKey[])!.splice(findIndex, 1)
        }
      } else {
        value.value = undefined
      }
      emit('update:modelValue', props.multiple ? value.value : value.value?.[0])
      break
    }
    case 'toggle.allSelection': {
      if (allSelected.value) {
        getTreeRef()?.setCheckedKeys([])
      } else {
        getTreeRef()?.setCheckedKeys(getAllKeys())
      }
      nextTick(() => {
        renderCheckedNodes.value = getTreeRef()?.getCheckedNodes()
      })
      break
    }
  }
}

const onCheck = (item: TreeNodeData) => {
  // 单选时
  if (!props.multiple) {
    getTreeRef()?.setCheckedKeys([])
    getTreeRef()?.setCheckedKeys([item[props.itemValue]])
  }

  renderCheckedNodes.value = getCheckedNodes()
}

watch(
  filterText,
  throttle({ interval: 500 }, (val) => {
    getTreeRef()?.filter(val)
  })
)

watch(
  filterTextSelected,
  throttle({ interval: 500 }, (val) => {
    const checkedNodes = getCheckedNodes()
    renderCheckedNodes.value = checkedNodes.filter((node) => node[props.itemLabel].includes(val))
  })
)

function getCheckedNodes() {
  return getTreeRef()?.getCheckedNodes() || []
}

function getTreeRef<T = InstanceType<typeof MyTree>>(): T | undefined {
  return props.virtualized ? treeV2Ref.value : treeRef.value
}

function getTreeKeysByValue(data?: VsTreeSelectValue) {
  if (!data) return []
  if (Array.isArray(data)) {
    if (!data.length) return []
    if (isArraryObject(data)) {
      return (data as VsTreeSelectValueItem[]).map(
        (e: VsTreeSelectValueItem) => (e as Record<string, any>)[props.itemValue] as TreeKey
      )
    } else return data as TreeKey[]
  } else {
    if (typeof data === 'object') return data[props.itemValue]
    else return data
  }
}

function getTreeKey(data: VsTreeSelectValueItem) {
  if (typeof data === 'object') {
    return data[props.itemValue] as TreeKey
  } else return data
}

function toArraryValue(value?: VsTreeSelectValue): VsTreeSelectValueItem[] {
  if (typeof value === 'undefined') return []
  return Array.isArray(value) ? value : [value]
}

function getLabel(item: VsTreeSelectValueItem, data: Record<string, any>[]) {
  if (typeof item === 'object') {
    const finds = findArraryValueFromTreeData(item[props.itemValue], data, {
      id: props.itemValue,
      label: props.itemLabel,
      returnType: 'labels'
    })
    return finds?.length ? finds.join('/') : '未知'
  } else {
    const finds = findArraryValueFromTreeData(item, data, {
      id: props.itemValue,
      label: props.itemLabel,
      returnType: 'labels'
    })
    return finds ? finds.join('/') : '未知'
  }
}

function expandAllForTreeV2(data: Record<string, any>[]) {
  const looper = (arr: Record<string, any>[]): TreeKey[] => {
    return arr.reduce((pre: TreeKey[], cur: Record<string, any>) => {
      return [
        ...pre,
        ...(cur[props.itemChildren]?.length
          ? [cur[props.itemValue], ...looper(cur[props.itemChildren])]
          : [])
      ]
    }, [])
  }
  getTreeRef<InstanceType<typeof MyTreeV2>>()?.setExpandedKeys(looper(data))
}

function getRenderCheckedNodes(
  renderCheckedNodes?: TreeNodeData[],
  filterValue?: (data: Record<string, any>[]) => Record<string, any>[]
) {
  if (!renderCheckedNodes) return []
  if (!filterValue) return renderCheckedNodes.filter((e) => !e.disabled)
  return filterValue(renderCheckedNodes.filter((e) => !e.disabled))
}

function getAllKeys() {
  const { options, itemValue, filterValue } = props
  const validData = filterValue ? filterValue(toFlattenData(options)) : toFlattenData(options)
  return validData.map((e) => e[itemValue]) as TreeKey[]
}

function toFlattenData(data: Record<string, any>[]) {
  const { itemChildren } = props
  return data.reduce((prev: Record<string, any>[], cur): Record<string, any>[] => {
    return [
      ...prev,
      ...(cur.disabled ? [] : [cur]),
      ...(cur[itemChildren]?.length ? toFlattenData(cur[itemChildren]) : [])
    ]
  }, [])
}

defineExpose({
  getTreeRef
})
</script>

<template>
  <div
    class="vs-tree-select"
    :class="{ disabled: _disabled, 'collapse-tags': collapseTags }"
    @click="operate('click.field')"
  >
    <div class="inner">
      <span v-if="!toArraryValue(value).length" class="placeholder">{{ placeholder }}</span>
      <template v-if="collapseTags">
        <el-tag
          v-if="toArraryValue(value).length"
          class="link-tag"
          closable
          disable-transitions
          :type="_disabled ? 'info' : undefined"
          @close="operate('delete.field', toArraryValue(value)[0])"
          @click.stop="operate('click.selectedTag', toArraryValue(value)[0])"
        >
          {{ getLabel(toArraryValue(value)[0], copySourceOptions) }}
        </el-tag>
        <el-tooltip
          v-if="toArraryValue(value).length > 1 && collapseTagsTooltip"
          placement="bottom"
          effect="light"
          popper-class="tag-tooltip-popper"
        >
          <el-tag disable-transitions :type="_disabled ? 'info' : undefined">
            +{{ toArraryValue(value).length - 1 }}
          </el-tag>
          <template #content>
            <el-tag
              v-for="item in toArraryValue(value).slice(1)"
              :key="getTreeKey(item)"
              class="link-tag"
              closable
              disable-transitions
              :type="_disabled ? 'info' : undefined"
              @close="operate('delete.field', item)"
              @click.stop="operate('click.selectedTag', item)"
            >
              {{ getLabel(item, copySourceOptions) }}
            </el-tag>
          </template>
        </el-tooltip>
        <el-tag
          v-if="toArraryValue(value).length > 1 && !collapseTagsTooltip"
          disable-transitions
          :type="_disabled ? 'info' : undefined"
        >
          +{{ toArraryValue(value).length - 1 }}
        </el-tag>
      </template>
      <el-tag
        v-for="item in toArraryValue(value)"
        v-else
        :key="getTreeKey(item)"
        class="link-tag"
        closable
        disable-transitions
        :type="_disabled ? 'info' : undefined"
        @close="operate('delete.field', item)"
        @click.stop="operate('click.selectedTag', item)"
      >
        {{ getLabel(item, copySourceOptions) }}
      </el-tag>
    </div>
    <el-button
      v-if="toArraryValue(value).length"
      class="clear"
      :icon="Close"
      link
      :disabled="_disabled"
      @click.stop="operate('clear.field')"
    ></el-button>
  </div>
  <el-dialog
    v-model="show"
    class="vs-tree-select-dialog"
    :class="{ virtualized }"
    :title="title"
    :append-to-body="appendToBody"
    @opened="operate('opened.dialog')"
    @closed="operate('closed.dialog')"
  >
    <el-row v-loading="loading">
      <el-col :span="14">
        <el-input
          ref="filterInputRef"
          class="search-input"
          v-model="filterText"
          clearable
          placeholder="请输入关键词"
        />
        <div v-if="renderOptions.length" class="toggle-all-selection">
          <el-checkbox v-model="allSelected" @change="operate('toggle.allSelection')">
            {{ allSelected ? '取消全选' : '全选' }}
          </el-checkbox>
        </div>
        <el-tree-v2
          v-if="virtualized"
          ref="treeV2Ref"
          :data="renderOptions"
          highlight-current
          :filter-method="filterMethod"
          :props="{
            label: itemLabel,
            value: itemValue,
            children: itemChildren
          }"
          show-checkbox
          :check-strictly="checkStrictly"
          :height="380"
          @check="onCheck"
        />
        <el-tree
          v-else
          ref="treeRef"
          :data="renderOptions"
          :class="{ single: !multiple }"
          :lazy="lazy"
          show-checkbox
          default-expand-all
          :node-key="itemValue"
          highlight-current
          :check-strictly="checkStrictly"
          :filter-node-method="filterMethod"
          :props="{
            label: itemLabel,
            children: itemChildren
          }"
          @check="onCheck"
        />
      </el-col>
      <el-col :span="10">
        <el-input
          v-model="filterTextSelected"
          class="search-input"
          clearable
          placeholder="请输入关键词"
        />
        <div class="topbar">
          <div class="text">
            已选：{{ getRenderCheckedNodes(getCheckedNodes(), filterValue).length }} 个
          </div>
          <div class="btns">
            <el-button
              v-if="getRenderCheckedNodes(getCheckedNodes(), filterValue).length"
              type="primary"
              link
              @click="operate('clear.dialog')"
            >
              清空
            </el-button>
          </div>
        </div>
        <div class="items">
          <div
            v-for="node in getRenderCheckedNodes(renderCheckedNodes, filterValue)"
            :key="node[props.itemValue]"
            class="item"
          >
            <span>{{ node[props.itemLabel] }}</span>
            <el-button
              link
              circle
              :icon="Close"
              @click="operate('delete.dialog', node)"
            ></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.vs-tree-select-dialog {
  min-width: 560px;
  max-width: 710px;
  .toggle-all-selection {
    display: flex;
    justify-content: flex-start;
    & > label[class*='-checkbox'] {
      margin-left: 24px;
    }
  }
  div[class*='-row'] {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    div[class*='-col'] {
      padding: 16px;
      &:first-child {
        border-right: 1px solid #dcdfe6;
      }
    }
  }
  div[class*='-tree '] {
    overflow: auto;
    max-height: 355px;
    &.single {
      span[class*='-checkbox__input'] {
        span[class*='-checkbox__inner'] {
          border-radius: 50%;
          &::after {
            width: 4px;
            height: 4px;
            border-radius: var(--zonst-components-border-radius-circle);
            background-color: var(--zonst-components-color-white);
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0.15s ease-in;
          }
        }
        &.is-checked {
          span[class*='-checkbox__inner']::after {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      }
    }
  }
  .search-input {
    margin-bottom: 10px;
  }
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-left: 5px;
    .text {
      font-weight: bold;
    }
  }
  .items {
    max-height: 345px;
    overflow: auto;
    padding-right: 16px;
    margin-right: -16px;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0 0 5px;
      font-size: 12px;
      line-height: 24px;
      &:hover {
        background-color: rgba($color: #dcdfe6, $alpha: 0.35);
      }
      span {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      button[class*='-button'] {
        margin-left: 5px;
      }
    }
  }
}
span[class*='-tag '].link-tag {
  cursor: pointer;
  span[class*='-tag__content']:hover {
    text-decoration: underline;
  }
}
.tag-tooltip-popper {
  max-height: 300px;
  overflow: auto;
  span[class*='-tag '].link-tag {
    margin: 2px;
  }
}
</style>

<style lang="scss" scoped>
.vs-tree-select {
  --border-color: #dcdfe6;
  --border-radius: 4px;
  --disabled-bg-color: #f5f7fa;
  --min-height: 32px;
  --text-color-placeholder: #a8abb2;
  --input-icon-color: #dcdfe6;
  display: flex;
  position: relative;
  width: 100%;
  cursor: pointer;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-sizing: border-box;
  background-color: #fff;
  transition: border-color var(--el-transition-duration-fast)
    var(--el-transition-function-ease-in-out-bezier);
  &.disabled {
    cursor: not-allowed;
    background-color: var(--disabled-bg-color);
    span[class*='-tag '] {
      :deep {
        i[class*='-icon '] {
          cursor: not-allowed !important;
        }
      }
    }
  }
  .inner {
    flex: 1;
    min-height: var(--min-height);
    padding: 0 30px 0 11px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .placeholder {
      color: var(--text-color-placeholder);
      font-size: var(--el-font-size-base);
    }

    & > span[class*='-tag '] {
      margin: 3px 3px 3px 0;
      height: auto;
      white-space: unset;
      line-height: 15px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .clear {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color-placeholder);
  }
}
</style>
