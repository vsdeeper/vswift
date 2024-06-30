import { defineStore } from 'pinia'
import { queryUserInfo } from '@/api/global'

const useUserInfo = defineStore('global/user-info', () => {
  const userInfo = ref<Record<string, any>>()

  async function getUserInfo() {
    if (userInfo.value) return userInfo.value
    return await queryUserInfo()
  }

  function setUserInfo(data: Record<string, any>) {
    userInfo.value = data
  }

  return {
    getUserInfo,
    setUserInfo
  }
})

export { useUserInfo }
