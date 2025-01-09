import { http } from '@/utils/http'

export const queryTableList = async (params: Record<string, any>) => {
  try {
    const { data: res } = await http({
      method: 'GET',
      url: '/v1/getList',
      params,
    })
    return res as Record<string, any>
  } catch (error) {
    console.error('queryTableList ->', error)
  }
}

export const addItem = async (data: Record<string, any>) => {
  try {
    await http({
      method: 'POST',
      url: '/v1/create',
      data,
    })
    return true
  } catch (error) {
    console.error('addItem ->', error)
  }
}

export const deleteItems = async (data: Record<string, any>) => {
  try {
    await http({
      method: 'POST',
      url: '/v1/delete',
      data,
    })
    return true
  } catch (error) {
    console.error('deleteItems ->', error)
  }
}

export const editItem = async (data: Record<string, any>) => {
  try {
    await http({
      method: 'POST',
      url: '/v1/update',
      data,
    })
    return true
  } catch (error) {
    console.error('editItem ->', error)
  }
}

export const deleteItem = async (data: Record<string, any>) => {
  try {
    await http({
      method: 'POST',
      url: '/v1/delete',
      data,
    })
    return true
  } catch (error) {
    console.error('deleteItem ->', error)
  }
}

export const queryDeptList = async () => {
  try {
    const { data: res } = await http({
      method: 'GET',
      url: '/v1/dept/list',
    })
    return res as Record<string, any>[]
  } catch (error) {
    console.error('queryDeptList ->', error)
  }
}

export const queryPersonList = async () => {
  try {
    const { data: res } = await http({
      method: 'GET',
      url: '/v1/person/list',
    })
    return res as Record<string, any>[]
  } catch (error) {
    console.error('queryPersonList ->', error)
  }
}

export const queryCascaderIdList = async () => {
  try {
    const { data: res } = await http({
      method: 'GET',
      url: '/v1/cascader/list',
    })
    return res as Record<string, any>[]
  } catch (error) {
    console.error('queryCascaderIdList ->', error)
  }
}
