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

export async function copyItem(id: number) {
  try {
    await http({
      method: 'post',
      url: '/mock/operate.json?t=' + +new Date(),
      data: { id }
    })
    await sleep(300)
    return true
  } catch (error) {
    console.error('copyItem ->', error)
  }
}

export async function deleteItems(ids: number[]) {
  try {
    await http({
      method: 'post',
      url: '/mock/operate.json?t=' + +new Date(),
      data: { ids }
    })
    await sleep(300)
    return true
  } catch (error) {
    console.error('deleteItems ->', error)
  }
}

export async function queryDepartmentData() {
  try {
    const { data } = await http({
      method: 'post',
      url: '/mock/department-data.json?t=' + +new Date()
    })
    await sleep(1000)
    return data as Record<string, any>[]
  } catch (error) {
    console.error('queryDepartmentData ->', error)
  }
}

export async function queryPositionList(depId: number) {
  try {
    const { data } = await http({
      method: 'post',
      url: '/mock/position-list.json?t=' + +new Date(),
      data: { depId }
    })
    await sleep(1000)
    return data as Record<string, any>[]
  } catch (error) {
    console.error('queryPositionList ->', error)
  }
}
