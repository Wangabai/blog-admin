<!--
 * @Author: 王鑫
 * @Description: 头部组件
 * @Date: 2022-03-25 16:39:22
-->
<template>
  <div class="navbar">
    <!-- 汉堡按钮 -->
    <Hamburger class="hamburger-container"></Hamburger>
    <div class="right-menu">
      <!-- <LangSelect class="right-menu-item hover-effect"></LangSelect> -->
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="bianji"></svg-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/"> <el-dropdown-item>主页</el-dropdown-item></router-link>
            <el-dropdown-item divided @click="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {} from 'vue'
const store = useStore()
const router = useRouter()
const logout = () => {
  store
    .dispatch('user/logout')
    .then(() => {
      ElMessage.success('退出成功')
    })
    .finally(() => {
      router.push('/login')
    })
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 64px;
    height: 100%;
    float: left;
    cursor: pointer;

    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-bg-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
