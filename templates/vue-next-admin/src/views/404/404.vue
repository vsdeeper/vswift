<script setup lang="ts">
import errorimg from '@/assets/errorimg.svg'

const router = useRouter()

function onGoto() {
  router.replace({
    path: '/'
  })
}
</script>

<template>
  <div class="not-found">
    <el-image
      :src="errorimg"
      fit="contain"
      :lazy="true"
      style="height: 500px; width: 500px"
    ></el-image>

    <h3>哎哟～</h3>
    <h4>找不到您要查找的页面。</h4>
    <el-button type="primary" size="large" @click="onGoto">回到首页</el-button>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  h3 {
    font-size: 2.25rem;
    margin: 0;
  }
  h4 {
    font-size: 1.25rem;
    letter-spacing: 1px;
  }
}
</style>
