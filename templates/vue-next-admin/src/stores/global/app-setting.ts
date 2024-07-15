import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark' | 'no-preference'

export interface AppSetting {
  theme: {
    mode?: ThemeMode
  }
  menu: {
    layout?: 'vertical' | 'horizontal'
    collapse?: boolean
    uniqueOpened?: boolean
  }
  main: {
    width?: 'boxed' | 'full'
    navRecord?: boolean
    breadcrumb?: boolean
  }
}

const useAppSettingDataStore = defineStore('global/app-setting', () => {
  const appSettingData = ref<AppSetting>()

  function getAppSettingData() {
    return appSettingData.value
  }

  function setAppSettingData(data?: AppSetting) {
    appSettingData.value = data
  }

  return {
    appSettingData,
    getAppSettingData,
    setAppSettingData
  }
})

export { useAppSettingDataStore }
