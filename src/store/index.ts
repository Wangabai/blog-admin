/*
 * @Author: 王鑫
 * @Description: VUEX入口
 * @Date: 2022-04-01 10:16:27
 */
import { defineStore } from "pinia";
import { UserState } from './interface';
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { login, getUserInfo } from '@/api/user'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export const UserStore = defineStore({
  id: 'UserState',
  state: (): UserState => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  getters: {},
  actions: {
    // 登陆请求
    login(userInfo: object) {
      return new Promise<void>((resolve, reject) => {
        login<{
          code: number
          data: {
            token: string
          }
          message: string
        }>(userInfo)
          .then((data) => {
            this.token = data.data.token
            setItem(TOKEN, data.data.token)
            router.push('/')
            setTimeStamp()
            resolve()
          })
          .catch((err) => reject(err))
      })
    },
    // 获取用户信息
    async getUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data
      return data
    },
    // 退出登陆
    logout() {
      // resetRouter()
      return new Promise<void>((resolve, reject) => {
        this.token = ''
        setItem(TOKEN, '')
        this.userInfo = {}
        removeAllItem()
        resolve()
      })
      // TODO :清理掉权限相关配置
    }
  }
})