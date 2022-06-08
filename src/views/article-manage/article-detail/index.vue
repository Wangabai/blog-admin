<!--
 * @Author: 王鑫
 * @Description: 博客详情
 * @Date: 2022-04-07 17:16:42
-->
<template>
  <div class="article-detail-container">
    <h2 class="title">{{ detail.articleName }}</h2>
    <div class="header">
      <span class="time">创建时间：{{ detail.createTime }}</span>
      <span class="author">点赞：{{ detail.like }}</span>
      <span class="author">访问：{{ detail.access }}</span>
      <el-button type="text" class="edit" @click="onEditClick">编辑</el-button>
    </div>
    <!-- <div class="content" v-html="detail.content"></div> -->
    <Markdown :source="detail.content" />
  </div>
</template>

<script setup lang="ts">
import { articleDetail } from '@/api/article'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Markdown from 'vue3-markdown-it';

const route = useRoute()
const router = useRouter()
const getArticleDetail = () => {
  articleDetail({ id: route.query.id }).then((res) => {
    if (res.code === 200) {
      res.data.createTime = res.data.createTime.replace('T', ' ')
      res.data.createTime = res.data.createTime.replace('.000Z', ' ')
      res.data.updateTime = res.data.updateTime.replace('T', ' ')
      res.data.updateTime = res.data.updateTime.replace('.000Z', ' ')
      // res.data.content = JSON.parse(res.data.content)
      detail.value = res.data
    }
  })
}
getArticleDetail()

const detail = ref({
  id: '',
  articleName: '',
  author: '',
  createTime: '',
  content: '',
  like: '',
  access: ''
})

const onEditClick = () => {
  router.push({
    query: { id: route.query.id },
    name: 'ArticleAdd',
    params: { type: 'edit' }
  })
}
</script>
<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
