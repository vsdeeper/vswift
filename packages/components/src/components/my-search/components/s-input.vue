<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <el-input v-model="model" placeholder="请输入" clearable></el-input>
</template>