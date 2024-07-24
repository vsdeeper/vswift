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
  dataTable: {
    pageSize?: number
  }
}

const useAppSettingDataStore = defineStore('global/app-setting', () => {
  const appSettingConst: AppSetting = {
    theme: {
      mode: 'no-preference'
    },
    menu: {
      layout: 'vertical',
      collapse: false,
      uniqueOpened: false
    },
    main: {
      width: 'full',
      navRecord: true,
      breadcrumb: true
    },
    dataTable: {
      pageSize: 10
    }
  }
  const appSettingData = ref<AppSetting>(JSON.parse(JSON.stringify(appSettingConst)))

  function getAppSettingData(): AppSetting {
    return JSON.parse(JSON.stringify(appSettingData.value))
  }

  function setAppSettingData(data: AppSetting) {
    appSettingData.value = JSON.parse(JSON.stringify(data))
  }

  function getPageSize() {
    return appSettingData.value.dataTable.pageSize
  }

  return {
    appSettingData,
    appSettingConst,
    getAppSettingData,
    setAppSettingData,
    getPageSize
  }
})

export { useAppSettingDataStore }
