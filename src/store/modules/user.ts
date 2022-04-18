/*
 * @Author: 王鑫
 * @Description: VUEX user
 * @Date: 2022-04-01 13:56:11
 */
import { login, getUserInfo } from '@/api/user'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export interface UserStateTypes {
  token: string
  userInfo: object
}

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state: UserStateTypes, token: string) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state: any, userInfo: any) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登陆请求
    login(context: any, userInfo: object) {
      return new Promise<void>((resolve, reject) => {
        login(userInfo)
          .then((data) => {
            context.commit('setToken', data.data.token)
            router.push('/')
            setTimeStamp()
            resolve()
          })
          .catch((err) => reject(err))
      })
    },
    // 获取用户信息
    async getUserInfo(context: any) {
      const { data } = await getUserInfo()
      context.commit('setUserInfo', data)
      return data
    },
    // 退出登陆
    logout(context: any) {
      // resetRouter()
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      removeAllItem()
      // TODO :清理掉权限相关配置
    }
  }
}
