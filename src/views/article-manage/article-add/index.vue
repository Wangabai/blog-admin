<!--
 * @Author: 王鑫
 * @Description: 创建博客
 * @Date: 2022-04-07 17:14:26
-->
<template>
  <page-title :currentTitle="currentTitle"> </page-title>
  <div>
    <el-input
      class="title-input"
      placeholder="博客标题(最长20个字)"
      v-model="title"
      maxlength="20"
      clearable
    >
    </el-input>
    <div class="markdown-container">
      <!-- 渲染区 -->
      <div id="markdown-box"></div>
      <div class="bottom">
        <el-button type="primary" @click="onSubmitClick(ref)">提交</el-button>
        <el-button @click="gotoList()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted } from 'vue'
import { articleAdd, articleDetail, articleEdit } from '@/api/article'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const currentTitle = ref('新增博客')
const title = ref('')
// 初始化editor
// Editor实例
let mkEditor: MkEditor
// 处理离开页面切换语言导致 dom 无法被获取
let el: any
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: 'zh-CN'
  })

  mkEditor.getMarkdown()
}

const route = useRoute()
const getArticleDetail = () => {
  articleDetail({ id: route.query.id }).then((res) => {
    if (res.code === 200) {
      title.value = res.data.author
      mkEditor.setHTML(res.data.content)
    }
  })
}
if (route.query.id) {
  currentTitle.value = '编辑博客'
  getArticleDetail()
}

// 处理提交
const store = useStore()
const router = useRouter()
const onSubmitClick = async () => {
  if (title.value.length === 0) {
    ElMessage.error('请输入标题')
    return
  }
  // 创建文章

  if (route.query.id) {
    const params = {
      id: route.query.id,
      type: 1,
      author: store.getters.userInfo.nickname,
      articleName: title.value,
      content: mkEditor.getHTML()
    }
    const { code } = await articleEdit(params)
    if (code === 200) gotoList()
  } else {
    const params = {
      type: 1,
      author: store.getters.userInfo.nickname,
      articleName: title.value,
      content: mkEditor.getHTML()
    }
    const { code } = await articleAdd(params)
    if (code === 200) gotoList()
  }

  mkEditor.reset()
}

// 回到列表
const gotoList = () => {
  router.push({ name: 'ArticleList' })
}
</script>
<style lang="scss" scoped>
.title-input {
  margin: 20px 0;
}
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
