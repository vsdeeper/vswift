import { createRouter, createWebHistory, type RouteLocationRaw } from 'vue-router'
import NProgress from 'nprogress'
import { MainLayout } from '@/layout'
import HomeView from '../views/HomeView.vue'
import { generateRoutes, resolveQuery } from './util'
import { queryMenuData, queryUserInfo } from '@/api/global'
import { useMenuDataStore, useUserInfoStore } from '@/stores/global'

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
          path: '/home',
          name: 'Home',
          component: HomeView
        },
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
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

// 添加路由导航守卫
let isRefresh = true // 用户是否手动刷新
router.beforeEach(async (to, from, next) => {
  if (isRefresh) {
    NProgress.start()
    isRefresh = false
    const { setUserInfo } = useUserInfoStore()
    const userInfo = await queryUserInfo()
    setUserInfo(userInfo)
    const { setMenuData } = useMenuDataStore()
    const menuData = await queryMenuData()
    setMenuData(menuData)
    const routes = generateRoutes(router, menuData ?? [])

    // 处理手动刷新带参数的页面时参数丢失
    let pathname = location.pathname.replace(/\/$/, '')
    if (BASE_URL !== '/') pathname = '/' + pathname.split(BASE_URL)[1]
    let findToRoute: RouteLocationRaw | undefined
    if (pathname === '') {
      findToRoute = routes.find((e) => e.path === '/')
    } else {
      findToRoute = routes.find((e) => {
        let _path = e.path
        if (e.path.includes('/:')) _path = e.path.split('/:')[0]
        return pathname.startsWith(_path)
      })
    }
    NProgress.done()
    if (findToRoute) {
      next({
        ...findToRoute,
        query: resolveQuery(decodeURIComponent(location.href)),
        replace: true
      })
    } else next({ ...to, replace: true })
  } else {
    next()
  }
})

export default router
