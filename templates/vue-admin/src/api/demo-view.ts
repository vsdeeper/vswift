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

export const tableAdd = async (data: Record<string, any>) => {
  try {
    await http({
      method: 'POST',
      url: '/v1/create',
      data,
    })
    return true
  } catch (error) {
    console.error('tableAdd ->', error)
  }
}

export const tableBatchDeletion = async (data: Record<string, any>) => {
  try {
    await http({
      method: 'POST',
      url: '/v1/delete',
      data,
    })
    return true
  } catch (error) {
    console.error('tableBatchDeletion ->', error)
  }
}

export const rowEdit = async (data: Record<string, any>) => {
  try {
    await http({
      method: 'POST',
      url: '/v1/update',
      data,
    })
    return true
  } catch (error) {
    console.error('rowEdit ->', error)
  }
}

export const rowDelete = async (data: Record<string, any>) => {
  try {
    await http({
      method: 'POST',
      url: '/v1/delete',
      data,
    })
    return true
  } catch (error) {
    console.error('rowDelete ->', error)
  }
}

export const queryDeptIdList = async () => {
  try {
    const { data: res } = await http({
      method: 'GET',
      url: '/v1/dept/list',
    })
    return res as Record<string, any>[]
  } catch (error) {
    console.error('queryDeptIdList ->', error)
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

export const querySelectdList = async () => {
  try {
    const { data: res } = await http({
      method: 'GET',
      url: '/v1/api/selectd',
    })
    return res as Record<string, any>[]
  } catch (error) {
    console.error('querySelectdList ->', error)
  }
}
