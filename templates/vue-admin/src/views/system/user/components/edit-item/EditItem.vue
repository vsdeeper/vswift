<script setup lang="ts">
import { FormDetail, type FormDetailInstance } from '..'
import { toRenderData, toSubmitData } from '../util'
import { editItem } from '@/api/system/user'

const emit = defineEmits<{
  (e: 'edit-success'): void
}>()

const show = ref(false)
const form = ref<Record<string, any>>({})
const FormDetailRef = ref<FormDetailInstance>()
const loading = ref(false)

async function onConfirm() {
  const valid = await FormDetailRef.value?.validate()
  if (!valid) return
  loading.value = true
  if (await editItem(toSubmitData(form.value))) {
    ElMessage.success('编辑成功')
    emit('edit-success')
  }
  loading.value = false
  show.value = false
}

function onClosed() {
  form.value = {}
}

// 以下 defineExpose
function open(row: Record<string, any>) {
  show.value = true
  form.value = toRenderData(row)
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog class="adaptive-dialog" v-model="show" title="编辑" @closed="onClosed">
    <FormDetail ref="FormDetailRef" v-model="form" />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>
