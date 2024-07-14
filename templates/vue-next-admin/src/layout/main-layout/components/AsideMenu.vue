<script lang="ts" setup>
import { useAppSettingDataStore, useMenuDataStore } from '@/stores/global'
import MenuItem from './MenuItem.vue'
import { storeToRefs } from 'pinia'

defineProps<{
  collapse?: boolean
  defaultActive?: string
}>()

const { appSettingData } = storeToRefs(useAppSettingDataStore())
const menuData = computed(() => useMenuDataStore().menuData)
const uniqueOpened = computed(() => appSettingData.value?.menu.uniqueOpened)
</script>

<template>
  <el-menu
    class="my-menu"
    router
    :collapse
    :default-active
    :collapse-transition="false"
    :unique-opened
    popper-class="my-menu-popper"
  >
    <MenuItem :menu-data />
  </el-menu>
</template>

<style lang="scss">
.my-menu-popper {
  li[class*='-menu-item'] {
    border-radius: 0;
  }
  div[class*='-sub-menu__title'] {
    border-radius: 0;
  }
}
</style>
<style lang="scss" scoped>
.my-menu {
  height: calc(100% - 60px);
  border-right-width: 0;
  padding: 0 15px;
}
ul[class*='-menu--collapse'] {
  width: 100%;
}
</style>
