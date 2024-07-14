import { defineStore } from 'pinia'

export interface AppSetting {
  theme: {
    mode?: 'light' | 'dark'
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
