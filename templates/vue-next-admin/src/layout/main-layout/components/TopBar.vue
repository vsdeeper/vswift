<script setup lang="ts">
import { Avatar, Bell, Expand, Fold, Search } from '@element-plus/icons-vue'
import avatar from '@/assets/avatar.png'
import userIcon1 from '@/assets/user-1.jpg'
import userIcon2 from '@/assets/user-2.jpg'
import userIcon3 from '@/assets/user-3.jpg'
import profileIcon from '@/assets/profile-icon.svg'
import inboxIcon from '@/assets/inbox-icon.svg'
import tasksIcon from '@/assets/tasks-icon.svg'
import Cookies from 'js-cookie'
import { useAppSettingDataStore, useMenuDataStore } from '@/stores/global'
import { throttle } from 'radash'
import type { InputInstance } from 'element-plus'
import { storeToRefs } from 'pinia'

export interface FastLinkDataItem {
  name?: string
  path?: string
}

const collapse = defineModel<boolean>()
const router = useRouter()
const searchRef = ref<InputInstance>()
const searchWord = ref<string>()
const fastLinkData = ref<FastLinkDataItem[]>(
  genFastLinkData(useMenuDataStore().menuData as VsMenuDataItem[])
)
const storeFastLinkData = ref<FastLinkDataItem[]>(JSON.parse(JSON.stringify(fastLinkData.value)))
const showLogo = ref(false)
const showTogglebutton = ref(true)
const { appSettingData } = storeToRefs(useAppSettingDataStore())
const messageData = ref<Record<string, any>[]>([
  { id: 1, title: '收到新消息', desc: '影子给你发了新消息', avatar: userIcon1, read: false },
  { id: 2, title: '收到新消息', desc: '影子完成了审批', avatar: userIcon2, read: false },
  { id: 3, title: '收到新消息', desc: '有个流程需要您审批', avatar: userIcon3, read: false },
  { id: 4, title: '收到新消息', desc: '有个流程需要您审批', read: true },
  { id: 5, title: '收到新消息', desc: '有个流程需要您审批', read: true },
  { id: 6, title: '收到新消息', desc: '有个流程需要您审批', read: true },
  { id: 7, title: '收到新消息', desc: '有个流程需要您审批', read: true }
])
const personalCenterData = ref<Record<string, any>[]>([
  { title: '资料', desc: '账户设置', icon: profileIcon },
  { title: '收件箱', desc: '消息和电子邮件', icon: inboxIcon },
  { title: '任务', desc: '待办事项和日常任务', icon: tasksIcon }
])

// watch(
//   () => appSettingData.value?.menu.layout,
//   (val) => {
//     if (val === 'horizontal') {
//       showLogo.value = true
//       showTogglebutton.value = false
//     } else {
//       showLogo.value = false
//       showTogglebutton.value = true
//     }
//   },
//   { immediate: true }
// )

function onCollapse() {
  collapse.value = !collapse.value
}

const onInputSearch = throttle({ interval: 500 }, (word: string) => {
  fastLinkData.value =
    storeFastLinkData.value.filter((e) => e.name?.includes(word) || e.path?.includes(word)) ?? []
})

function onSearchVisibleChange(visible: boolean) {
  if (visible) {
    searchRef.value?.focus()
  }
}

function onSignOut() {
  Cookies.remove('token')
  router.replace({
    path: '/login',
    replace: true
  })
}

function onGoto(path: string) {
  router.push({
    path
  })
}

function genFastLinkData(menuData: VsMenuDataItem[]): FastLinkDataItem[] {
  return menuData.reduce((prev: FastLinkDataItem[], cur) => {
    return [
      ...prev,
      ...(cur.children?.length
        ? [{ name: cur.menuName, path: cur.path }, ...genFastLinkData(cur.children)]
        : [{ name: cur.menuName, path: cur.path }])
    ]
  }, [])
}

// 以下 defineExpose
function setShowLogo(val: boolean) {
  showLogo.value = val
}

function setShowTogglebutton(val: boolean) {
  showTogglebutton.value = val
}

defineExpose({
  setShowLogo,
  setShowTogglebutton
})
</script>

