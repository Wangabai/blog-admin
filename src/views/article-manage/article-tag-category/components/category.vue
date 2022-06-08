<!--
 * @Author: 王鑫
 * @Description: 分类分页列表
 * @Date: 2022-05-19 14:32:08
-->
<template>
  <table-comp
    :data="tableData"
    :col-configs="theadName"
    :isShowCheckBox="false"
    :total="total"
    :pageCount="pageCount"
    :currentPage="pageNum"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
  >
  </table-comp>
</template>

<script setup lang="ts">
import { listCategory } from '@/api/tag-category'
import dayjs from 'dayjs'
import { onBeforeMount, ref, watch } from 'vue'

interface Props {
  getList?: string | null
}
const props = withDefaults(defineProps<Props>(), {})

watch(
  () => props.getList,
  (val) => {
    if (val === '1') {
      getCategoryList()
    }
  }
)

const theadName = [
  { prop: 'name', label: '名称' },
  { prop: 'createTime', label: '创建时间' }
]
let tableData = ref([])
let total = ref(0)
let pageCount = ref(0)
let pageNum = ref(1)
let pageSize = ref(10)
const getCategoryList = async () => {
  const parmas = {
    page: pageNum.value,
    pageSize: pageSize.value
  }
  const { code, data } = await listCategory(parmas)
  if (code === 200) {
    const list = data.list
    list.forEach((item: any) => {
      item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:MM:ss')
    })
    tableData.value = list
    total.value = data.total
    pageCount.value = data.count
    pageNum.value = data.page
    pageSize.value = data.pageSize
  }
}
onBeforeMount(() => {
  getCategoryList()
})

const handleSizeChange = (val: number) => {
  pageSize.value = val
  getCategoryList()
}

const handleCurrentChange = (val: number) => {
  pageNum.value = val
  getCategoryList()
}
</script>
<style lang="scss" scoped></style>
