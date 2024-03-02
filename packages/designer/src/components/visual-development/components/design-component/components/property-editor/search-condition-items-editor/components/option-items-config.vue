<script setup lang="ts">
import { SearchConditionOptionItem } from '@/components';
import { Minus, Plus, Refresh } from '@element-plus/icons-vue';

defineProps<{
  index: number;
}>();
const model = defineModel<SearchConditionOptionItem[]>();
const value = ref<SearchConditionOptionItem[]>();

watch(model, model => {
  value.value = model;
});

watch(value, value => {
  model.value = value;
});

function _delete(idx: number) {
  value.value!.splice(idx, 1);
}

function add() {
  if (!value.value) value.value = [];
  value.value.push({});
}

function reset() {
  value.value = [{}];
}
</script>

<template>
  <div class="option-items-config">
    <el-row v-for="(item, subIndex) in value" :key="item.value" align="middle">
      <el-form-item
        :prop="['options', 'searchConditionItems', index + '', 'options', subIndex + '', 'value']"
        :rules="[{ required: true, message: '必填项' }]"
        :show-message="false"
        style="width: 100px; margin-right: 5px"
      >
        <el-input v-model="item.value" class="input" placeholder="选项值" />
      </el-form-item>
      <el-form-item
        :prop="['options', 'searchConditionItems', index + '', 'options', subIndex + '', 'label']"
        :rules="[{ required: true, message: '必填项' }]"
        :show-message="false"
        style="flex: 1"
      >
        <el-input v-model="item.label" placeholder="选项名称" />
      </el-form-item>
      <el-button
        type="danger"
        size="small"
        :icon="Minus"
        plain
        circle
        @click="_delete(index)"
        style="margin-left: 8px"
      ></el-button>
    </el-row>
    <div class="btns">
      <el-button type="primary" plain :icon="Plus" @click="add"> 新增选项 </el-button>
      <el-button type="primary" plain :icon="Refresh" @click="reset"> 重设选择项 </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.option-items-config {
  .el-row + .el-row {
    margin-top: 5px;
  }
  .btns {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .el-button + .el-button {
      margin: 5px 0 0;
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
