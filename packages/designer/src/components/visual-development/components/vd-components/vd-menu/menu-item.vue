<script setup lang="ts">
defineProps<{
  data?: Record<string, any>[];
}>();
</script>

<template>
  <template v-for="item in data" :key="item.id">
    <el-sub-menu v-if="item.children?.length" :index="item.id">
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        {{ item.name }}
      </template>
      <menu-item :data="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.id">
      <el-icon v-if="item.icon">
        <component :is="item.icon" />
      </el-icon>
      <template #title>
        {{ item.name }}
      </template>
    </el-menu-item>
  </template>
</template>
