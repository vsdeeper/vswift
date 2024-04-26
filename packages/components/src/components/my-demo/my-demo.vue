<script setup lang="ts">
defineProps<{
  name: string
}>()
const msg = ref('test')
const color = ref<string>()
const input = ref<string>()

defineExpose({
  msg
})
</script>

<template>
  <div>{{ name }}{{ msg }}</div>
  <el-color-picker v-model="color" :show-alpha="true"></el-color-picker>
  <el-input v-model="input" placeholder="请输入" clearable></el-input>
</template>
