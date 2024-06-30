import { queryMenuData } from '@/api/global'
import { defineStore } from 'pinia'

const useMenuDataStore = defineStore('global/menu-data', () => {
  const menuData = ref<VsMenuDataItem[]>()

  async function getMenuData() {
    if (menuData.value) return menuData.value
    return await queryMenuData()
  }

  function setMenuData(data?: VsMenuDataItem[]) {
    menuData.value = data
  }

  return {
    menuData,
    getMenuData,
    setMenuData
  }
})

export { useMenuDataStore }
