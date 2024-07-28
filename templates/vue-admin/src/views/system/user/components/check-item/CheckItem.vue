<script setup lang="ts">
import { FormDetail } from '..'
import { toRenderData } from '../util'

const show = ref(false)
const form = ref<Record<string, any>>({})

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
  <el-dialog v-model="show" title="查看">
    <FormDetail v-model="form" disabled />
  </el-dialog>
</template>
