<script setup lang="ts">
import { Logo } from '@/components'
import { AsideMenu, TopBar, NavRecordBar, type NavRecordDataItem, AppSetting } from './components'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useMenuDataStore } from '@/stores/global'
import type { BreadcrumbDataItem } from '@/components'
import { Setting } from '@element-plus/icons-vue'

const collapse = ref(false)
const router = useRouter()
const activePath = ref<string>()
const breadcrumbData = ref<BreadcrumbDataItem[]>([])
const navigationRecordData = ref<NavRecordDataItem[]>([])
const AppSettingRef = ref<InstanceType<typeof AppSetting>>()

provide('breadcrumbData', breadcrumbData)

watch(
  () => router.currentRoute.value,
  (route) => {
    activePath.value = route.path
    handleBreadcrumb(route)
    handleNavRecord(route.path)
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

async function handleNavRecord(path: string) {
  if (navigationRecordData.value.some((v) => v.path === path)) {
    return
  }
  const menuData = await useMenuDataStore().getMenuData()
  const findMenuItem: VsMenuDataItem | undefined = findNodeObjectFromTreeData(
    path,
    menuData ?? [],
    { id: 'path' }
  )
  if (findMenuItem && findMenuItem.visible === 1) {
    navigationRecordData.value.push({
      path,
      name: findMenuItem.menuName
    })
  }
}

function findNodeObjectFromTreeData(
  target: string | number,
  treeData: Record<string, any>[],
  options?: { id?: string; children?: string }
) {
  try {
    const { id = 'id', children = 'children' } = options ?? {}
    let find: Record<string, any> | undefined
    const findHandler = (treeData: Record<string, any>[]) => {
      for (const node of treeData) {
        if (node[id] === target) {
          find = node
          break
        } else {
          if (node[children]?.length) {
            findHandler(node[children])
          }
        }
      }
      return find
    }
    return findHandler(treeData)
  } catch (error) {
    console.error('findNodeFromTreeData: ', error)
  }
}

function onSetting() {
  AppSettingRef.value?.open()
}
</script>

<template>
  <el-container class="main-layout">
    <el-aside class="my-aside" :class="{ collapse }" :width="collapse ? '68px' : '250px'">
      <Logo />
      <AsideMenu :collapse :default-active="activePath" />
    </el-aside>
    <el-container>
      <el-header class="my-header" :class="{ collapse }">
        <TopBar v-model="collapse" />
      </el-header>
      <el-main class="my-main" :class="{ collapse }">
        <el-container class="router-view-wrapper">
          <section class="router-view">
            <NavRecordBar v-model="navigationRecordData" v-model:active-path="activePath" />
            <router-view />
          </section>
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
  <el-button class="setting-button" type="primary" size="large" circle @click="onSetting">
    <el-icon class="is-loading">
      <Setting />
    </el-icon>
  </el-button>
  <AppSetting ref="AppSettingRef" />
</template>

<style lang="scss" scoped>
.main-layout {
  height: 100%;
  .my-aside {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    box-shadow: 1px 0 20px #00000014;
    transition-duration: 0.2s;
    background-color: var(--vs-bg-color-overlay);
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
    z-index: 1;
    width: calc(100% - 250px);
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: var(--vs-bg-color-page);
    &.collapse {
      width: calc(100% - 68px);
    }
  }
  .my-main {
    display: flex;
    flex-direction: column;
    padding-left: calc(250px + var(--vs-main-padding));
    padding-top: 60px;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: unset;
    &.collapse {
      padding-left: calc(68px + var(--vs-main-padding));
    }
    .router-view-wrapper {
      display: flex;
      justify-content: center;
      .router-view {
        flex: 1;
        max-width: 1200px;
        width: 100%;
      }
    }
  }
  .my-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 250px);
    margin-left: 250px;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: var(--vs-bg-color-page);
    font-size: 12px;
    color: var(--vs-text-color-secondary);
    &.collapse {
      width: calc(100% - 68px);
      margin-left: 68px;
    }
    a[class*='-link'] {
      font-size: inherit;
      margin-left: 5px;
    }
  }
}
.setting-button {
  position: fixed;
  right: 30px;
  bottom: 30px;
  font-size: 18px;
  pointer-events: all;
}
</style>
