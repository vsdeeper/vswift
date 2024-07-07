<script setup lang="ts">
import loginBg from '@/assets/login-bg.svg'
import { LoginBox } from '@/components'
</script>

<template>
  <div class="login">
    <el-header class="my-header">
      <Logo />
    </el-header>
    <el-row>
      <el-col class="left-col hidden-md-and-down" :span="24" :lg="16">
        <Logo />
        <el-image class="login-bg" :src="loginBg" fit="contain"></el-image>
      </el-col>
      <el-col class="right-col" :span="24" :lg="8">
        <LoginBox />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100%;
  overflow: hidden;
  & > .my-header {
    display: none;
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0.3;
      left: 0;
      top: 0;
      bottom: 0;
      background: radial-gradient(#d2f1df, #d3d7fa, #bad8f4) 0% 0% / 400% 400%;
    }
    :deep(.logo) {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  & > div[class*='-row'] {
    height: inherit;
  }
  .login-bg {
    position: relative;
    width: 450px;
  }
  .left-col {
    position: relative;
    display: flex;
    justify-content: center;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0.3;
      left: 0;
      top: 0;
      bottom: 0;
      background: radial-gradient(#d2f1df, #d3d7fa, #bad8f4) 0% 0% / 400% 400%;
    }
    :deep(.logo) {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .right-col {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
@media only screen and (max-width: 1199px) {
  .login > .my-header {
    display: flex;
  }
}
</style>
