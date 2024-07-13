<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'

export interface AppSetting {
  theme: {
    color?: string
  }
  menu: {
    layout?: 'vertical' | 'horizontal'
    collapse?: boolean
    uniqueOpened?: boolean
  }
  main: {
    width?: 'boxed' | 'full'
    navRecord?: boolean
    breadcrumb?: boolean
  }
}
const show = ref(false)
const themeColorData = ['#1e4db7', '#00cec3', '#ff5c8e', '#7352ff']
const appSetting = ref<AppSetting>({
  theme: {
    color: '#1e4db7'
  },
  menu: {
    layout: 'vertical',
    collapse: true,
    uniqueOpened: true
  },
  main: {
    width: 'boxed',
    navRecord: true,
    breadcrumb: true
  }
})

function onToggleThemeColor(color: string) {
  if (appSetting.value.theme.color !== color) {
    appSetting.value.theme.color = color
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
    <el-divider direction="horizontal" content-position="center">主题</el-divider>
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
          :icon="appSetting.theme.color === color ? Check : undefined"
          :color
          @click="onToggleThemeColor(color)"
        />
      </div>
    </div>
    <el-divider direction="horizontal" content-position="center">菜单</el-divider>
    <div class="flex-box">
      <span class="label">布局</span>
      <el-radio-group v-model="appSetting.menu.layout" size="small">
        <el-radio-button label="垂直" value="vertical" />
        <el-radio-button label="水平" value="horizontal" />
      </el-radio-group>
    </div>
    <div class="flex-box">
      <span class="label">
        折叠
        <el-tooltip effect="dark" content="布局为垂直时生效" placement="top">
          <el-icon color="#ffae1f"><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-switch
        v-model="appSetting.menu.collapse"
        :active-value="true"
        :inactive-value="false"
        active-text="是"
        inactive-text="否"
        inline-prompt
      />
    </div>
    <div class="flex-box">
      <span class="label">
        子菜单唯一展开
        <el-tooltip effect="dark" content="只保持一个子菜单的展开" placement="top">
          <el-icon color="#ffae1f"><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-switch
        v-model="appSetting.menu.uniqueOpened"
        :active-value="true"
        :inactive-value="false"
        active-text="是"
        inactive-text="否"
        inline-prompt
      />
    </div>
    <el-divider direction="horizontal" content-position="center">主体</el-divider>
    <div class="flex-box">
      <span class="label">宽度</span>
      <el-radio-group v-model="appSetting.main.width" size="small">
        <el-radio-button label="盒子" value="boxed" />
        <el-radio-button label="撑满" value="full" />
      </el-radio-group>
    </div>
    <div class="flex-box">
      <span class="label">导航记录</span>
      <el-radio-group v-model="appSetting.main.navRecord" size="small">
        <el-radio-button label="显示" :value="true" />
        <el-radio-button label="隐藏" :value="false" />
      </el-radio-group>
    </div>
    <div class="flex-box">
      <span class="label">面包屑</span>
      <el-radio-group v-model="appSetting.main.breadcrumb" size="small">
        <el-radio-button label="显示" :value="true" />
        <el-radio-button label="隐藏" :value="false" />
      </el-radio-group>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .label {
    display: inline-flex;
    align-items: center;
    color: var(--vs-text-color-primary);
    & > i[class*='-icon'] {
      margin-left: 3px;
    }
  }
  & + .flex-box {
    margin-top: 16px;
  }
  :deep(div[class*='-switch']) {
    height: 16px;
  }
  .theme-button {
    color: #fff;
    font-size: 14px;
  }
}
</style>
