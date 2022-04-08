/*
 * @Author: 王鑫
 * @Description:博客管理路由
 * @Date: 2022-04-07 17:17:16
 */
import layout from '@/layout/index.vue'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/list',
  name: 'articleManage',
  meta: {
    title: '博客管理',
    icon: 'el-icon-article'
  },
  children: [
    {
      path: '/list',
      name: 'articleList',
      component: () => import('@/views/article-manage/article-list/index.vue'),
      meta: {
        title: '博客列表'
      }
    },
    {
      path: '/add',
      name: 'articleAdd',
      component: () => import('@/views/article-manage/article-add/index.vue'),
      meta: {
        title: '新增博客'
      }
    },
    {
      path: '/detail',
      name: 'articleDetail',
      component: () => import('@/views/article-manage/article-detail/index.vue'),
      meta: {
        title: '博客详情'
      }
    }
  ]
}
