/*
 * @Author: 王鑫
 * @Description: 权限控制
 * @Date: 2022-04-12 17:20:50
 */
import { RouteRecordRaw } from 'vue-router'
import router from './router'
import store from './store'
// import { setItem } from './utils/storage'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token ，进入主页
  // 快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { nickname } = await store.dispatch('user/getUserInfo')
        // setItem('nickname', nickname)
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next()
      }
      next()
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
