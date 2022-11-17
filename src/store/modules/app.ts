/*
 * @Author: 王鑫
 * @Description: 菜单栏收缩判断
 * @Date: 2022-03-29 14:46:14
 */
import { defineStore } from "pinia";
import { AppState } from '../interface';

export const AppStore = defineStore({
  id: 'AppState',
  state: (): AppState => ({
    sidebarOpened: true
  }),
  getters: {},
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    }
  }
})