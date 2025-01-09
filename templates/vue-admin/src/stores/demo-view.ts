import { defineStore } from 'pinia'
import { queryDeptList, queryPersonList, queryCascaderIdList } from '@/api/demo-view'

export const useDemoViewStore = defineStore('/demo-view', () => {
  const deptListData = ref<Record<string, any>[]>()
  const personListData = ref<Record<string, any>[]>()
  const cascaderIdListData = ref<Record<string, any>[]>()

  async function getDeptListData() {
    if (deptListData.value?.length) return deptListData.value
    deptListData.value = await queryDeptList()
    return deptListData.value
  }

  function setDeptListData(data?: Record<string, any>[]) {
    deptListData.value = data
  }

  async function getPersonListData() {
    if (personListData.value?.length) return personListData.value
    personListData.value = await queryPersonList()
    return personListData.value
  }

  function setPersonListData(data?: Record<string, any>[]) {
    personListData.value = data
  }

  async function getCascaderIdListData() {
    if (cascaderIdListData.value?.length) return cascaderIdListData.value
    cascaderIdListData.value = await queryCascaderIdList()
    return cascaderIdListData.value
  }

  function setCascaderIdListData(data?: Record<string, any>[]) {
    cascaderIdListData.value = data
  }

  return {
    deptListData,
    getDeptListData,
    setDeptListData,
    personListData,
    getPersonListData,
    setPersonListData,
    cascaderIdListData,
    getCascaderIdListData,
    setCascaderIdListData,
  }
})
