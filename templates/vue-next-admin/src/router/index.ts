import {
  createRouter,
  createWebHistory,
  type RouteLocationRaw,
  type RouteRecordNormalized
} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { MainLayout } from '@/layout'
import { generateRoutes, resolveParams, resolveQuery } from './util'
import { queryMenuData, queryUserInfo } from '@/api/global'
import { useMenuDataStore, useUserInfoStore } from '@/stores/global'

NProgress.configure({ showSpinner: true, minimum: 0.1 })

const BASE_URL = import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      redirect: '/home',
      component: MainLayout,
      children: [
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 添加路由导航守卫
let isRefresh = true // 用户是否手动刷新
router.beforeEach(async (to, from, next) => {
  if (isRefresh) {
    NProgress.start()
    isRefresh = false

    // 获取用户信息并存储
    const { setUserInfo } = useUserInfoStore()
    const userInfo = await queryUserInfo()
    setUserInfo(userInfo)
    // 获取菜单数据并存储
    const { setMenuData } = useMenuDataStore()
    const menuData = await queryMenuData()
    setMenuData(menuData)
    // 生产路由数据
    const routes = generateRoutes(router, menuData ?? [])
    console.log('routes ->', routes)

    const pathname = location.pathname.replace(/\/$/, '')
    const findRouteHasParamsOrQuery = routeHasParamsOrQuery(pathname, routes)
    if (findRouteHasParamsOrQuery) {
      next({
        ...findRouteHasParamsOrQuery,
        params: resolveParams(pathname, findRouteHasParamsOrQuery.path),
        query: resolveQuery(decodeURIComponent(location.href)),
        replace: true
      } as RouteLocationRaw)
    } else next({ ...to, replace: true })
  } else {
    next()
  }
})

router.afterEach((/**to, from*/) => {
  NProgress.done()
})

function routeHasParamsOrQuery(pathname: string, routes: RouteRecordNormalized[]) {
  // 处理手动刷新带参数的页面时参数丢失
  let findToRoute: RouteRecordNormalized | undefined
  if (BASE_URL !== '/') pathname = '/' + pathname.split(BASE_URL)[1]
  if (pathname === '') {
    findToRoute = routes.find((e) => e.path === '/')
  } else {
    findToRoute = routes.find((e) => {
      let _path = e.path
      if (e.path.includes('/:')) _path = e.path.split('/:')[0]
      return pathname.startsWith(_path)
    })
  }
  return findToRoute
}

export default router
