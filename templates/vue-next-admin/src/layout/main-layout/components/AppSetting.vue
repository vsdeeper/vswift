<script setup lang="ts">
import { APP_SETTING_STORAGE_KEY } from '@/utils/constants'
import { Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import localforage from 'localforage'

export interface AppSetting {
  theme: {
    color?: string
    mode?: 'light' | 'dark'
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
const appSettingConst: AppSetting = {
  theme: {
    color: '#1e4db7',
    mode: 'light'
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
}
const appSetting = ref<AppSetting>(JSON.parse(JSON.stringify(appSettingConst)))

function onToggleThemeColor(color: string) {
  if (appSetting.value.theme.color !== color) {
    appSetting.value.theme.color = color
  }
}

function onReset() {
  appSetting.value = JSON.parse(JSON.stringify(appSettingConst))
}

function onSave() {
  localforage.setItem(APP_SETTING_STORAGE_KEY, JSON.parse(JSON.stringify(appSetting.value)))
  ElMessage.success('保存设置成功')
  show.value = false
}

function open() {
  show.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="show"
    modal-class="app-setting-modal"
    title="应用设置"
    direction="rtl"
    size="320px"
  >
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
    <div class="flex-box">
      <span class="label">模式</span>
      <el-radio-group v-model="appSetting.theme.mode" size="small">
        <el-radio-button label="明亮" value="light" />
        <el-radio-button label="暗黑" value="dark" />
      </el-radio-group>
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
      <span class="label">
        宽度
        <el-tooltip effect="dark" content="盒子表示设置最大宽度" placement="top">
          <el-icon color="#ffae1f"><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-radio-group v-model="appSetting.main.width" size="small">
        <el-radio-button label="盒子" value="boxed" />
        <el-radio-button label="撑满" value="full" />
      </el-radio-group>
    </div>
    <div class="flex-box">
      <span class="label">导航记录</span>
      <el-switch
        v-model="appSetting.main.navRecord"
        :active-value="true"
        :inactive-value="false"
        active-text="显示"
        inactive-text="隐藏"
        inline-prompt
      />
    </div>
    <div class="flex-box">
      <span class="label">面包屑</span>
      <el-switch
        v-model="appSetting.main.breadcrumb"
        :active-value="true"
        :inactive-value="false"
        active-text="显示"
        inactive-text="隐藏"
        inline-prompt
      />
    </div>
    <template #footer>
      <el-button @click="onReset">重置设置</el-button>
      <el-button type="primary" @click="onSave">保存设置</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss">
.app-setting-modal {
  div[class*='-divider'] {
    margin: 30px 0;
  }
  div[class*='-drawer__body'] {
    div[class*='-divider']:first-child {
      margin-top: 0;
    }
  }
  div[class*='-drawer__footer'] {
    display: flex;
    button[class*='-button'] {
      flex: 1;
    }
  }
}
</style>
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
