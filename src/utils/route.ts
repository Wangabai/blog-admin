/*
 * @Author: 王鑫
 * @Description: 路由处理
 * @Date: 2022-03-28 17:03:15
 */
import path from 'path-browserify'
import { isNull } from './filters'
// 所有的子路由
const getChildrenRoutes = (routes: any[]) => {
  const result: any[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

// 处理脱离层级的路由
export const filterRoutes = (routes: any[]) => {
  // 所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter((route) => {
    // 根据 route 在 childrenRoutes 中进行查重，把所有重复路由表 剔除
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

// 根据routes数据，返回对应的menu规则数据
export const generateMenus = (routes: any[], basePath = '') => {
  const result: any[] = []
  // 不满足该条件 `meta && meta.title && meta.icon` 的数据不应该存在
  routes.forEach((item) => {
    // 不存在children && 不存在meta 直接return
    if (item.hidden) return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在children 不存在meta 迭代generateMenus
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在children，存在meta || 存在children && 存在meta
    const routePath = path.resolve(basePath, item.path) // basePath + item.path //path.resolve(basePath, item.path)
    // 路由分离之后，可能存在同名父路由的情况
    let route = result.find((item) => {
      item.path === routePath
    })
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.title) {
        result.push(route)
      }
    }

    // 存在children && 存在meta
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
