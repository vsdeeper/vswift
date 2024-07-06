<script lang="ts" setup>
import { useMenuDataStore } from '@/stores/global'
import MenuItem from './MenuItem.vue'

defineProps<{
  defaultActive?: string
}>()

const menuData = computed(() => useMenuDataStore().menuData)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu class="my-menu" router :default-active @open="handleOpen" @close="handleClose">
    <MenuItem :menu-data />
  </el-menu>
</template>

<style lang="scss" scoped>
.my-menu {
  height: calc(100% - 60px);
  border-right-width: 0;
  padding: 0 15px;
}
</style>
