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
  <el-dialog class="adaptive-dialog" v-model="show" title="查看">
    <FormDetail v-model="form" disabled />
    <template #footer>
      <el-button @click="show = false">关闭</el-button>
    </template>
  </el-dialog>
</template>
