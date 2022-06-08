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
  name: 'ArticleManage',
  meta: {
    title: '博客管理',
    icon: 'article'
  },
  children: [
    {
      path: '/article/list',
      name: 'ArticleList',
      component: () => import('@/views/article-manage/article-list/index.vue'),
      meta: {
        title: '博客列表'
      }
    },
    {
      path: '/article/:type',
      name: 'ArticleAdd',
      hidden: true,
      component: () => import('@/views/article-manage/article-add/index.vue'),
      meta: {
        title: '新增编辑博客'
      }
    },
    {
      path: '/article/detail',
      name: 'ArticleDetail',
      hidden: true,
      component: () => import('@/views/article-manage/article-detail/index.vue'),
      meta: {
        title: '博客详情'
      }
    },
    {
      path: '/article/tag-category/list',
      name: 'TagCategoryList',
      component: () => import('@/views/article-manage/article-tag-category/index.vue'),
      meta: {
        title: '分类/标签'
      }
    }
  ]
}
