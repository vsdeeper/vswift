<script setup lang="ts">
import { useDemoViewStore } from '@/stores/demo-view'
import { SemiSelect } from '@element-plus/icons-vue'

const props = defineProps<{
  formItemProp: string
}>()

const model = defineModel<Record<string, any>[]>({ default: () => [] })
const { selectdListData } = storeToRefs(useDemoViewStore())

const onChange = async (key: string, val: any) => {}

const onDelete = (index: number) => {
  model.value.splice(index, 1)
}

const onAdd = () => {
  model.value.push({})
}

const genFormItemProp = (prop: string) => {
  return `${props.formItemProp}.${prop}`
}
</script>

<template>
  <div class="data-table-list-model">
    <el-table :data="model" border stripe>
      <el-table-column prop="input" label="输入框">
        <template #default="{ row, $index }">
          <el-form-item
            label="输入框"
            :prop="genFormItemProp(`${$index}.input`)"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <el-input v-model="row.input" type="text" placeholder="请输入" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="inputnumber" label="数字输入框">
        <template #default="{ row, $index }">
          <el-form-item
            label="数字输入框"
            :prop="genFormItemProp(`${$index}.inputnumber`)"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <el-input-number
              v-model="row.inputnumber"
              placeholder="请输入"
              :min="0"
              :max="Number.MAX_SAFE_INTEGER"
            />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="selectd" label="选择器">
        <template #default="{ row, $index }">
          <el-form-item
            label="选择器"
            :prop="genFormItemProp(`${$index}.selectd`)"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <el-select
              v-model="row.selectd"
              clearable
              filterable
              @change="onChange('selectd', $event)"
            >
              <el-option
                v-for="item in selectdListData"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80px" fixed="right">
        <template #default="{ $index }">
          <el-button
            type="danger"
            size="small"
            :icon="SemiSelect"
            circle
            @click="onDelete($index)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-button class="add-btn" type="primary" @click="onAdd"> + 新增 </el-button>
  </div>
</template>

<style lang="scss" scoped>
.add-btn {
  width: 100%;
  margin-top: 5px;
}
</style>
