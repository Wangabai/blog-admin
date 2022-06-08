<!--
 * @Author: 王鑫
 * @Description: 创建博客
 * @Date: 2022-04-07 17:14:26
-->
<template>
  <div class="container">
    <page-title :currentTitle="currentTitle"> </page-title>
    <el-form ref="formRef" :model="formData" :rules="rules">
      <el-form-item label="封面">
        <UploadFile :files="formData.file" @upload-change="uploadChange"></UploadFile>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input
          class="title-input"
          placeholder="博客标题(最长20个字)"
          v-model="formData.title"
          maxlength="20"
          clearable
        >
        </el-input>
      </el-form-item>
      <div class="flex">
        <el-form-item label="分类" prop="category">
          <el-select v-model="formData.category" placeholder="请选择" filterable>
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="formData.tag" placeholder="请选择" filterable multiple collapse-tags>
            <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="简介">
        <el-input
          v-model="formData.intro"
          maxlength="100"
          show-word-limit
          :rows="3"
          type="textarea"
          placeholder="输入文章简介"
        />
      </el-form-item>
    </el-form>

    <div class="markdown-container">
      <!-- 渲染区 -->
      <div id="markdown-box"></div>
      <div class="bottom">
        <span style="float: left">markdown最大行数：900</span>
        <el-button type="primary" @click="onSubmitClick(formRef)">提交</el-button>
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
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'
import { selectTag, selectCategory } from '@/api/tag-category'
import UploadFile from '@/views/components/uploadFile.vue'

interface List {
  id: string
  name: string
}

// 获取分类/标签列表
const tagList = ref<List[]>()
const categoryList = ref<List[]>()
const getTagList = async () => {
  const { data } = await selectTag()
  const list = data
  tagList.value = list.map((tag: any) => {
    return {
      id: tag.id,
      name: tag.name
    }
  })
}

// 获取标签列表
const getCategoryList = async () => {
  const { data } = await selectCategory()
  const list = data
  categoryList.value = list.map((tag: any) => {
    return {
      id: tag.id,
      name: tag.name
    }
  })
}

onMounted(async () => {
  await getTagList()
  await getCategoryList()
  if (route.query.id) {
    currentTitle.value = '编辑博客'
    await getArticleDetail()
  }
})

// 上传图片
let imgFile = <any>null

const uploadChange = (fileList: any, file: any) => {
  formData.value.file = fileList
  imgFile = file
}

// 表单提交
const currentTitle = ref('新增博客')
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const rules = ref({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择', trigger: 'blur' }]
})
const formData = ref({
  title: '',
  tag: [],
  category: '',
  intro: '',
  file: <any>null
})

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

// 编辑获取文章详情
const route = useRoute()
const getArticleDetail = async () => {
  const { code, data } = await articleDetail({ id: route.query.id })
  if (code === 200) {
    console.log(formData.value)
    mkEditor.setMarkdown(data.content)
    formData.value.title = data.articleName
    formData.value.tag =
      data.tags.length > 0
        ? data.tags.map((item: any) => {
            return item.id
          })
        : []
    formData.value.category = data.category.id
    formData.value.intro = data.intro
    formData.value.file = [{ url: data.coverUrl }]
  }
}

// 处理提交
const router = useRouter()
const onSubmitClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 创建文章
      const data = new FormData()
      if (route.query.id) {
        const id: any = route.query.id
        data.append('id', id)
      }
      data.append('articleName', formData.value.title)
      data.append('content', mkEditor.getMarkdown())
      data.append('htmlContent', mkEditor.getHTML())
      data.append('tag', formData.value.tag.join(','))
      data.append('category', formData.value.category)
      data.append('intro', formData.value.intro)
      if (imgFile) data.append('file', imgFile)
      if (route.query.id) {
        const { code } = await articleEdit(data)
        if (code === 200) gotoList()
      } else {
        const { code } = await articleAdd(data)
        if (code === 200) gotoList()
      }
      mkEditor.reset()
    }
  })
}

// 回到列表
const gotoList = () => {
  router.push({ name: 'ArticleList' })
}
</script>
<style lang="scss" scoped>
.container::v-deep {
  .el-form-item {
    display: flex;
    align-items: center;
  }
}
.title-input {
  margin: 20px 0;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
