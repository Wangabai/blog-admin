<!--
 * @Author: 王鑫
 * @Description: 封装输入框
 * @Date: 2022-04-11 10:32:00
-->
<template>
  <div class="input-comp search-item">
    <div v-if="props.title" class="input-comp-title search-item__title">{{ props.title }}</div>
    <el-input
      v-model.trim="inputValue"
      class="input-comp-input"
      :type="props.inputType"
      :min="props.min"
      :placeholder="props.placeholder"
      :prefix-icon="props.prefixIcon"
      :readonly="props.readonly"
      :suffix-icon="props.suffixIcon"
      :disabled="props.disabled"
      clearable
      :size="props.size"
      @blur="blur"
      @input="input"
      @keyup.enter.native="enter"
      @focus="focus"
      @clear="clear"
    >
      <template #prefix>
        <i
          v-if="props.isShowIcon"
          slot="prefix"
          class="el-icon-search el-input__icon"
          aria-hidden="true"
        ></i>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  // 输入框类型 text，textarea 和其他 原生 input 的 type 值
  inputType: {
    type: String,
    default: ''
  },
  // icon
  icon: {
    type: String,
    default: ''
  },
  // 占位文本
  placeholder: {
    type: String,
    default: '请输入关键字搜索'
  },
  // 输入框头部图标
  prefixIcon: {
    type: String,
    default: ''
  },
  // 输入框尾部图标
  suffixIcon: {
    type: String,
    default: ''
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  // 设置最小值
  min: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium'
  },
  hval: {
    type: String,
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  isShowIcon: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['blur', 'input', 'focus', 'clear', 'click', 'enter'])
const inputValue = ref('')

watch(
  () => props.hval,
  (val) => {
    inputValue.value = val
  },
  {
    immediate: true
  }
)

const blur = () => {
  emit('blur', inputValue.value)
}
const input = () => {
  emit('input', inputValue.value)
}
const focus = () => {
  emit('focus', inputValue.value)
}
const clear = () => {
  emit('clear', inputValue.value)
}
const click = () => {
  emit('click', inputValue.value)
}
const enter = () => {
  emit('enter', inputValue.value)
}
</script>

<style lang="scss" scoped>
.input-comp {
  &-input {
    width: 225px;
  }
}
</style>
