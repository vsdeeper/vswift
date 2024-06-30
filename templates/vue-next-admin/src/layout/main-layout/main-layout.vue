<script setup lang="ts">
import { AsideMenu } from './components'
const collapse = ref<boolean>()
</script>

<template>
  <div class="main-layout">
    <el-container>
      <el-aside :collapse :width="collapse ? '68px' : '250px'">
        <!-- <VsLogo :name="state.name" :isCollapse="state.isCollapse" />
      <VsMenu
        :is-collapse="state.isCollapse"
        :items="menuItems"
        :router="true"
        :default-active="state.defaultActive"
      /> -->
        <AsideMenu />
      </el-aside>
      <el-container>
        <el-header>
          <!-- <VsTopBar v-model="state.isCollapse" :breadcrumb-items="state.breadcrumbItems" />
        <VsNavRecords v-model:active="state.defaultActive" v-model:items="navRecordsItems" /> -->
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  height: 100%;
}
</style>
