<!--
 * @Author: 王鑫
 * @Description: 单独菜单项
 * @Date: 2022-03-29 13:19:18
-->
<template>
  <span v-if="icon">
    <!-- element icon -->
    <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
    <!-- 非element icon -->
    <svg-icon v-else :icon-class="icon" style="margin-right: 10px" />
  </span>
  <span>{{ title }}</span>
</template>

<script setup lang="ts">
import {} from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String
  }
})
</script>
<style lang="scss" scoped></style>
