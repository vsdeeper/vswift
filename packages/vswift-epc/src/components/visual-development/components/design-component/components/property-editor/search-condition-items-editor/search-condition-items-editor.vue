<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue';
import { SearchConditionItem, SearchConditionType, SearchDesignDataOptions } from '@/components';
import { ROW_GUTTER } from '../../constants';
import { SEARCH_TYPE_OPTIONS, DATE_TYPE_OPTIONS } from './constants';
import { TabPaneName } from 'element-plus';
import { nanoid } from 'nanoid';
import { first, last } from 'lodash-es';
import { ApiConfigEditor, ApiConfigEditorInstance } from '..';

const props = defineProps<{
  options: SearchDesignDataOptions;
}>();

const options = toRef(props, 'options');
const apiRefs = ref<ApiConfigEditorInstance[]>([]);
const activeName = ref(first(options.value.searchConditionItems)?.id);

function addItem() {
  options.value.searchConditionItems?.push({ id: nanoid(5) });
  activeName.value = last(options.value.searchConditionItems)?.id;
}

function deleteItem(index: number, searchConditionItems: SearchConditionItem[]) {
  searchConditionItems.splice(index, 1);
  if (!searchConditionItems.length) return;
  if (searchConditionItems[index]) {
    activeName.value = searchConditionItems[index].id;
  } else {
    activeName.value = searchConditionItems[index - 1].id;
  }
}

function changeType(type: SearchConditionType, item: SearchConditionItem) {
  resetSearchConditionItem(item);
  switch (type) {
    case 'Select':
    case 'Cascader': {
      item.dataSource = 'api';
      item.apiMethod = 'GET';
      item.itemValue = 'id';
      break;
    }
    case 'DatePicker': {
      item.dateType = 'date';
      item.format = 'YYYY-MM-DD';
      item.valueFormat = 'x';
      break;
    }
  }
}

function resetSearchConditionItem(item: SearchConditionItem) {
  item.dataSource = undefined;
  item.api = undefined;
  item.apiMethod = undefined;
  item.apiParams = undefined;
  item.options = undefined;
  item.itemLabel = undefined;
  item.multiple = undefined;
  item.checkStrictly = undefined;
  item.lazy = undefined;
  item.format = undefined;
  item.valueFormat = undefined;
  item.dateType = undefined;
  item.virtualized = undefined;
}

function changeDataSource(name: TabPaneName, item: SearchConditionItem, index: number) {
  if (name === 'custom') {
    item.dataSource = 'custom';
    item.api = undefined;
    item.apiMethod = undefined;
    item.apiParams = undefined;
    item.itemValue = undefined;
    item.options = [{}];
  } else if (name === 'api') {
    item.dataSource = 'api';
    item.apiMethod = 'GET';
    item.options = undefined;
    item.itemValue = 'id';
    apiRefs.value[index]?.formItemRef?.clearValidate();
    setTimeout(() => apiRefs.value[index]?.formItemRef?.clearValidate());
  }
}
</script>

