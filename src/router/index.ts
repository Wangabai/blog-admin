/*
 * @Author: 王鑫
 * @Description: 路由入口
 * @Date: 2022-04-01 10:15:16
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index.vue'
import UserManageRouter from './modules/UserManageRouter'
import ArticleManageRouter from './modules/ArticleManageRouter'
// import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManageRouter,
  ArticleManageRouter
]

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/data-overview',
    component: layout,
    children: [
      {
        path: '/data-overview',
        name: 'dataOverview',
        component: () => import('@/views/data-overview/index.vue'),
        meta: {
          title: '博客数据',
          icon: 'el-icon-s-data'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

/**
 * 初始化路由表
 */
// export function resetRouter () {
//   if (
//     store.getters.userInfo &&
//     store.getters.userInfo.permission &&
//     store.getters.userInfo.permission.menus
//   ) {
//     const menus = store.getters.userInfo.permission.menus
//     menus.forEach((menu) => {
//       router.removeRoute(menu)
//     })
//   }
// }

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
