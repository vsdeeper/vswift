<script setup lang="ts">
import { AsideMenu, Logo, TopBar } from './components'
const collapse = ref<boolean>()
</script>

<template>
  <div class="main-layout">
    <el-container>
      <el-aside class="my-aside" :collapse :width="collapse ? '68px' : '250px'">
        <Logo />
        <AsideMenu />
      </el-aside>
      <el-container>
        <el-header>
          <!-- <VsTopBar v-model="state.isCollapse" :breadcrumb-items="state.breadcrumbItems" />
        <VsNavRecords v-model:active="state.defaultActive" v-model:items="navRecordsItems" /> -->
          <TopBar v-model="collapse" />
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
  .my-aside {
    box-shadow: 1px 0 20px #00000014;
  }
}
</style>
