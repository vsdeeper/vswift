<script setup lang="ts">
import { InputInstance } from 'element-plus';
import { AddComponentOptionItem, AddComponentGroupOptionItem } from '.';
import { useGlobal } from '@/stores';

const props = defineProps<{
  options?: AddComponentGroupOptionItem[];
}>();

const emit = defineEmits<{
  (e: 'select', val: AddComponentOptionItem): void;
}>();

const searchRef = ref<InputInstance>();
const show = ref(false);
const word = ref();
const renderOptions = ref<AddComponentGroupOptionItem[]>([]);
const sourceOptions = ref<AddComponentGroupOptionItem[]>([]);

watch(
  () => props.options,
  options => {
    if (options) {
      renderOptions.value = options;
      sourceOptions.value = JSON.parse(JSON.stringify(options));
    }
  },
  { immediate: true, once: true },
);

watch(word, word => {
  const copySourceOptions: AddComponentGroupOptionItem[] = JSON.parse(JSON.stringify(sourceOptions.value));
  renderOptions.value = copySourceOptions.filter(groupItem => {
    groupItem.children = groupItem.children.filter(
      e => e.label.includes(word ?? '') || e.value.toLowerCase().includes((word ?? '').toLowerCase()),
    );
    return !!groupItem.children.length;
  });
});

function select(val: AddComponentOptionItem) {
  show.value = false;
  emit('select', val);
}

function open() {
  show.value = true;
  word.value = undefined;
}

function opened() {
  searchRef.value?.focus();
}

function toDisabled(groupItemId: string) {
  const { activeDesignData } = useGlobal();
  if (!activeDesignData /**不存在当前设计数据，即初始状态，只能添加项目组件 */) {
    return groupItemId !== 'ProjectContainer';
  } /** 存在设计数据，不能添加项目组件 */ else {
    return groupItemId === 'ProjectContainer';
  }
}

defineExpose({
  open,
});
</script>

<template>
  <el-dialog title="添加组件" v-model="show" @opened="opened">
    <div class="search">
      <el-input ref="searchRef" v-model="word" placeholder="请输入关键词" size="large" clearable></el-input>
    </div>
    <el-scrollbar max-height="350px">
      <div class="group-items" v-for="groupItem in renderOptions" :key="groupItem.id">
        <div class="name">{{ groupItem.name }}</div>
        <div class="item" v-for="item in groupItem.children" :key="item.value">
          <el-button
            :type="toDisabled(groupItem.id) ? 'info' : 'primary'"
            text
            size="large"
            :disabled="toDisabled(groupItem.id)"
            @click="select(item)"
          >
            {{ item.label }} - {{ item.value }}
          </el-button>
        </div>
      </div>
    </el-scrollbar>
    <div v-if="!renderOptions?.length" class="no-data">暂无数据</div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.search {
  margin-bottom: 15px;
}

.group-items {
  .name {
    font-size: 12px;
    margin: 10px 0;
    padding: 0 10px;
    color: var(--el-text-color-placeholder);
  }

  .item {
    .el-button {
      width: 100%;
      justify-content: flex-start;
    }
  }
}

.no-data {
  font-size: var(--el-font-size-base);
  line-height: 1;
  padding: 12px 19px;
  color: var(--el-disabled-text-color);
}
</style>
designer/src/stores
