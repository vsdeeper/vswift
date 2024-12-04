<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import localforage from 'localforage'
import { getColorPrefers } from '@/utils'
import { APP_SETTING_STORAGE_KEY } from './utils/constants'
import { useAppSettingStore, type AppSetting } from './stores/global'
import { storeToRefs } from 'pinia'

const { appSettingData } = storeToRefs(useAppSettingStore())

onMounted(async () => {
  // 获取本地存储应用设置
  const storeAppSetting: AppSetting | null = await localforage.getItem(APP_SETTING_STORAGE_KEY)
  const { setAppSettingData, appSettingConst } = useAppSettingStore()
  storeAppSetting ? setAppSettingData(storeAppSetting) : setAppSettingData(appSettingConst)
})

watch(
  () => appSettingData.value?.theme.mode,
  val => {
    // 主体外观设置
    const el = document.documentElement
    if (val === 'no-preference') {
      const prefers = getColorPrefers()
      prefers === 'dark' ? el.classList.add('dark') : el.classList.remove('dark')
    } else {
      val === 'dark' ? el.classList.add('dark') : el.classList.remove('dark')
    }
  },
  { immediate: true },
)
</script>

<template>
  <el-config-provider namespace="vs" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
