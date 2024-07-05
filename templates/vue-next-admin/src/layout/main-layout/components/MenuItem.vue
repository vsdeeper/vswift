<script lang="ts" setup>
import { IconTablerCircleDot } from '@/components/icons'

defineProps<{
  menuData?: VsMenuDataItem[]
}>()
</script>

<template>
  <template v-for="item in menuData" :key="item.menuId">
    <template v-if="item.visible === 1 && item.children?.length">
      <el-sub-menu :index="item.path!">
        <template #title>
          <el-icon v-if="item.icon" size="16px"><component :is="item.icon" /></el-icon>
          <span class="menu-name">{{ item.menuName }}</span>
        </template>
        <MenuItem :menu-data="item.children" />
      </el-sub-menu>
    </template>
    <template v-else-if="item.visible === 1">
      <el-menu-item :index="item.path">
        <el-icon size="16px"><component :is="item.icon ?? IconTablerCircleDot" /></el-icon>
        <span class="menu-name">{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<style lang="scss" scoped>
li[class*='-menu-item'] {
  line-height: 1;
  margin-bottom: 4px;
  border-radius: 7px;
  &:hover {
    color: var(--vs-color-primary);
  }
  &.is-active {
    color: #fff;
    background-color: var(--vs-color-primary);
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
</style>
