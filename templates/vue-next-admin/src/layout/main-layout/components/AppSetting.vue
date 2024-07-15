<script setup lang="ts">
import { useAppSettingDataStore, type AppSetting, type ThemeMode } from '@/stores/global'
import { getColorPrefers } from '@/utils'
import { APP_SETTING_STORAGE_KEY } from '@/utils/constants'
import { ElMessage } from 'element-plus'
import localforage from 'localforage'
import { storeToRefs } from 'pinia'

const show = ref(false)
const appSettingConst: AppSetting = {
  theme: {
    mode: 'no-preference'
  },
  menu: {
    layout: 'vertical',
    collapse: false,
    uniqueOpened: false
  },
  main: {
    width: 'boxed',
    navRecord: true,
    breadcrumb: true
  }
}
const appSetting = ref<AppSetting>({
  theme: {},
  menu: {},
  main: {}
})
const { getAppSettingData, setAppSettingData } = useAppSettingDataStore()

onMounted(async () => {
  if (getAppSettingData()) {
    appSetting.value = getAppSettingData()!
    const el = document.documentElement
    if (getThemeMode(appSetting.value.theme.mode) === 'dark') {
      el.classList.add('dark')
    } else {
      el.classList.remove('dark')
    }
  } else {
    appSetting.value = JSON.parse(JSON.stringify(appSettingConst))
  }
})

function onChange(key: string, val: any) {
  const { appSettingData } = storeToRefs(useAppSettingDataStore())
  switch (key) {
    case 'appSetting.theme.mode': {
      const el = document.documentElement
      if (getThemeMode(val) === 'dark') {
        el.classList.add('dark')
      } else {
        el.classList.remove('dark')
      }
      break
    }
    case 'appSetting.menu.collapse': {
      if (appSettingData.value) {
        appSetting.value.menu.collapse = val
      } else {
        setAppSettingData(JSON.parse(JSON.stringify(appSetting.value)))
      }
      break
    }
    case 'appSetting.menu.uniqueOpened': {
      if (appSettingData.value) {
        appSetting.value.menu.uniqueOpened = val
      } else {
        setAppSettingData(JSON.parse(JSON.stringify(appSetting.value)))
      }
      break
    }
    case 'appSetting.main.width': {
      if (appSettingData.value) {
        appSetting.value.main.width = val
      } else {
        setAppSettingData(JSON.parse(JSON.stringify(appSetting.value)))
      }
      break
    }
    case 'appSetting.main.navRecord': {
      if (appSettingData.value) {
        appSetting.value.main.navRecord = val
      } else {
        setAppSettingData(JSON.parse(JSON.stringify(appSetting.value)))
      }
      break
    }
    case 'appSetting.main.breadcrumb': {
      if (appSettingData.value) {
        appSetting.value.main.breadcrumb = val
      } else {
        setAppSettingData(JSON.parse(JSON.stringify(appSetting.value)))
      }
      break
    }
  }
}

function onReset() {
  appSetting.value = JSON.parse(JSON.stringify(appSettingConst))
}

function onSave() {
  const data = JSON.parse(JSON.stringify(appSetting.value))
  setAppSettingData(data)
  localforage.setItem(APP_SETTING_STORAGE_KEY, data)
  ElMessage.success('保存设置成功')
  show.value = false
}

function getThemeMode(mode?: ThemeMode) {
  if (mode === 'dark') {
    return 'dark'
  } else if (mode === 'light') {
    return 'light'
  } else {
    return getColorPrefers()
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
  <el-drawer
    v-model="show"
    modal-class="app-setting-modal"
    title="应用设置"
    direction="rtl"
    size="320px"
  >
    <el-divider direction="horizontal" content-position="center">主题</el-divider>
    <div class="flex-box">
      <span class="label">外观</span>
      <el-radio-group
        v-model="appSetting.theme.mode"
        @change="(val) => onChange('appSetting.theme.mode', val)"
      >
        <el-radio-button label="浅色" value="light" />
        <el-radio-button label="深色" value="dark" />
        <el-radio-button label="自动" value="no-preference" />
      </el-radio-group>
    </div>
    <el-divider direction="horizontal" content-position="center">菜单</el-divider>
    <div class="flex-box">
      <span class="label">布局</span>
      <el-radio-group v-model="appSetting.menu.layout">
        <el-radio-button label="垂直" value="vertical" />
        <el-radio-button label="水平" value="horizontal" />
      </el-radio-group>
    </div>
    <div class="flex-box">
      <span class="label">
        折叠
        <el-tooltip effect="dark" content="布局为垂直时菜单栏是否折叠" placement="top">
          <el-icon color="#ffae1f"><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-switch
        v-model="appSetting.menu.collapse"
        :active-value="true"
        :inactive-value="false"
        active-text="是"
        inactive-text="否"
        @change="(val) => onChange('appSetting.menu.collapse', val)"
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
        @change="(val) => onChange('appSetting.menu.uniqueOpened', val)"
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
      <el-radio-group
        v-model="appSetting.main.width"
        @change="(val) => onChange('appSetting.main.width', val)"
      >
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
        @change="(val) => onChange('appSetting.main.navRecord', val)"
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
        @change="(val) => onChange('appSetting.main.breadcrumb', val)"
      />
    </div>
    <template #footer>
      <el-button size="large" @click="onReset">重置设置</el-button>
      <el-button size="large" type="primary" @click="onSave">保存设置</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss">
.app-setting-modal {
  div[class*='-divider'] {
    margin: 40px 0;
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
    margin-top: 25px;
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
