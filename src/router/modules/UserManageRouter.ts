/*
 * @Author: 王鑫
 * @Description: 用户路由
 * @Date: 2022-04-07 16:58:13
 */
import layout from '@/layout/index.vue'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/message',
  name: 'UserManage',
  children: [
    {
      path: '/user/message',
      name: 'UserMessage',
      component: () => import('@/views/user-message/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'el-icon-user'
      }
    }
  ]
}
