<script setup lang="ts">
import { ActiveDesignData } from '@/components';

const props = defineProps<{
  formData: ActiveDesignData;
}>();

const _formData = toRef(props, 'formData');
</script>

<template>
  <el-form-item prop="idAlias">
    <template #label>
      <my-label label="唯一标识符别名" />
    </template>
    <el-input v-model="_formData.idAlias"></el-input>
  </el-form-item>
</template>
