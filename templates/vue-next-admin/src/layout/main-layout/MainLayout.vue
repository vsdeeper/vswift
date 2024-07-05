<script setup lang="ts">
import { AsideMenu, Logo, TopBar } from './components'

const toggleCollapse = ref<boolean>()
const hoverCollapse = ref<boolean>()
const collapse = computed(() =>
  typeof hoverCollapse.value === 'undefined'
    ? toggleCollapse.value
    : toggleCollapse.value && hoverCollapse.value
)

function onMouseoverAside() {
  if (toggleCollapse.value) {
    hoverCollapse.value = false
  }
}

function onMouseoutAside() {
  if (toggleCollapse.value) {
    hoverCollapse.value = true
  }
}
</script>

<template>
  <div class="main-layout">
    <el-container>
      <el-aside
        class="my-aside"
        :class="{ collapse }"
        :collapse
        :width="collapse ? '68px' : '250px'"
        @mouseover="onMouseoverAside"
        @mouseout="onMouseoutAside"
      >
        <Logo />
        <AsideMenu />
      </el-aside>
      <el-container>
        <el-header>
          <TopBar v-model="toggleCollapse" />
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
    transition-duration: 0.2s;
    &.collapse {
      :deep(.logo .name) {
        display: none;
      }
      :deep(.menu-name) {
        display: none;
      }
      :deep(li[class*='-sub-menu'] i[class*='-sub-menu__icon-arrow']) {
        display: none;
      }
      :deep(li[class*='-menu-item']) {
        padding-left: var(--vs-menu-base-level-padding) !important;
      }
    }
  }
}
</style>
