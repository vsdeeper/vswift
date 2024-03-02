<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { ColorEditor, FontSizeEditor, HeightEditor, IdEditor, NameEditor, SuffixIconEditor } from '../property-editor';
import { ROW_GUTTER } from '../constants';

defineProps<{
  formData: MergeDesignData;
}>();
</script>

<template>
  <el-container>
    <el-aside width="250px"> 左侧边栏 </el-aside>
    <el-container>
      <el-header height="50px"> 顶部 </el-header>
      <el-main> 主体 </el-main>
    </el-container>
    <el-aside width="250px"> 右侧边栏 </el-aside>
  </el-container>
</template>
