<script setup lang="ts">
import workWeixin from '@/assets/work-weixin.png'
import feishu from '@/assets/feishu.png'

const form = ref<Record<string, any>>({})

function onSigninwith(key: string) {
  switch (key) {
    case 'weixin': {
      console.log('企业微信授权登录')
      break
    }
    case 'feishu': {
      console.log('飞书授权登录')
      break
    }
  }
}
</script>

<template>
  <div class="login-box">
    <header>
      <h2>欢迎来到 Vsdeeper</h2>
      <p>您的管理平台</p>
    </header>
    <section class="sign-in-with">
      <div class="button-box">
        <el-button size="large" @click="onSigninwith('weixin')">
          <el-image :src="workWeixin" fit="contain"></el-image>
          企业微信登录
        </el-button>
        <el-button size="large" @click="onSigninwith('feishu')">
          <el-image :src="feishu" fit="contain"></el-image>
          飞书登录
        </el-button>
      </div>
      <el-divider direction="horizontal" content-position="center">或使用以下方式登录</el-divider>
    </section>
    <el-form :model="form" ref="formRef" size="large" label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" type="primary" auto-insert-space>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  flex: 1;
  padding: 40px;
  max-width: 400px;
  header {
    h2 {
      font-size: 20px;
      letter-spacing: 1px;
      margin: 0 0 5px 0;
    }
    p {
      letter-spacing: 2px;
      margin: 0 0 30px 0;
    }
  }
  .sign-in-with {
    margin-bottom: 35px;
    .button-box {
      display: flex;
      flex-direction: row;
      margin-bottom: 35px;
    }
    button[class*='-button'] {
      flex: 1;
      div[class*='-image'] {
        height: 16px;
        margin-right: 5px;
      }
    }
  }
  .login-button {
    flex: 1;
    font-size: 16px;
    font-weight: 500;
  }
  :deep(label[class*='-form-item__label']) {
    font-weight: 500;
  }
  :deep(div[class*='-divider__text']) {
    white-space: nowrap;
  }
}
</style>
