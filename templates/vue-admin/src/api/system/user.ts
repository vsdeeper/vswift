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
