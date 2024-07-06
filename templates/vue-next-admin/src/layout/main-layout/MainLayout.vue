<script setup lang="ts">
import { Logo } from '@/components'
import { AsideMenu, TopBar } from './components'

const toggleCollapse = ref<boolean>()
const hoverCollapse = ref<boolean>()
const collapse = computed(() =>
  typeof hoverCollapse.value === 'undefined'
    ? toggleCollapse.value
    : toggleCollapse.value && hoverCollapse.value
)
const router = useRouter()
const defaultActive = ref<string>()

watch(
  () => router.currentRoute.value,
  (route) => {
    defaultActive.value = route.path
    // handleBreadcrumb(route)
    // handleNavRecord(route.path)
  },
  { immediate: true }
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
        <AsideMenu :default-active />
      </el-aside>
      <el-container>
        <el-header class="my-header" :class="{ collapse }">
          <TopBar v-model="toggleCollapse" />
        </el-header>
        <el-main class="my-main" :class="{ collapse }">
          <el-container>
            <router-view />
          </el-container>
        </el-main>
        <el-footer class="my-footer" :class="{ collapse }">
          Made by
          <el-link
            type="primary"
            :underline="false"
            href="https://github.com/vsdeeper"
            target="_blank"
          >
            Vsdeeper
          </el-link>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  height: 100%;
  .my-aside {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    height: 100%;
    box-shadow: 1px 0 20px #00000014;
    transition-duration: 0.2s;
    background-color: #fff;
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
      :deep(li[class*='-menu-item']),
      :deep(div[class*='-sub-menu__title']) {
        padding-left: var(--vs-menu-base-level-padding) !important;
      }
    }
  }
  .my-header {
    position: fixed;
    right: 0;
    top: 0;
    width: calc(100% - 250px);
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: var(--vs-bg-color-page);
    &.collapse {
      width: calc(100% - 68px);
    }
  }
  .my-main {
    padding-left: calc(250px + var(--vs-main-padding));
    padding-top: calc(60px + var(--vs-main-padding));
    padding-bottom: calc(60px + var(--vs-main-padding));
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    &.collapse {
      padding-left: calc(68px + var(--vs-main-padding));
    }
  }
  .my-footer {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 250px);
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: var(--vs-bg-color-page);
    font-size: 12px;
    color: var(--vs-text-color-secondary);
    &.collapse {
      width: calc(100% - 68px);
    }
    a[class*='-link'] {
      font-size: inherit;
      margin-left: 5px;
    }
  }
}
</style>
