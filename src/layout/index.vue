<!--
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-03-25 16:39:29
-->
<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 -->
    <Sidebar class="sidebar-container"></Sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 -->
        <Navbar />
      </div>
      <!-- 内容 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'

import {} from 'vue'
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: relative;
  // top: 0;
  // right: 0;
  z-index: 9;
  padding-left: 1p;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}

// .app-main {
//   min-height: calc(100vh - 64px);
// }

// .fixed-header + .app-main {
//   padding-top: 84px;
// }
</style>
