<script setup lang="ts">
import { Logo } from '@/components'
import { MenuBar, TopBar, NavRecordBar, type NavRecordDataItem, AppSetting } from './components'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useAppSettingStore, useMenuDataStore } from '@/stores/global'
import type { BreadcrumbDataItem } from '@/components'
import { storeToRefs } from 'pinia'
import { Setting } from '@element-plus/icons-vue'

const { appSettingData } = storeToRefs(useAppSettingStore())
const collapse = ref(false)
const showXsAside = ref(false)
const router = useRouter()
const activePath = ref<string>()
const breadcrumbData = ref<BreadcrumbDataItem[]>([])
const navRecordData = ref<NavRecordDataItem[]>([])
const AppSettingRef = ref<InstanceType<typeof AppSetting>>()
const TopBarRef = ref<InstanceType<typeof TopBar>>()
const myHeaderWidth = computed(() => {
  if (appSettingData.value?.menu.layout === 'vertical') {
    return !showXsAside.value
      ? collapse.value
        ? 'calc(100% - 68px)'
        : 'calc(100% - 250px)'
      : '100%'
  }
  return '100%'
})
const myMainPaddingLeft = computed(() => {
  if (appSettingData.value?.menu.layout === 'vertical') {
    return !showXsAside.value
      ? collapse.value
        ? 'calc(68px + var(--vs-main-padding))'
        : 'calc(250px + var(--vs-main-padding))'
      : 'var(--vs-main-padding)'
  }
  return 'var(--vs-main-padding)'
})
const myMainPaddingTop = computed(() => {
  if (appSettingData.value?.menu.layout === 'horizontal') {
    return ww.value > 768 ? undefined : '60px'
  }
  return '60px'
})
const myFooterMarginLeft = computed(() => {
  if (appSettingData.value?.menu.layout === 'vertical') {
    return !showXsAside.value ? (collapse.value ? '68px' : '250px') : 'unset'
  }
  return 'unset'
})
const menuBaseLevelPadding = computed(() => {
  if (appSettingData.value?.menu.layout === 'horizontal') {
    return ww.value > 768 ? '12px' : '7px'
  }
  return '7px'
})
const ww = ref(0)

provide('breadcrumbData', breadcrumbData)
provide(
  'appSettingMainWidth',
  computed(() => appSettingData.value.main.width),
)

watch(
  () => router.currentRoute.value,
  route => {
    if (ww.value <= 768 && !collapse.value) {
      collapse.value = true
    }
    activePath.value = route.path
    handleBreadcrumb(route)
    handleNavRecord(route.path)
  },
  { immediate: true },
)

watch(
  () => appSettingData.value?.menu.layout,
  val => {
    if (val === 'vertical') {
      TopBarRef.value?.setShowLogo(false)
      TopBarRef.value?.setShowTogglebutton(true)
    } else {
      TopBarRef.value?.setShowLogo(ww.value > 768)
      TopBarRef.value?.setShowTogglebutton(ww.value <= 768)
    }
  },
  { immediate: true },
)

watch(
  () => appSettingData.value.menu.collapse,
  val => {
    collapse.value = !!val
  },
)

onMounted(() => {
  handleWindowResize()
  window.addEventListener('resize', handleWindowResize)
})

function handleWindowResize() {
  const el = document.documentElement
  ww.value = el.clientWidth
  if (ww.value <= 768) {
    showXsAside.value = true
    collapse.value = true
    TopBarRef.value?.setShowLogo(false)
    TopBarRef.value?.setShowTogglebutton(true)
  } else {
    showXsAside.value = false
    collapse.value = false
    if (appSettingData.value?.menu.layout === 'vertical') {
      TopBarRef.value?.setShowLogo(false)
      TopBarRef.value?.setShowTogglebutton(true)
    } else {
      TopBarRef.value?.setShowLogo(true)
      TopBarRef.value?.setShowTogglebutton(false)
    }
  }
}

function handleBreadcrumb(route: RouteLocationNormalizedLoaded) {
  if (route.matched.length) {
    breadcrumbData.value.length = 0
    let base = ''
    const paths = route.path
      .split('/')
      .filter(e => !!e)
      .map(e => {
        return (base = `${base}/${e}`)
      })
    paths.forEach(path => {
      const routes = router.getRoutes()
      const find = routes.find(e => e.path === path)
      if (find) {
        breadcrumbData.value.push({
          path: find.path,
          name: find.meta.title as string,
        })
      }
    })
  }
}

