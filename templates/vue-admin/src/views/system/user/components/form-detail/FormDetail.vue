<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/system/user'
import { EMPLOYEE_STATUS_OPTIONS } from '@/utils'

defineProps<{
  disabled?: boolean
}>()

const formRef = ref<FormInstance>()
const form = defineModel<Record<string, any>>({ default: () => ({}) })
const departmentOptions = ref<Record<string, any>[]>([])
const positionOptions = ref<Record<string, any>[]>([])
const { getPositionData } = useUserStore()

onMounted(() => {
  const { getdDepartmentData } = useUserStore()
  getdDepartmentData().then((res) => (departmentOptions.value = res ?? []))
})

watch(
  () => form.value.departmentId,
  async (val) => {
    if (val) {
      const res = await getPositionData(val)
      positionOptions.value = res ?? []
    }
  },
  { once: true, immediate: true }
)

async function onChange(key: string, val?: any) {
  switch (key) {
    case 'departmentId': {
      form.value.positionId = undefined
      positionOptions.value = []
      const res = await getPositionData(val)
      positionOptions.value = res ?? []
      break
    }
  }
}

// 以下 defineExpose
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
  <el-form ref="formRef" :model="form" label-width="90px" :inline="false" :disabled>
    <el-form-item label="员工姓名" prop="name" :rules="[{ required: true, message: '必填项' }]">
      <el-input v-model="form.name" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="员工工号" prop="code" :rules="[{ required: true, message: '必填项' }]">
      <el-input v-model="form.code" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="部门" prop="departmentId" :rules="[{ required: true, message: '必填项' }]">
      <el-cascader
        :options="departmentOptions"
        v-model="form.departmentId"
        clearable
        filterable
        :props="{ checkStrictly: true, value: 'id' }"
        @change="(val) => onChange('departmentId', val)"
      >
      </el-cascader>
    </el-form-item>
    <el-form-item label="职位" prop="positionId" :rules="[{ required: true, message: '必填项' }]">
      <el-select v-model="form.positionId" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in positionOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="手机号" prop="phone" :rules="[{ required: true, message: '必填项' }]">
      <el-input v-model="form.phone" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio-button
          v-for="item in EMPLOYEE_STATUS_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="form.remark" type="textarea" placeholder="请输入" autosize> </el-input>
    </el-form-item>
  </el-form>
</template>
