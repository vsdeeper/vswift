<script setup lang="ts">
import { Promotion } from '@element-plus/icons-vue'
import logo from '@/assets/logo.svg'
</script>

<template>
  <div class="logo">
    <el-image class="my-image" :src="logo" fit="contain" :lazy="true"></el-image>
    <span class="name">
      <span>Vsdeeper</span>
      <el-link
        type="info"
        :icon="Promotion"
        :underline="false"
        href="https://github.com/vsdeeper"
        target="_blank"
      />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  .my-image {
    flex: 0 0 32px;
  }
  .name {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-left: 10px;
    a[class*='-link'] {
      margin-left: 5px;
    }
  }
}
</style>
