/*
 * @Author: 王鑫
 * @Description: state接口
 * @Date: 2022-11-16 20:12:51
 */
export interface UserState {
  token: string
  userInfo: object
}

export interface AppState {
  sidebarOpened: boolean
}
