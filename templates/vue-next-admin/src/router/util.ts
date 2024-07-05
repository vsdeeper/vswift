import type { LocationQueryRaw, RouteParamsRaw, Router } from 'vue-router'
import { dash, last, pascal } from 'radash'

/**
 * 解析路由参数
 */
export function resolveParams(pathname: string, path: string) {
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
    menuData.forEach((item) => {
      if (item.children?.length) {
        addRoute(router, 'MainLayout', item, true)
        generateRoutes(router, item.children)
      } else {
        addRoute(router, 'MainLayout', item, false)
      }
    })
  } catch (error) {
    console.error('generateRoutes ->', error)
  }
  return router.getRoutes()
}

export function addRoute(
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
      const viewComponents = import.meta.glob('../views/**/*.vue')
      const viewPathArr = menuDataItem
        .path!.split('/')
        .map((e) => dash(e))
        .filter((e: string) => !!e && !e.startsWith(':'))
      const lastName = pascal(viewPathArr.pop()!)
      const viewPath = viewPathArr.length ? viewPathArr.join('/') : dash(lastName)
      router.addRoute(parentName, {
        name: menuDataItem.permKey,
        path: menuDataItem.path!,
        component: viewComponents[`../views/${viewPath}/${lastName}.vue`],
        meta: { title: menuDataItem.menuName }
      })
    }
  } catch (error) {
    console.error('addRoute ->', error)
  }
}
