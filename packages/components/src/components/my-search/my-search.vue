<script setup lang="ts">
import { nanoid } from 'nanoid';

const id = `mysearch${nanoid(5)}`
const isInquiring = ref(false)

defineExpose({
  isInquiring
})
</script>

<template>
  <div :id="id" class="my-search">
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        
      </el-col>
      <el-col :span="12" :offset="0"></el-col>
    </el-row>
  </div>
</template>