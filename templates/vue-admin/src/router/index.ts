import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { MainLayout } from '@/layout'
import { findRouteByLocationPath, generateRoutes, resolveParams, resolveQuery } from './util'
import { queryMenuData, queryUserInfo } from '@/api/global'
import { useMenuDataStore, useUserInfoStore } from '@/stores/global'

NProgress.configure({ showSpinner: true, minimum: 0.1 })

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(/** to, from, savedPosition */) {
    // 始终滚动到顶部
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      redirect: '/dashboard',
      component: MainLayout,
      children: []
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404/404.vue')
    }
  ]
})

// 添加路由导航守卫，解决用户手动刷新页面时路由params参数丢失
let isRefresh = true
router.beforeEach(async (to) => {
  if (isRefresh) {
    isRefresh = false

    NProgress.start()

    // 获取用户信息并存储
    const { setUserInfo } = useUserInfoStore()
    const userInfo = await queryUserInfo()
    setUserInfo(userInfo)

    // 获取菜单数据并存储
    const { setMenuData } = useMenuDataStore()
    const menuData = await queryMenuData()
    setMenuData(menuData)

    // 生成路由数据
    const routes = generateRoutes(router, menuData ?? [])
    console.log('routes ->', routes)

    const pathname = location.pathname.replace(/\/$/, '')
    const findToRoute = findRouteByLocationPath(pathname, routes)
    return findToRoute
      ? {
          ...findToRoute,
          params: resolveParams(pathname, findToRoute?.path),
          query: resolveQuery(decodeURIComponent(location.href)),
          replace: true
        }
      : to
  }
})

router.afterEach((/**to, from*/) => {
  NProgress.done()
})

export default router
