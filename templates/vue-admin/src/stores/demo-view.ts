import { defineStore } from 'pinia'
import {
  queryDeptIdList,
  queryPersonList,
  queryCascaderIdList,
  querySelectdList,
} from '@/api/demo-view'

export const useDemoViewStore = defineStore('/demo-view', () => {
  const deptIdListData = ref<Record<string, any>[]>()
  const personListData = ref<Record<string, any>[]>()
  const cascaderIdListData = ref<Record<string, any>[]>()
  const selectdListData = ref<Record<string, any>[]>()

  async function getDeptIdListData() {
    if (deptIdListData.value?.length) return deptIdListData.value
    deptIdListData.value = await queryDeptIdList()
    return deptIdListData.value
  }

  function setDeptIdListData(data?: Record<string, any>[]) {
    deptIdListData.value = data
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

  async function getSelectdListData() {
    if (selectdListData.value?.length) return selectdListData.value
    selectdListData.value = await querySelectdList()
    return selectdListData.value
  }

  function setSelectdListData(data?: Record<string, any>[]) {
    selectdListData.value = data
  }

  return {
    deptIdListData,
    getDeptIdListData,
    setDeptIdListData,
    personListData,
    getPersonListData,
    setPersonListData,
    cascaderIdListData,
    getCascaderIdListData,
    setCascaderIdListData,
    selectdListData,
    getSelectdListData,
    setSelectdListData,
  }
})
