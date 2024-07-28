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
  display: inline-flex;
  align-items: center;
  height: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .my-image {
    flex: 0 0 30px;
    max-width: 30px;
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