<template>
  <el-collapse v-if="options.searchConditionItems?.length" v-model="activeName" accordion>
    <el-collapse-item v-for="(item, index) in options.searchConditionItems" :key="item.id" :name="item.id">
      <template #title>
        <div style="display: flex; justify-content: flex-start; flex: 1">搜索条件 - {{ item.placeholder }}</div>
        <el-button
          type="danger"
          :icon="Minus"
          circle
          plain
          size="small"
          style="margin-right: 10px"
          @click.stop="deleteItem(index, options.searchConditionItems!)"
        >
        </el-button>
      </template>
      <el-row :gutter="ROW_GUTTER">
        <ResponsiveCol>
          <el-form-item
            :prop="['options', 'searchConditionItems', index + '', 'placeholder']"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <template #label>
              <my-label label="搜索名称" />
            </template>
            <el-input v-model="item.placeholder" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            :prop="['options', 'searchConditionItems', index + '', 'type']"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <template #label>
              <my-label label="搜索类型" />
            </template>
            <el-select v-model="item.type" placeholder="请选择" clearable @change="changeType($event, item)">
              <el-option
                v-for="item in SEARCH_TYPE_OPTIONS"
                :key="item.value"
                :label="`${item.label} - ${item.value}`"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            :prop="['options', 'searchConditionItems', index + '', 'key']"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <template #label>
              <my-label label="字段名称" />
            </template>
            <el-input v-model="item.key" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <!-- 搜索条件为DatePicker时，设置format、valueFormat、dateType -->
        <template v-if="item.type === 'DatePicker'">
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'format']">
              <template #label>
                <my-label label="显示在输入框中的格式" />
              </template>
              <el-input v-model="item.format" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'valueFormat']">
              <template #label>
                <my-label label="绑定值的格式" />
              </template>
              <el-input v-model="item.valueFormat" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'dateType']">
              <template #label>
                <my-label label="显示类型" />
              </template>
              <el-select v-model="item.dateType" placeholder="请选择" clearable>
                <el-option
                  v-for="item in DATE_TYPE_OPTIONS"
                  :key="item.value"
                  :label="`${item.label} - ${item.value}`"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </ResponsiveCol>
        </template>
        <!-- 搜索条件为Select时，设置label别名、value别名、多选 -->
        <template v-if="item.type === 'Select'">
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'itemLabel']">
              <template #label>
                <my-label label="label别名" />
              </template>
              <el-input v-model="item.itemLabel" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'itemValue']">
              <template #label>
                <my-label label="value别名" />
              </template>
              <el-input v-model="item.itemValue" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'multiple']">
              <template #label>
                <my-label label="多选" />
              </template>
              <el-radio-group v-model="item.multiple">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'virtualized']">
              <template #label>
                <my-label label="虚拟化选择器" />
              </template>
              <el-radio-group v-model="item.virtualized">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
        </template>
        <!-- 搜索条件为Cascader时，设置label别名、value别名、多选 -->
        <template v-if="item.type === 'Cascader'">
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'itemLabel']">
              <template #label>
                <my-label label="label别名" />
              </template>
              <el-input v-model="item.itemLabel" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'itemValue']">
              <template #label>
                <my-label label="value别名" />
              </template>
              <el-input v-model="item.itemValue" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'itemChildren']">
              <template #label>
                <my-label label="children别名" />
              </template>
              <el-input v-model="item.itemChildren" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'multiple']">
              <template #label>
                <my-label label="多选" />
              </template>
              <el-radio-group v-model="item.multiple">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'checkStrictly']">
              <template #label>
                <my-label label="父子节点不互相关联" />
              </template>
              <el-radio-group v-model="item.checkStrictly">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="['options', 'searchConditionItems', index + '', 'lazy']">
              <template #label>
                <my-label label="动态加载子节点" />
              </template>
              <el-radio-group v-model="item.lazy">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
        </template>
        <!-- 搜索条件为Select、Cascader时，设置选项数据 -->
        <el-col v-if="item.type === 'Select' || item.type === 'Cascader'" :span="24" style="margin-bottom: 20px">
          <el-tabs v-model="item.dataSource" @tab-change="changeDataSource($event, item, index)">
            <el-tab-pane label="接口定义" name="api">
              <ApiConfigEditor
                :ref="ref => (apiRefs[index] = ref as ApiConfigEditorInstance)"
                :options="item"
                :form-item-prop="['options', 'searchConditionItems', index + '']"
                :form-item-rules="[{ required: true }]"
                :show-message="false"
              ></ApiConfigEditor>
            </el-tab-pane>
            <el-tab-pane label="自定义" name="custom" :disabled="item.type === 'Cascader'">
              <OptionItemsConfig v-model="item.options" :index="index"></OptionItemsConfig>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
  <el-button type="primary" plain :icon="Plus" @click="addItem" style="width: 100%; margin-top: 10px">
    新增搜索条件
  </el-button>
</template>
../api-config-editor
