<!--
 * @Author: 王鑫
 * @Description: 博客列表
 * @Date: 2022-04-07 17:14:58
-->
<template>
  <page-title>
    <template v-slot:right>
      <el-button type="primary" size="small" @click="goto(1)">新增博客</el-button>
    </template>
  </page-title>
  <div class="search-box">
    <input-comp
      :isShowIcon="true"
      title="关键字"
      placeholder="搜索博客"
      :hval="keyword"
      @blur="keywordBlur"
      @enter="keywordBlur"
      @clear="clearKeyword"
    ></input-comp>
  </div>
  <table-comp
    :data="tableData"
    :col-configs="theadName"
    :isShowCheckBox="false"
    :total="total"
    :pageCount="pageCount"
    :currentPage="pageNum"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
    <template v-slot:opration>
      <el-table-column label="操作" fixed="right" width="160">
        <template v-slot="{ row }">
          <div class="opration_row">
            <span @click="goto(2, row.id)">详情</span>
            <span @click="goto(3, row.id)">编辑</span>
            <span @click="del(row.id)">删除</span>
          </div>
        </template>
      </el-table-column>
    </template>
  </table-comp>
</template>

<script setup lang="ts">
import { articleList, articleDel } from '@/api/article'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索框
const keyword = ref('')
const keywordBlur = (val: string) => {
  pageNum.value = 1
  keyword.value = val
  getArticleList()
}
const clearKeyword = () => {
  pageNum.value = 1
  keyword.value = ''
  getArticleList()
}

const theadName = [
  { prop: 'articleName', label: '博客标题' },
  { prop: 'intro', label: '博客简介' },
  { prop: 'like', label: '点赞量' },
  { prop: 'access', label: '访问量' },
  { prop: 'createTime', label: '创建时间'},
  { prop: 'updateTime', label: '修改时间'},
  { slot: 'opration' }
]
let tableData = ref([])
let total = ref(0)
let pageCount = ref(0)
let pageNum = ref(1)
let pageSize = ref(10)
const getArticleList = async () => {
  const parmas = {
    articleName: keyword.value,
    page: pageNum.value,
    pageSize: pageSize.value
  }
  const { code, data } = await articleList(parmas)
  if (code === 200) {
    tableData.value = data.list
    total.value = data.total
    pageCount.value = data.count
    pageNum.value = data.page
    pageSize.value = data.pageSize
  }
}
onBeforeMount(() => {
  getArticleList()
})

const handleSizeChange = (val: number) => {
  pageSize.value = val
  getArticleList()
}

const handleCurrentChange = (val: number) => {
  pageNum.value = val
  getArticleList()
}

// 新增博客
const router = useRouter()
const goto = (rType: number, val?: number) => {
  if (rType === 1) {
    router.push({
      name: 'ArticleAdd',
      params: { type: 'add' }
    })
  } else if (rType === 2) {
    router.push({
      query: { id: val },
      name: 'ArticleDetail'
    })
  } else if (rType === 3) {
    router.push({
      query: { id: val },
      name: 'ArticleAdd',
      params: { type: 'edit' }
    })
  }
}

// 删除
const del = (val: number) => {
  ElMessageBox.confirm('确认删除文章？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      articleDel({ id: val }).then((res) => {
        if (res.code === 200) {
          getArticleList()
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    })
    .catch(() => {})
}
</script>
<style lang="scss" scoped></style>
