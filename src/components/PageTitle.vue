<!--
 * @Author: 王鑫
 * @Description: 页面标签
 * @Date: 2022-04-11 10:12:23
-->
<template>
  <div class="title_content">
    <span>{{ currentTitle ? currentTitle : $route.meta.title }}</span>
    <div class="right_slot">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentTitle?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>
<style lang="scss" scoped>
.title_content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  color: #354268;
  span {
    color: #354268;
    font-size: 20px;
    font-weight: bold;
  }
  .right_slot {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
