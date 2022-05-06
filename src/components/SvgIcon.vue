<!--
 * @Author: 王鑫
 * @Description: svgIcon
 * @Date: 2022-04-06 15:45:58
-->
<template>
  <div v-if="external" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isExternal } from '@/utils/filters'

interface Props {
  iconClass: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {})

const external = computed(() => {
  return isExternal(props.iconClass)
})

const iconName = computed(() => {
  return `#icon-${props.iconClass}`
})

const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
})

const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.iconClass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
