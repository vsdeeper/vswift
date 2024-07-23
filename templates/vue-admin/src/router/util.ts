import type { LocationQueryRaw, RouteParamsRaw, RouteRecordNormalized, Router } from 'vue-router'
import { dash, pascal } from 'radash'

/**
 * 解析路由参数
 */
export function resolveParams(pathname: string, path?: string) {
  if (!path) return {}
  let params: RouteParamsRaw = {}
  try {
    if (path.includes('/:')) {
      const pathArr = path.split('/:')
      const _path = pathArr[0]
      const keys = pathArr.slice(1)
      const vals = pathname.split(`${_path}/`)[1].split('/')
      params = Object.fromEntries(keys.map((key, idx) => [key, vals[idx]]))
    }
  } catch (error) {
    console.error('resolveParams ->', params)
  }
  return params
}

/**
 * 解析路由查询参数
 */
export function resolveQuery(href: string) {
  const query: LocationQueryRaw = {}
  try {
    const hrefs = href.split('?')
    const searchs = hrefs.length > 1 && hrefs[1].split('&')
    searchs &&
      searchs.forEach((e) => {
        const _e = e.split('=')
        query[_e[0]] = _e[1]
      })
  } catch (error) {
    console.error('resolveQuery ->', error)
  }
  return query
}

export function generateRoutes(router: Router, menuData: VsMenuDataItem[]) {
  try {
    const matchViewPaths = import.meta.glob('../views/**/*.vue')
    menuData.forEach((item) => {
      if (item.children?.length) {
        addRoute(matchViewPaths, router, 'MainLayout', item, true)
        generateRoutes(router, item.children)
      } else {
        addRoute(matchViewPaths, router, 'MainLayout', item, false)
      }
    })
  } catch (error) {
    console.error('generateRoutes ->', error)
  }
  return router.getRoutes()
}

export function addRoute(
  matchViewPaths: Record<string, any>,
  router: Router,
  parentName: string,
  menuDataItem: VsMenuDataItem,
  hasChildren: boolean
) {
  try {
    if (hasChildren) {
      router.addRoute(parentName, {
        name: menuDataItem.permKey,
        path: menuDataItem.path!,
        meta: { title: menuDataItem.menuName },
        redirect: menuDataItem.children![0].path,
        children: []
      })
    } else {
      const viewPathArr = menuDataItem
        .path!.split('/')
        .map((e) => dash(e))
        .filter((e: string) => !!e && !e.startsWith(':'))
      const lastName = viewPathArr.pop()!
      const viewPath = viewPathArr.length ? viewPathArr.join('/') + '/' : ''
      router.addRoute(parentName, {
        name: menuDataItem.permKey,
        path: menuDataItem.path!,
        component: matchViewPaths[`../views/${viewPath}${dash(lastName)}/${pascal(lastName)}.vue`],
        meta: { title: menuDataItem.menuName }
      })
    }
  } catch (error) {
    console.error('addRoute ->', error)
  }
}

export function findRouteByLocationPath(pathname: string, routes: RouteRecordNormalized[]) {
  const BASE_URL = import.meta.env.BASE_URL
  let findToRoute: RouteRecordNormalized | undefined
  try {
    if (BASE_URL !== '/' /** 存在子目录，移除子目录路径 */) {
      pathname = '/' + pathname.split(BASE_URL)[1]
    }
    if (pathname === '' /** 根目录路径，重定向 */) {
      findToRoute = routes.find((e) => e.path === '/')
    } else {
      findToRoute = routes.find((e) => {
        if (e.path === '/' || e.path === '/:pathMatch(.*)*') return false
        if (e.path.includes('/:') /** path携带params参数，去除参数路径 */) {
          const pathFromRoute = e.path.split('/:')[0]
          const paramsLen = e.path.split('/:').slice(1).length
          const pathLenFromPathname = pathname.split('/').slice(1).length - paramsLen
          const pathFromPathname =
            '/' +
            pathname
              .split('/')
              .slice(1, pathLenFromPathname + 1)
              .join('/')
          return pathFromPathname === pathFromRoute
        } else {
          return pathname === e.path
        }
      })
    }
  } catch (error) {
    console.error('routeHasParamsOrQuery ->', error)
  }
  return findToRoute
}
