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
    sidebarOpened: (state: any) => state.app.sidebarOpened
  },

  mutations: {},

  actions: {},
  modules: {
    user,
    app
  }
})
