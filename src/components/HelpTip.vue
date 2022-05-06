<!--
 * @Author: 王鑫
 * @Description: 帮助组件
 * @Date: 2022-04-08 15:38:07
-->
<template>
  <el-tooltip class="help-tip" :content="props.tip" placement="top" effect="dark">
    <i aria-hidden="true">?</i>
  </el-tooltip>
</template>

<script setup lang="ts">
const props = defineProps({
  tip: String
})
</script>

<style lang="scss" scoped>
.help-tip {
  display: inline-block;
  vertical-align: 0.15em;
  font-size: 0.7em;
  width: 1.5em;
  height: 1.5em;
  background-color: #8a8a8a;
  color: #fff;
  font-style: normal;
  border-radius: 50%;
  text-align: center;
  line-height: 1.5em;
  cursor: help;
  &:not(:first-child) {
    margin-left: 0.35em;
  }
  &:not(:last-child) {
    margin-right: 0.35em;
  }
}
</style>
