import router from '@/router'
import axios, { type AxiosInstance } from 'axios'
import { ElMessage, ElMessageBox, type Action } from 'element-plus'
import Cookies from 'js-cookie'
import { TOKEN_STORAGE_KEY } from './constants'

const MODE = import.meta.env.VITE_MODE
const BASE_URL = import.meta.env.BASE_URL

/** config在初始化项目时将被vswift修改 */
export const config: Record<string, any> = {
  http: {
    // 接口域名默认与页面域名一致，根据需要添加域名
    // baseURL 环境属性名称与 import.meta.env.MODE 一致
    baseURL: {
      dev: '/',
      test: '/',
      prod: '/'
    }
  }
  // 根据需要添加配置第三方接口...
}

// 默认 http 实例
const http: AxiosInstance = axios.create({
  baseURL: config.http.baseURL[MODE],
  // 请求超时设置，默认10秒
  timeout: 10000
})

// 根据需要创建第三方 http 实例...

// 添加 http 请求拦截器
http.interceptors.request.use(
  async function (config) {
    // 在发送请求之前做些什么
    const token: string | undefined = Cookies.get(TOKEN_STORAGE_KEY)
    if (token) {
      // Authorization 根据需要修改
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加 http 响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data } = response
    if (data.code === 0 /** 正常业务返回码 */) {
      return data
    } else {
      ElMessage.error(data.msg ?? '未知错误')
      return Promise.reject(data)
    }
  },
  function (error) {
    // 对响应错误做点什么
    if (error.message.includes('timeout')) {
      ElMessage.error('请求超时')
    } else if (error.message === 'Network Error') {
      ElMessage.error('网络错误')
    } else {
      if (error.response.status === 401) {
        ElMessageBox.alert('登录失效，请重新登录', '提示', {
          callback: (action: Action) => {
            if (action === 'confirm') {
              router.replace({
                path: '/login',
                query: {
                  redirect_url: getRedirectUrl(BASE_URL)
                }
              })
            }
          }
        })
      } else {
        ElMessage.error(error.message)
      }
    }
    return Promise.reject(error)
  }
)

function getRedirectUrl(separator: string) {
  try {
    const pathname = window.location.pathname
    const search = window.location.search
    if (separator === '/') return `${pathname}${search}`
    else return `/${pathname.split(separator)[1]}${search}`
  } catch (error) {
    console.error('getRedirectUrl ->', error)
  }
}

export { http }
