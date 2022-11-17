<!--
 * @Author: 王鑫
 * @Description: 登陆页
 * @Date: 2022-04-01 10:21:45
-->
<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFromRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">用户登陆</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container"
          ><span class="svg-container"> <i class="el-icon-user"></i> </span
        ></span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"
          ><span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
        ></el-input>
        <span class="show-pwd"
          ><span class="svg-container" @click="onChangePwdType">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon> </span
        ></span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handlerLogin(loginFromRef)"
        >登陆</el-button
      >
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserStore } from '@/store'

import type { ElForm } from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>

const userStore = UserStore()

const loginForm = ref({
  username: 'test',
  password: '123456'
})

const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: any, value: any, cb: any) => {
        if (value.length < 6) {
          cb(new Error('密码不能少于6位'))
        }
        cb()
      }
    }
  ]
})
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') passwordType.value = 'text'
  else passwordType.value = 'password'
}

const loading = ref(false)
const loginFromRef = ref<FormInstance>()
const router = useRouter()
const handlerLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: any, val: any) => {
    if (valid) {
      loading.value = true
      userStore
        .login(loginForm.value)
        .then(() => {
          const token = userStore.token
          // 登录后操作
          router.push('/')
        })
        .catch((err) => {})
      loading.value = false
    }
  })
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
