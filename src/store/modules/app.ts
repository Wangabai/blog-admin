/*
 * @Author: 王鑫
 * @Description: 菜单栏收缩判断
 * @Date: 2022-03-29 14:46:14
 */
export interface appStateTypes {
  sidebarOpened: boolean
}

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true
  }),
  mutations: {
    triggerSidebarOpened(state: appStateTypes) {
      state.sidebarOpened = !state.sidebarOpened
    }
  },
  actions: {}
}
