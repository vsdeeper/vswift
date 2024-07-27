import { queryDepartmentData, queryPositionList } from '@/api/system/user'
import { defineStore } from 'pinia'

const useUserStore = defineStore('system/user', () => {
  const departmentData = ref<Record<string, any>[]>()
  const positionData = ref<Record<string, any>[]>()

  async function getdDepartmentData() {
    if (positionData.value?.length) return positionData.value
    return await queryDepartmentData()
  }

  async function getPositionData(depId: number) {
    if (positionData.value?.length) return positionData.value
    return await queryPositionList(depId)
  }

  return {
    departmentData,
    getdDepartmentData,
    positionData,
    getPositionData
  }
})

export { useUserStore }
