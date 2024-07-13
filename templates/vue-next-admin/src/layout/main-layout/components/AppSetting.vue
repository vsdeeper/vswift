<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'

export interface AppSetting {
  sidebar: {
    layout?: 'vertical' | 'horizontal'
    collapse?: boolean
  }
}
const show = ref(false)
const activeThemeColor = ref('#1e4db7')
const themeColorData = ['#1e4db7', '#00cec3', '#1a9bfc', '#ff5c8e', '#7352ff']
const appSetting = ref<AppSetting>({
  sidebar: {
    layout: 'vertical',
    collapse: true
  }
})

function onToggleThemeColor(color: string) {
  if (activeThemeColor.value !== color) {
    activeThemeColor.value = color
  }
}

function open() {
  show.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="show" title="应用设置" direction="rtl" size="320px">
    <el-divider direction="horizontal" content-position="center">侧栏</el-divider>
    <div class="flex-box">
      <span class="label">布局</span>
      <el-radio-group v-model="appSetting.sidebar.layout">
        <el-radio-button label="垂直" value="vertical" />
        <el-radio-button label="水平" value="horizontal" />
      </el-radio-group>
    </div>
    <div class="flex-box">
      <span class="label">垂直风格</span>
      <el-radio-group v-model="appSetting.sidebar.collapse">
        <el-radio-button label="折叠" :value="true" />
        <el-radio-button label="展开" :value="false" />
      </el-radio-group>
    </div>
    <el-divider direction="horizontal" content-position="center">主题风格</el-divider>
    <div class="flex-box">
      <span class="label">颜色</span>
      <div class="cont">
        <el-button
          v-for="color in themeColorData"
          class="theme-button"
          :key="color"
          type="primary"
          circle
          size="small"
          :icon="activeThemeColor === color ? Check : undefined"
          :color
          @click="onToggleThemeColor(color)"
        />
      </div>
    </div>
    <el-divider direction="horizontal" content-position="center">容器选项</el-divider>
  </el-drawer>
</template>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .label {
    color: var(--vs-text-color-primary);
  }
  & + .flex-box {
    margin-top: 16px;
  }
  .theme-button {
    color: #fff;
    font-size: 14px;
  }
}
</style>
