<script lang="ts" setup>
import { useAppSettingStore, useMenuDataStore } from '@/stores/global'
import MenuItem from './MenuItem.vue'
import { storeToRefs } from 'pinia'

const isDev = import.meta.env.DEV

defineProps<{
  mode?: 'horizontal' | 'vertical'
  collapse?: boolean
  defaultActive?: string
}>()

const { appSettingData } = storeToRefs(useAppSettingStore())
const menuData = computed(() => useMenuDataStore().menuData)
const uniqueOpened = computed(() => appSettingData.value?.menu.uniqueOpened)

function onVisualDevelopment() {
  window.open('https://vsdeeper.github.io/', '_blank')
}
</script>

<template>
  <div class="my-menu" :class="[{ 'is-dev': isDev }, mode]">
    <el-menu
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
    <el-button
      v-if="isDev"
      class="vd-btn"
      type="info"
      size="small"
      link
      @click="onVisualDevelopment"
    >
      可视化开发
      <el-icon><TopRight /></el-icon>
    </el-button>
  </div>
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
  position: relative;
  flex: 1;
  height: calc(100% - 60px);
  padding: 0 16px 16px;
  box-sizing: border-box;
  &.is-dev {
    padding-bottom: 50px;
    .vd-btn {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &.horizontal {
    height: unset;
    padding: 0;
    &.is-dev {
      padding: 0 105px 0 0;
      .vd-btn {
        position: absolute;
        right: 12px;
        left: unset;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  ul[class*='-menu--vertical'] {
    border-right-width: 0;
    height: 100%;
    overflow: auto;
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
  ul[class*='-menu--horizontal'] {
    width: 100%;
    border-bottom: 0 none;
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
