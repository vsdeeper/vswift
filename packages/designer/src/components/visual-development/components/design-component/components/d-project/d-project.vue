<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { ROW_GUTTER } from '../constants';

defineProps<{
  formData: MergeDesignData;
}>();
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <el-col :span="24">
      <el-form-item label="项目名称" prop="name" :rules="[{ required: true, message: '必填项' }]">
        <el-input v-model="formData.options.name" placeholder="请输入" clearable></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="git地址" prop="git">
        <el-input v-model="formData.options.git" placeholder="请输入" clearable></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="项目描述" prop="description">
        <el-input
          v-model="formData.options.description"
          type="textarea"
          autosize
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>
