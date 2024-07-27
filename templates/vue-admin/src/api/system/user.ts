import { http } from '@/utils/http'
import { sleep } from 'radash'

export async function queryUserList(params: PagingParams) {
  try {
    const { data } = await http({
      method: 'get',
      url: '/mock/user-list.json?t=' + +new Date(),
      params
    })
    await sleep(1000)
    return data as Record<string, any>
  } catch (error) {
    console.error('queryUserList ->', error)
  }
}

export async function addItem(data: Record<string, any>) {
  try {
    await http({
      method: 'post',
      url: '/mock/operate.json?t=' + +new Date(),
      data
    })
    await sleep(1000)
    return true
  } catch (error) {
    console.error('addItem ->', error)
  }
}

export async function editItem(data: Record<string, any>) {
  try {
    await http({
      method: 'post',
      url: '/mock/operate.json?t=' + +new Date(),
      data
    })
    await sleep(1000)
    return true
  } catch (error) {
    console.error('editItem ->', error)
  }
}
