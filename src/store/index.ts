/*
 * @Author: 王鑫
 * @Description: VUEX入口
 * @Date: 2022-04-01 10:16:27
 */
import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'

export default createStore({
  state: {},
  getters: {
    token: (state: any) => state.user.token,
    userInfo: (state: any) => state.user.userInfo,
    /**
     * @returns true 表示已存在用户信息
     */
    hasUserInfo: (state: any) => {
      return JSON.stringify(state.user.userInfo) !== '{}'
    },
    sidebarOpened: (state: any) => state.app.sidebarOpened
  },

  mutations: {},

  actions: {},
  modules: {
    user,
    app
  }
})
