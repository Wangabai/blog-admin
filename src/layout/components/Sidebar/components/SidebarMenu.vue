<!--
 * @Author: 王鑫
 * @Description: 一级菜单组件
 * @Date: 2022-03-28 16:11:51
-->
<template>
  <el-menu
    :default-active="activeMenu"
    :uniqueOpened="true"
    background-color="#35435a"
    text-color="#bfcbd9"
    active-text-color="#fff"
    router
    :collapse="!appStore.sidebarOpened"
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item"></SidebarItem>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
import { AppStore } from '@/store/modules/app'

const appStore = AppStore()
// 默认激活
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})
</script>
<style lang="scss" scoped></style>
