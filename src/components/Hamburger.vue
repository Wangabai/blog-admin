<!--
 * @Author: 王鑫
 * @Description: 汉堡按钮
 * @Date: 2022-04-06 14:34:37
-->
<template>
  <div class="hamburger-container" @click="toggleClick">
    <i class="hamburger" :class="icon"></i>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'el-icon-s-fold' : 'el-icon-s-unfold'
})

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
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
