<script lang="ts" setup>
defineProps<{
  menuData?: VsMenuDataItem[]
}>()
</script>

<template>
  <template v-for="item in menuData" :key="item.menuId">
    <template v-if="item.visible === 1 && item.children?.length">
      <el-sub-menu :index="item.path!">
        <template #title>
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <span>{{ item.menuName }}</span>
        </template>
        <MenuItem :menu-data="item.children" />
      </el-sub-menu>
    </template>
    <template v-else-if="item.visible === 1">
      <el-menu-item :index="item.path">
        <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
        <span>{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </template>
</template>

<style lang="scss" scoped>
li[class*='-menu-item'] {
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
  margin-bottom: 4px;
  border-radius: 7px;
  &:hover {
    color: var(--vs-color-primary);
  }
}
</style>
