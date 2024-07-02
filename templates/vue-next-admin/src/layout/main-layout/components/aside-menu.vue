<script lang="ts" setup>
import { useMenuDataStore } from '@/stores/global'
import MenuItem from './menu-item.vue'

const menuData = computed(() => useMenuDataStore().menuData)

console.log(333, menuData.value)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    class="my-menu"
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="/home"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <MenuItem :menu-data />
  </el-menu>
</template>

<style lang="scss" scoped>
.my-menu {
  height: 100%;
}
</style>
