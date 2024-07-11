<script setup lang="ts">
import { Logo } from '@/components'
import { AsideMenu, TopBar, BreadcrumbBar } from './components'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const collapse = ref(false)
const router = useRouter()
const defaultActive = ref<string>()
const breadcrumbData = ref<Record<string, any>[]>([])

watch(
  () => router.currentRoute.value,
  (route) => {
    defaultActive.value = route.path
    handleBreadcrumb(route)
    // handleNavRecord(route.path)
  },
  { immediate: true }
)

function handleBreadcrumb(route: RouteLocationNormalizedLoaded) {
  if (route.matched.length) {
    breadcrumbData.value.length = 0
    let base = ''
    const paths = route.path
      .split('/')
      .filter((e) => !!e)
      .map((e) => {
        return (base = `${base}/${e}`)
      })
    paths.forEach((path) => {
      const routes = router.getRoutes()
      const find = routes.find((e) => e.path === path)
      if (find) {
        breadcrumbData.value.push({
          path: find.path,
          name: find.meta.title as string
        })
      }
    })
  }
}
</script>

<template>
  <div class="main-layout">
    <el-container>
      <el-aside class="my-aside" :class="{ collapse }" :width="collapse ? '68px' : '250px'">
        <Logo />
        <AsideMenu :collapse :default-active />
      </el-aside>
      <el-container>
        <el-header class="my-header" :class="{ collapse }">
          <TopBar v-model="collapse" />
        </el-header>
        <el-main class="my-main" :class="{ collapse }">
          <el-container class="main-container">
            <BreadcrumbBar :breadcrumb-data />
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
    display: flex;
    justify-content: center;
    padding-left: calc(250px + var(--vs-main-padding));
    padding-top: 60px;
    padding-bottom: 60px;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    &.collapse {
      padding-left: calc(68px + var(--vs-main-padding));
    }
    .main-container {
      max-width: 1200px;
      flex-direction: column;
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
