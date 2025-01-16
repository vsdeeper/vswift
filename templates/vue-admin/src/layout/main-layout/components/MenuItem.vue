<script lang="ts" setup>
import { IconTablerCircleDot } from '@/components/icons'

defineProps<{
  menuData?: VsMenuDataItem[]
}>()
</script>

<template>
  <template v-for="item in menuData" :key="item.menuId">
    <template v-if="item.visible === 1 && item.menuType === 1">
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
