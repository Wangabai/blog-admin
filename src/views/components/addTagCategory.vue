<!--
 * @Author: 王鑫
 * @Description: 新增学生
 * @Date: 2022-04-19 15:31:13
-->
<template>
  <el-dialog title="新增标签/分类" :model-value="props.isShow" width="400px">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="60px">
      <el-form-item label="姓名">
        <el-radio-group v-model="formData.type">
          <el-radio label="tag">标签</el-radio>
          <el-radio label="category">分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="formData.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sure(formRef)">确 定</el-button>
      </span>
    </template></el-dialog
  >
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addTag, addCategory } from '@/api/tag-category'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const rules = ref({
  type: [{ required: true, message: '请选择添加类型', trigger: 'blur' }],
  name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
})
const formData = ref({
  type: '',
  name: ''
})
interface Props {
  isShow: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isShow: false
})

const emit = defineEmits(['close'])

// 取消 关闭弹窗
const close = (get: string | null) => {
  formData.value.name = ''
  formData.value.type = ''
  emit('close', get)
}

// 确认 新增编辑
const sure = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid: any, val: any) => {
    if (valid) {
      if (formData.value.type === 'tag') {
        const { code } = await addTag({ name: formData.value.name })
        if (code === 200) {
          ElMessage.success('新增成功')
          close('1')
        }
      } else if (formData.value.type === 'category') {
        const { code } = await addCategory({ name: formData.value.name })
        if (code === 200) {
          ElMessage.success('新增成功')
          close('2')
        }
      }
    }
  })
}
</script>
<style lang="scss" scoped></style>
