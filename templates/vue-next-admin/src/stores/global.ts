import { defineStore } from 'pinia'

const useGlobalStore = defineStore('global', () => {
  async function getUserInfo() {
    // await $http('get', '/admin/userinfo')
    return {}
  }

  async function getMenuData(): Promise<VsMenuDataItem[]> {
    // const res = await $http('get', '/mock/global/menuData?t=' + +new Date())
    // const d = res.data || []
    // menuItems.value = [...menuItems.value, ...d]
    // return menuItems.value
    return []
  }

  return {
    getUserInfo,
    getMenuData
  }
})

export { useGlobalStore }
