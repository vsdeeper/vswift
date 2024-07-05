<script setup lang="ts">
import { Bell, Expand, Fold } from '@element-plus/icons-vue'

const collapse = defineModel<boolean>()

function onCollapse() {
  collapse.value = !collapse.value
}

function onBell() {}

function onAvatar() {}
</script>

<template>
  <div class="top-bar">
    <div class="left-side">
      <el-button
        class="collapse-button"
        :icon="collapse ? Expand : Fold"
        size="large"
        circle
        @click="onCollapse"
      />
    </div>
    <div class="right-side">
      <el-badge is-dot class="my-badge">
        <el-button class="bell-button" :icon="Bell" size="large" circle @click="onBell" />
      </el-badge>
      <el-button class="avatar-button" size="large" circle @click="onAvatar">
        <el-avatar
          :size="26"
          shape="circle"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .left-side {
    .collapse-button {
      border: 0 none;
      font-size: 22px;
    }
  }
  .right-side {
    .my-badge {
      :deep(sup[class*='-badge__content'][class*='is-fixed']) {
        top: 11px;
      }
      :deep(sup[class*='-badge__content'][class*='is-fixed'][class*='is-dot']) {
        right: 14px;
      }
    }
    .bell-button {
      border: 0 none;
      font-size: 22px;
    }
    .avatar-button {
      border: 0 none;
      margin-left: 10px;
    }
  }
}
</style>
