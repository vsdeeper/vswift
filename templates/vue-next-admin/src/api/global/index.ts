import { http } from '@/utils'

export async function queryUserInfo() {
  try {
    const { data } = await http({
      method: 'get',
      url: '/mock/user-info.json?t=' + +new Date()
    })
    return data as {
      userId?: number
      userName?: string
    }
  } catch (error) {
    console.error('queryUserInfo ->', error)
  }
}

export async function queryMenuData() {
  try {
    const { data } = await http({
      method: 'get',
      url: '/mock/menu-data.json?t=' + +new Date()
    })
    return data as VsMenuDataItem[]
  } catch (error) {
    console.error('queryMenuData ->', error)
  }
}
