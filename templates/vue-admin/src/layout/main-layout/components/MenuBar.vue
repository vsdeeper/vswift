<script lang="ts" setup>
import { useAppSettingDataStore, useMenuDataStore } from '@/stores/global'
import MenuItem from './MenuItem.vue'
import { storeToRefs } from 'pinia'

defineProps<{
  mode?: 'horizontal' | 'vertical'
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
    :mode
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
ul[class*='-menu--vertical'] {
  &.my-menu {
    height: calc(100% - 60px);
    border-right-width: 0;
    padding: 0 15px;
    :deep(li[class*='-menu-item']) {
      line-height: 1;
      margin-bottom: 4px;
      border-radius: 7px;
      &:hover {
        color: var(--vs-color-primary);
      }
      &.is-active {
        color: #fff !important;
        background-color: var(--vs-color-primary) !important;
      }
    }
    :deep(div[class*='-sub-menu__title']) {
      line-height: 1;
      margin-bottom: 4px;
      border-radius: 7px;
      &:hover {
        color: var(--vs-color-primary);
      }
    }
  }
}
ul[class*='-menu--horizontal'] {
  &.my-menu {
    width: 100%;
    :deep(li[class*='-menu-item']) {
      border-bottom: 0 none;
    }
    & > :deep(li[class*='-sub-menu'] div[class*='-sub-menu__title']) {
      border-bottom: 0 none;
    }
  }
}
ul[class*='-menu--collapse'] {
  width: 100%;
}
</style>
