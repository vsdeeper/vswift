<script setup lang="ts">
import { useAppSettingStore, type AppSetting } from '@/stores/global'
import { APP_SETTING_STORAGE_KEY } from '@/utils/constants'
import localforage from 'localforage'
import { storeToRefs } from 'pinia'

const show = ref(false)
const appSetting = ref<AppSetting>({
  theme: {},
  menu: {},
  main: {},
  dataTable: {}
})
const { appSettingData } = storeToRefs(useAppSettingStore())
const { getAppSettingData, appSettingConst, setAppSettingData } = useAppSettingStore()

onMounted(async () => {
  appSetting.value = getAppSettingData()
})

function onChange(key: string, val: any) {
  switch (key) {
    case 'appSetting.theme.mode': {
      appSettingData.value!.theme.mode = val
      break
    }
    case 'appSetting.menu.layout': {
      appSettingData.value!.menu.layout = val
      break
    }
    case 'appSetting.menu.collapse': {
      appSettingData.value!.menu.collapse = val
      break
    }
    case 'appSetting.menu.uniqueOpened': {
      appSettingData.value!.menu.uniqueOpened = val
      break
    }
    case 'appSetting.main.width': {
      appSettingData.value!.main.width = val
      break
    }
    case 'appSetting.main.navRecord': {
      appSettingData.value!.main.navRecord = val
      break
    }
    case 'appSetting.main.breadcrumb': {
      appSettingData.value!.main.breadcrumb = val
      break
    }
    case 'appSetting.dataTable.pageSize': {
      appSettingData.value!.dataTable.pageSize = val
      break
    }
  }
}

function onReset() {
  appSetting.value = JSON.parse(JSON.stringify(appSettingConst))
  setAppSettingData(appSettingConst)
}

function onSave() {
  setAppSettingData(appSetting.value)
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
      <el-radio-group
        v-model="appSetting.menu.layout"
        @change="(val) => onChange('appSetting.menu.layout', val)"
      >
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
    <el-divider direction="horizontal" content-position="center">数据表</el-divider>
    <div class="flex-box">
      <span class="label">
        每页显示条目个数
        <el-tooltip effect="dark" content="保存设置刷新页面后生效" placement="top">
          <el-icon color="#ffae1f"><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
      <el-select
        v-model="appSetting.dataTable.pageSize"
        style="width: 120px"
        @change="(val) => onChange('appSetting.dataTable.pageSize', val)"
      >
        <el-option label="10条/页" :value="10" />
        <el-option label="20条/页" :value="20" />
        <el-option label="30条/页" :value="30" />
      </el-select>
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
    margin-top: 20px;
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