<template>
  <div class="top-bar">
    <div class="left-side">
      <Logo v-if="showLogo" />
      <el-button
        v-if="showTogglebutton"
        class="left-side-button"
        :icon="collapse ? Expand : Fold"
        size="large"
        text
        bg
        circle
        @click="onCollapse"
      />
      <el-dropdown
        popper-class="top-bar-search-popper"
        trigger="click"
        placement="bottom-start"
        @visible-change="onSearchVisibleChange"
      >
        <el-button class="left-side-button" :icon="Search" size="large" text bg circle />
        <template #dropdown>
          <el-input
            ref="searchRef"
            v-model="searchWord"
            placeholder="请输入关键词"
            size="large"
            clearable
            @input="onInputSearch"
          />
          <el-divider direction="horizontal" />
          <el-tabs model-value="fast-link">
            <el-tab-pane label="快捷导航" name="fast-link">
              <el-scrollbar>
                <el-dropdown-menu v-if="fastLinkData.length">
                  <el-dropdown-item
                    v-for="item in fastLinkData"
                    :key="item.path"
                    @click="onGoto(item.path!)"
                  >
                    <h4>{{ item.name }}</h4>
                    <div>{{ item.path }}</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
                <el-text class="no-data" v-else>暂无数据</el-text>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-dropdown>
    </div>
    <div class="right-side">
      <el-dropdown popper-class="notification-dropdown-poper" trigger="click">
        <el-badge is-dot class="my-badge">
          <el-button class="bell-button" :icon="Bell" size="large" text bg circle />
        </el-badge>
        <template #dropdown>
          <header>
            <span class="title">通知</span>
            <el-tag type="danger" effect="dark" size="small" round> 5 </el-tag>
          </header>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in messageData" :key="item.id">
              <el-badge :is-dot="!item.read" :offset="[0, 10]">
                <el-avatar
                  :icon="Avatar"
                  shape="circle"
                  fit="contain"
                  :src="item.avatar"
                ></el-avatar>
                <div class="info-box">
                  <h4>{{ item.title }}</h4>
                  <div>{{ item.desc }}</div>
                </div>
              </el-badge>
            </el-dropdown-item>
          </el-dropdown-menu>
          <footer>
            <el-button class="footer-button" type="primary" plain>查看所有通知</el-button>
          </footer>
        </template>
      </el-dropdown>
      <el-dropdown popper-class="profile-dropdown-poper" trigger="click">
        <el-button class="avatar-button" size="large" text bg circle>
          <el-avatar :size="28" shape="circle" :src="avatar" />
        </el-button>
        <template #dropdown>
          <div class="profile-box">
            <header>
              <span class="title">个人中心</span>
            </header>
            <section class="user-box">
              <el-avatar
                :icon="Avatar"
                size="large"
                shape="circle"
                :src="avatar"
                fit="contain"
              ></el-avatar>
              <div class="info">
                <h3>Vsdeeper</h3>
                <div class="post">研发部 / 前端负责人</div>
                <div class="email">
                  <el-icon><Message /></el-icon>
                  <span>vsdeeper@qq.com</span>
                </div>
              </div>
            </section>
            <el-divider />
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in personalCenterData"
                :key="`personalcenter${index}`"
              >
                <el-avatar shape="square" fit="contain" :src="item.icon"></el-avatar>
                <div class="info-box">
                  <h4>{{ item.title }}</h4>
                  <div>{{ item.desc }}</div>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
            <footer>
              <el-button
                class="footer-button"
                type="danger"
                plain
                auto-insert-space
                @click="onSignOut"
              >
                登出
              </el-button>
            </footer>
          </div>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss">
.top-bar-search-popper {
  div[class*='-dropdown__list'] {
    min-width: 320px;
    & > div[class*='-input'] {
      padding: 16px;
    }
    & > div[class*='-divider'] {
      margin: 0;
    }
    li[class*='-dropdown-menu__item'] {
      flex-direction: column;
      h4 {
        width: 100%;
        margin: 0;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      div {
        width: 100%;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    div[class*='-tabs__header'] {
      padding: 0 16px;
    }
    div[class*='-tabs__content'] {
      div[class*='-scrollbar'] {
        max-height: 350px;
        max-width: 350px;
      }
    }
    .no-data {
      display: flex;
      padding: 16px;
    }
  }
}
.notification-dropdown-poper,
.profile-dropdown-poper {
  div[class*='-dropdown__list'] {
    width: 300px;
    overflow: hidden;
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      .title {
        font-size: 16px;
      }
    }
    footer {
      padding: 16px;
      .footer-button {
        width: 100%;
      }
    }
  }
  li[class*='-dropdown-menu__item'] {
    white-space: normal;
    i[class*='-icon'] {
      margin-right: 0;
    }
    & > div[class*='-badge'] {
      display: flex;
      flex: 1;
      align-items: center;
    }
  }
  ul[class*='-dropdown-menu'] {
    max-height: 310px;
    overflow: auto;
  }
  span[class*='-avatar'] {
    flex: 0 0 var(--vs-avatar-size);
  }
  .info-box {
    flex: 1;
    margin-left: 15px;
    padding: 5px 0;
    width: calc(100% - 100px);
    h4 {
      font-size: 14px;
      margin: 0 0 5px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    div {
      font-size: 12px;
      line-height: 18px;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.profile-dropdown-poper {
  .profile-box {
    .user-box {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 5px 16px;
      .info {
        padding: 5px 0;
        margin-left: 15px;
        h3 {
          font-size: 14px;
          margin: 0;
        }
        div {
          display: flex;
          align-items: center;
          font-size: 12px;
          &.email {
            letter-spacing: 1px;
            margin-top: 5px;
            i[class*='-icon'] {
              margin-right: 5px;
            }
          }
        }
      }
    }
    div[class*='-divider--horizontal'] {
      margin: 10px 0 0;
      border-color: var(--vs-border-color-lighter);
    }

    li[class*='-dropdown-menu__item'] {
      span[class*='-avatar'] {
        padding: 10px;
        background-color: var(--vs-color-primary-light-9);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.top-bar {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .left-side {
    display: inline-flex;
    align-items: center;
    flex-basis: min-content;
    .left-side-button {
      border: 0 none;
      font-size: 22px;
      &.is-text:not(.is-disabled).is-has-bg {
        background-color: var(--vs-bg-color-page);
        &:hover {
          background-color: var(--vs-fill-color-darker);
        }
      }
      & + .left-side-button {
        margin-left: 0;
      }
    }
    :deep(.logo) {
      padding: 0;
      min-width: 130px;
      & + button[class*='-button'] {
        margin-left: 12px;
      }
      & + div[class*='-dropdown'] {
        margin-left: 12px;
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
