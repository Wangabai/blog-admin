<!--
 * @Author: 王鑫
 * @Description: 博客列表
 * @Date: 2022-04-07 17:14:58
-->
<template>
  <page-title>
    <template v-slot:right>
      <el-button type="primary" size="small" @click="add()">新增标签/分类</el-button>
    </template>
  </page-title>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="标签" name="first">
      <Tag :getList="getList" v-if="activeName === 'first'" />
    </el-tab-pane>
    <el-tab-pane label="分类" name="second">
      <Category :getList="getList" v-if="activeName === 'second'" />
    </el-tab-pane>
  </el-tabs>
  <Add :isShow="isShow" @close="close" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tag from './components/tag.vue'
import Category from './components/category.vue'
import Add from '@/views/components/addTagCategory.vue'

const activeName = ref('first')

const isShow = ref(false)
const getList = ref<string | null>()
const add = () => {
  isShow.value = true
}
const close = (value: string | null) => {
  getList.value = value
  isShow.value = false
}
</script>
<style lang="scss" scoped></style>
