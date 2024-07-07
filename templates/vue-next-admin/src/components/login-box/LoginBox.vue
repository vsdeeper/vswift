<script setup lang="ts">
import workWeixin from '@/assets/work-weixin.png'
import feishu from '@/assets/feishu.png'
import type { FormInstance } from 'element-plus'
import { aesCbcDecrypt, aseCbcEncrypt } from '@/utils/crypto-aes-cbc'
import Cookies from 'js-cookie'
import { sleep } from 'radash'
import type { LocationQueryValue } from 'vue-router'

const KEY = '45db1ce219c42d144f65efde30119ad2'
const form = ref<Record<string, any>>({})
const formRef = ref<FormInstance>()
const remeber = ref(false)
const loading = ref(false)
const errorMsg = ref<string>()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  if (username) {
    form.value.username = aesCbcDecrypt(username, KEY)
  }
  if (password) {
    form.value.password = aesCbcDecrypt(password, KEY)
  }
})

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

async function onLogin() {
  const valid = await formRef.value?.validate()
  if (!valid) return
  loading.value = true
  await sleep(1000)
  const enUsername = aseCbcEncrypt(form.value.username, KEY)
  if (enUsername !== '5a6b8c016af4085fac40cc65ccfc91dc') {
    errorMsg.value = '用户不存在'
    loading.value = false
    return
  }
  const enPassword = aseCbcEncrypt(form.value.password, KEY)
  if (enPassword !== '5a6b8c016af4085fac40cc65ccfc91dc') {
    errorMsg.value = '密码错误'
    loading.value = false
    return
  }
  if (errorMsg.value) {
    errorMsg.value = undefined
  }
  if (remeber.value /** 记住密码 */) {
    Cookies.set('username', enUsername, { expires: 30 })
    Cookies.set('password', enPassword, { expires: 30 })
  } else {
    Cookies.remove('username')
    Cookies.remove('password')
  }
  router.replace({
    path: (route.query.redirect_url as LocationQueryValue) ?? '/'
  })
  loading.value = false
}

function onCloseAlert() {
  errorMsg.value = undefined
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
    <el-form :model="form" ref="formRef" size="large" label-position="top" hide-required-asterisk>
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="remeber-box">
          <el-checkbox v-model="remeber" :indeterminate="false">记住密码</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" type="primary" :loading auto-insert-space @click="onLogin">
          登录
        </el-button>
      </el-form-item>
      <el-form-item v-if="errorMsg">
        <el-alert :title="errorMsg" type="error" effect="dark" @close="onCloseAlert" />
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
