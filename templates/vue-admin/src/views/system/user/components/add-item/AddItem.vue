<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { FormDetail, type FormDetailInstance } from '..'
import { toSubmitData } from '../util'
import { addItem } from '@/api/system/user'

const emit = defineEmits<{
  (e: 'add-success'): void
}>()

const show = ref(false)
const form = ref<Record<string, any>>(initFormData())
const FormDetailRef = ref<FormDetailInstance>()
const loading = ref(false)

async function onConfirm() {
  const valid = await FormDetailRef.value?.validate()
  if (!valid) return
  loading.value = true
  if (await addItem(toSubmitData(form.value))) {
    ElMessage.success('新增成功')
    emit('add-success')
  }
  loading.value = false
  show.value = false
}

function onClosed() {
  form.value = initFormData()
}

function initFormData() {
  return {
    status: 1
  }
}

// 以下 defineExpose
function open() {
  show.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog class="adaptive-dialog" v-model="show" title="新增" @closed="onClosed">
    <FormDetail ref="FormDetailRef" v-model="form" />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>
