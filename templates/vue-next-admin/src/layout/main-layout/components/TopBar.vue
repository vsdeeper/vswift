<script setup lang="ts">
import { Bell, Expand, Fold } from '@element-plus/icons-vue'
import avatar from '@/assets/avatar.png'

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
        text
        bg
        circle
        @click="onCollapse"
      />
    </div>
    <div class="right-side">
      <el-badge is-dot class="my-badge">
        <el-button class="bell-button" :icon="Bell" size="large" text bg circle @click="onBell" />
      </el-badge>
      <el-button class="avatar-button" size="large" text bg circle @click="onAvatar">
        <el-avatar :size="28" shape="circle" :src="avatar" />
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
      &.is-text:not(.is-disabled).is-has-bg {
        background-color: var(--vs-bg-color-page);
        &:hover {
          background-color: var(--vs-fill-color-darker);
        }
      }
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
      &.is-text:not(.is-disabled).is-has-bg {
        background-color: var(--vs-bg-color-page);
        &:hover {
          background-color: var(--vs-fill-color-darker);
        }
      }
    }
    .avatar-button {
      border: 0 none;
      margin-left: 10px;
      &.is-text:not(.is-disabled).is-has-bg {
        background-color: var(--vs-bg-color-page);
        &:hover {
          background-color: var(--vs-fill-color-darker);
        }
      }
    }
  }
}
</style>
