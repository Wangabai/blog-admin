<!--
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-03-25 16:39:48
-->
<template>
  <div>
    <section class="app-main">
      <el-card>
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <!-- <keep-alive> -->
            <div :key="route.path">
              <component :is="Component"></component>
            </div>
            <!-- <component :is="Component" :key="route.path" /> -->
            <!-- </keep-alive> -->
          </transition>
        </router-view>
      </el-card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'

// 生成title
// const getTitle = (route: any) => {
//   let title = ''
//   if (!route.meta) {
//     const pathArr = route.path.split('/')
//     title = pathArr[pathArr.length - 1]
//   } else {
//     title = route.meta.title
//   }
//   return title
// }

const store = useStore()
const route = useRoute()
// watch(
//   route,
//   (to, from) => {
//     // 并不是所有的路由都需要保存的
//     if (!isTags(to.path)) return
//     const { fullPath, meta, name, params, path, query } = to
//     // store.commit('app/addTagsViewList', {
//     //   fullPath,
//     //   meta,
//     //   name,
//     //   params,
//     //   path,
//     //   query,
//     //   title: getTitle(to)
//     // })
//   },
//   {
//     immediate: true
//   }
// )
</script>
<style lang="scss" scoped>
.app-main {
  // 浏览器可是区域的高度
  // min-height: calc(100vh - 70px);
  position: relative;
  padding: 20px 20px 20px 20px;
  // overflow-x: hidden;
  background-color: #fff;
}
</style>