async function handleNavRecord(path: string) {
  if (navRecordData.value.some(v => v.path === path)) {
    return
  }
  const menuData = await useMenuDataStore().getMenuData()
  const findMenuItem: VsMenuDataItem | undefined = findNodeObjectFromTreeData(
    path,
    menuData ?? [],
    { id: 'path' },
  )
  if (findMenuItem && findMenuItem.visible === 1) {
    navRecordData.value.push({
      path,
      name: findMenuItem.menuName,
    })
  }
}

function findNodeObjectFromTreeData(
  target: string | number,
  treeData: Record<string, any>[],
  options?: { id?: string; children?: string },
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
  <el-container
    class="main-layout"
    :style="{ '--vs-menu-base-level-padding': menuBaseLevelPadding }"
  >
    <el-drawer
      v-if="showXsAside"
      :model-value="!collapse"
      direction="ltr"
      size="250px"
      @close="collapse = true"
    >
      <el-aside class="my-aside" :class="{ collapse }" width="250px">
        <Logo />
        <MenuBar :collapse :default-active="activePath" />
      </el-aside>
    </el-drawer>
    <el-aside
      v-else-if="!showXsAside && appSettingData?.menu.layout === 'vertical'"
      class="my-aside"
      :class="{ collapse }"
      :width="collapse ? '68px' : '250px'"
    >
      <Logo />
      <MenuBar :collapse :default-active="activePath" />
    </el-aside>
    <el-container>
      <el-header
        class="my-header"
        :style="{
          '--my-header-width': myHeaderWidth,
        }"
      >
        <TopBar
          ref="TopBarRef"
          :class="[
            appSettingData?.main.width === 'boxed' && appSettingData.menu.layout === 'horizontal'
              ? 'boxed'
              : undefined,
          ]"
          v-model="collapse"
        />
      </el-header>
      <el-header
        v-if="appSettingData?.menu.layout === 'horizontal' && ww > 768"
        class="my-menu-bar"
      >
        <MenuBar
          :class="[
            appSettingData?.main.width === 'boxed' && appSettingData.menu.layout === 'horizontal'
              ? 'boxed'
              : undefined,
          ]"
          mode="horizontal"
          :default-active="activePath"
        />
      </el-header>
      <el-main
        class="my-main"
        :style="{
          '--my-main-padding-left': myMainPaddingLeft,
          '--my-main-padding-top': myMainPaddingTop,
        }"
      >
        <el-container class="router-view-wrapper">
          <section class="router-view" :class="[appSettingData?.main.width ?? 'boxed']">
            <NavRecordBar
              v-if="appSettingData?.main.navRecord ?? true"
              v-model="navRecordData"
              v-model:active-path="activePath"
            />
            <router-view v-slot="{ Component }">
              <transition name="slide-right" mode="out-in" appear>
                <component :is="Component" />
              </transition>
            </router-view>
          </section>
        </el-container>
        <el-footer
          class="my-footer"
          :style="{
            '--my-footer-margin-left': myFooterMarginLeft,
          }"
        >
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
      </el-main>
    </el-container>
  </el-container>
  <el-button class="setting-button" type="primary" size="large" circle @click="onSetting">
    <el-icon class="is-loading" size="16px">
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
    z-index: 4;
    height: 100%;
    overflow: hidden;
    box-shadow: var(--vs-box-shadow);
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
    display: flex;
    justify-content: center;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 3;
    width: var(--my-header-width);
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: var(--vs-bg-color-page);
  }
  .my-menu-bar {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    margin: 60px 0 10px;
    background-color: var(--vs-bg-color-overlay);
    ul[class*='-menu--horizontal'].my-menu {
      border-bottom: 0 none;
      &.boxed {
        max-width: 1200px;
      }
    }
  }
  .my-main {
    display: flex;
    flex-direction: column;
    padding-left: var(--my-main-padding-left);
    padding-top: var(--my-main-padding-top);
    padding-bottom: 0;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: unset;
    .router-view-wrapper {
      display: flex;
      justify-content: center;
      .router-view {
        flex: 1;
        width: 100%;
        overflow-x: hidden;
        &.boxed {
          max-width: 1200px;
        }
      }
    }
  }
  .my-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: var(--vs-bg-color-page);
    font-size: 12px;
    color: var(--vs-text-color-secondary);
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
  z-index: 2000;
}
.slide-right-enter-active {
  transition: all 0.3s ease-out 0.3s;
}

.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
