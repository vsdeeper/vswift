import { defineStore } from 'pinia'
import { queryUserInfo } from '@/api/global'

const useUserInfoStore = defineStore('global/user-info', () => {
  const userInfo = ref<Record<string, any>>()

  async function getUserInfo() {
    if (userInfo.value) return userInfo.value
    return (userInfo.value = await queryUserInfo())
  }

  function setUserInfo(data?: Record<string, any>) {
    userInfo.value = data
  }

  return {
    userInfo,
    getUserInfo,
    setUserInfo,
  }
})

export { useUserInfoStore }
