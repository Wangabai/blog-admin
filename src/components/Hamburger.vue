<!--
 * @Author: 王鑫
 * @Description: 汉堡按钮
 * @Date: 2022-04-06 14:34:37
-->
<template>
  <div class="hamburger-container" @click="triggerSidebarOpened">
    <i class="hamburger" :class="icon"></i>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AppStore } from '@/store/modules/app'

const appStore = AppStore()
const icon = computed(() => {
  return appStore.sidebarOpened ? 'el-icon-s-fold' : 'el-icon-s-unfold'
})

const { triggerSidebarOpened } = appStore
</script>
<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
