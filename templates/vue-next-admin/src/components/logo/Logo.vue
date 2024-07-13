<script setup lang="ts">
import logo from '@/assets/logo.svg'
</script>

<template>
  <div class="logo">
    <el-image class="my-image" :src="logo" fit="contain"></el-image>
    <span class="name"> Vsdeeper </span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  .my-image {
    flex: 0 0 30px;
  }
  .name {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    letter-spacing: 1px;
    margin-left: 10px;
  }
}
</style>
