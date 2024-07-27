<script setup lang="ts">
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const form = defineModel<Record<string, any>>({ default: () => ({}) })

async function validate() {
  return await formRef.value?.validate()
}

async function clearValidate() {
  formRef.value?.clearValidate()
}

defineExpose({
  validate,
  clearValidate
})
</script>

<template>
  <el-form ref="formRef" :model="form" label-width="100px" :inline="false">
    <el-form-item label="输入框" prop="input" :rules="[{ required: true, message: '必填项' }]">
      <el-input v-model="form.input" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item
      label="数字输入框"
      prop="input_number"
      :rules="[{ required: true, message: '必填项' }]"
    >
      <el-input-number
        v-model="form.input_number"
        placeholder="请输入"
        :min="-Number.MAX_SAFE_INTEGER"
        :max="Number.MAX_SAFE_INTEGER"
        :step="1"
        :controls="true"
        controls-position="right"
      >
      </el-input-number>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch
        v-model="form.status"
        :active-value="1"
        :inactive-value="2"
        active-text="启用"
        inactive-text="禁用"
        inline-prompt
      >
      </el-switch>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="form.remark" type="textarea" placeholder="请输入" autosize> </el-input>
    </el-form-item>
  </el-form>
</template>
