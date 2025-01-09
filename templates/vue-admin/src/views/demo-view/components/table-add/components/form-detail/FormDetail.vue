<script setup lang="ts">
import { useDemoViewStore } from '@/stores/demo-view'
import type { FormInstance } from 'element-plus'
import { RADIO_OPTIONS, CHECKBOX_OPTIONS } from '../../../../constants'

defineProps<{
  disabled?: boolean
}>()

const formRef = ref<FormInstance>()
const model = defineModel<Record<string, any>>({ default: () => ({}) })
const { deptListData, personListData, cascaderIdListData } = storeToRefs(useDemoViewStore())

const onChange = async (key: string, val: any) => {}

const validate = async () => {
  return await formRef.value?.validate()
}

const clearValidate = () => {
  formRef.value?.clearValidate()
}

defineExpose({
  validate,
  clearValidate,
})
</script>

<template>
  <el-form ref="formRef" :model label-position="left" label-width="120px" :disabled>
    <el-text type="danger" style="display: block; width: 100%; padding: 12px 0">
      范德萨范德萨发
    </el-text>
    <el-divider direction="horizontal" border-style="solid" content-position="left">
      分割线
    </el-divider>
    <el-form-item
      label="名称"
      prop="name"
      :rules="[
        { required: true, message: '必填项' },
        {
          pattern: new RegExp('^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]w+)*$'),
          message: '邮箱格式不正确',
        },
      ]"
    >
      <el-input v-model="model.name" type="text" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="数字输入框" prop="tgf" :rules="[{ required: true, message: '必填项' }]">
      <el-input-number
        v-model="model.tgf"
        placeholder="请输入"
        :min="-5"
        :max="Number.MAX_SAFE_INTEGER"
        :precision="2"
      />
    </el-form-item>
    <el-form-item label="单选框" prop="radio" :rules="[{ required: true, message: '必填项' }]">
      <el-radio-group v-model="model.radio" @change="onChange('radio', $event)">
        <el-radio v-for="item in RADIO_OPTIONS" :key="item.value" :value="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="多选框" prop="checkbox" :rules="[{ required: true, message: '必填项' }]">
      <el-checkbox-group v-model="model.checkbox" @change="onChange('checkbox', $event)">
        <el-checkbox
          v-for="item in CHECKBOX_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="部门" prop="deptId" :rules="[{ required: true, message: '必填项' }]">
      <el-select v-model="model.deptId" clearable filterable @change="onChange('deptId', $event)">
        <el-option
          v-for="item in deptListData"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="测试" prop="person" :rules="[{ required: true, message: '必填项' }]">
      <el-select v-model="model.person" clearable filterable @change="onChange('person', $event)">
        <el-option
          v-for="item in personListData"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="级联选择器"
      prop="cascaderId"
      :rules="[{ required: true, message: '必填项' }]"
    >
      <el-cascader
        v-model="model.cascaderId"
        :options="cascaderIdListData"
        clearable
        filterable
        :props="{ label: 'label', value: 'id' }"
        @change="onChange('cascaderId', $event)"
      />
    </el-form-item>
    <el-form-item
      label="日期选择器"
      prop="daterange"
      :rules="[{ required: true, message: '必填项' }]"
    >
      <el-date-picker
        v-model="model.daterange"
        type="daterange"
        value-format="x"
        @change="onChange('daterange', $event)"
      />
    </el-form-item>
    <el-form-item label="日期选择器" prop="date" :rules="[{ required: true, message: '必填项' }]">
      <el-date-picker
        v-model="model.date"
        type="date"
        value-format="x"
        @change="onChange('date', $event)"
      />
    </el-form-item>
    <el-form-item
      label="日期时间选择器"
      prop="datetimerange"
      :rules="[{ required: true, message: '必填项' }]"
    >
      <el-date-picker
        v-model="model.datetimerange"
        type="datetimerange"
        value-format="x"
        @change="onChange('datetimerange', $event)"
      />
    </el-form-item>
    <el-form-item
      label="时间选择器"
      prop="timerange"
      :rules="[{ required: true, message: '必填项' }]"
    >
      <el-time-picker
        v-model="model.timerange"
        value-format="x"
        @change="onChange('timerange', $event)"
      />
    </el-form-item>
    <el-form-item label="上传" prop="files" :rules="[{ required: true, message: '必填项' }]">
      <VsUpload
        v-model="model.files"
        action="undefined"
        :single-file-size-limit="500"
        :amount-limit="9"
      />
    </el-form-item>
  </el-form>
</template>
