<script lang="ts" setup>
import { useMenuDataStore } from '@/stores/global'
import MenuItem from './menu-item.vue'

const menuData = computed(() => useMenuDataStore().menuData)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu class="my-menu" default-active="/home" @open="handleOpen" @close="handleClose">
    <MenuItem :menu-data />
  </el-menu>
</template>

<style lang="scss" scoped>
.my-menu {
  height: 100%;
  border-right-width: 0;
  padding: 0 16px;
}
</style>
