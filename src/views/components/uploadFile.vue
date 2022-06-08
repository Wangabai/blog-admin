<!--
 * @Author: 王鑫
 * @Description: 
 * @Date: 2022-05-23 09:48:42
-->
<template>
  <!--上传-->
  <div class="flex">
    <div class="pic-wrap">
      <span @click="onSelectPic()">{{ fileList.length === 0 ? title : '点击更改' }}</span>
      <input ref="uploadInput" type="file" :accept="accept" name="icon" @change="picChange" />
    </div>
    <el-image
      v-if="fileList.length > 0"
      style="width: 100%; height: 200px"
      :src="fileList[0].url"
      @click="onSelectPic()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
interface files {
  url: string
  file: any
}
interface Props {
  title?: string
  accept?: string
  type?: string
  limit?: string | number
  files?: files[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '点击添加',
  accept: '.jpg,.png,.jpe',
  type: 'file',
  limit: 1
})

const uploadInput = ref<HTMLElement | null>(null)
const fileList = ref<files[]>([])

watch(
  () => props.files,
  (val) => {
    if (val) {
      fileList.value = val
    }
  },
  { immediate: true, deep: true }
)

const emit = defineEmits(['upload-change'])

/**
 * @description: 点击选择文件
 * @param {*} name
 * @return {*}
 */
const onSelectPic = () => {
  let onBtn = uploadInput.value as HTMLInputElement
  // if (fileList.value.length >= props.limit) {
  //   ElMessage.warning(`文件最多上传` + props.limit + `个`)
  //   return
  // }
  onBtn.click()
}

/**
 * @description: 文件改变
 * @param {*} name
 * @return {*}
 */
const picChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  let files = input.files
  if (files) {
    const file = files[0]
    if (file) {
      if (!isImg(file.name)) {
        ElMessage.warning(`文件格式有误`)
        return false
      }
      fileList.value.pop()
      const url = URL.createObjectURL(file)
      const obj = { url: url, file: file }
      fileList.value.push(obj)
      emit('upload-change', fileList.value, obj.file)
    }
  }
}

// 判断是否是图片
const isImg = (name: string) => {
  return /(.png|.jpg|.jpeg|.PNG|.JPG|.JPEG)$/.test(name)
}
// 判断是否是pdf
const isPdf = (name: string) => {
  return /(.pdf|.PDF)$/.test(name)
}
// 是否是压缩包
const isZip = (name: string) => {
  return /(.rar|.zip|.RAR|.ZIP)$/.test(name)
}
const isExcel = (name: string) => {
  return /(.xlsx|.xls|.XLSX|.XLS)$/.test(name)
}
// 附件判断
const filterFile = (name: string) => {
  return /(.png|.jpg|.jpeg.|.pdf|.rar|.zip|.PNG|.JPG|.JPEG.|.PDF|.RAR|.ZIP)$/.test(name)
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
.pic-wrap {
  position: relative;
  width: 150px;
  height: 32px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #667eff;
  margin-right: 12px;
  // margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  span {
    font-size: 14px;
    font-weight: 400;
    color: #667eff;
  }
  &:hover {
    border-color: #667eff;
  }
  input {
    display: none;
  }
}
</style>
