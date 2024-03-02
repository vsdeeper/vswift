<script setup lang="ts">
import { ActiveDesignData } from '@/components';

const props = defineProps<{
  formData: ActiveDesignData;
}>();

const _formData = toRef(props, 'formData');
</script>

<template>
  <el-form-item prop="id" :rules="[{ required: true, message: '必填项' }]">
    <template #label>
      <my-label label="唯一标识符" />
    </template>
    <el-input v-model="_formData.id" readonly></el-input>
  </el-form-item>
</template>
