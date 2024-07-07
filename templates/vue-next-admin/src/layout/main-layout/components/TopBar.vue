<script setup lang="ts">
import { Avatar, Bell, Expand, Fold } from '@element-plus/icons-vue'
import avatar from '@/assets/avatar.png'
import user1 from '@/assets/user-1.jpg'
import user2 from '@/assets/user-2.jpg'
import user3 from '@/assets/user-3.jpg'

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
      <el-dropdown popper-class="notification-dropdown-poper" trigger="click">
        <el-badge is-dot class="my-badge">
          <el-button class="bell-button" :icon="Bell" size="large" text bg circle @click="onBell" />
        </el-badge>
        <template #dropdown>
          <header>
            <span class="title">通知</span>
            <el-tag type="danger" effect="dark" size="small" round> 5 </el-tag>
          </header>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-badge is-dot :offset="[0, 10]">
                <el-avatar :icon="Avatar" shape="circle" fit="contain" :src="user1"></el-avatar>
                <div class="info-box">
                  <div class="item">
                    <h4>收到新消息</h4>
                    <div>影子给你发了新消息</div>
                  </div>
                </div>
              </el-badge>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-badge is-dot :offset="[0, 10]">
                <el-avatar :icon="Avatar" shape="circle" fit="contain" :src="user2"></el-avatar>
                <div class="info-box">
                  <div class="item">
                    <h4>收到新消息</h4>
                    <div>影子完成了审批</div>
                  </div>
                </div>
              </el-badge>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-badge is-dot :offset="[0, 10]">
                <el-avatar :icon="Avatar" shape="circle" fit="contain" :src="user3"></el-avatar>
                <div class="info-box">
                  <div class="item">
                    <h4>收到新消息</h4>
                    <div>有个流程需要您审批</div>
                  </div>
                </div>
              </el-badge>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-avatar :icon="Avatar" shape="circle" fit="contain"></el-avatar>
              <div class="info-box">
                <div class="item">
                  <h4>收到新消息</h4>
                  <div>有个流程需要您审批</div>
                </div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-avatar :icon="Avatar" shape="circle" fit="contain"></el-avatar>
              <div class="info-box">
                <div class="item">
                  <h4>收到新消息</h4>
                  <div>有个流程需要您审批</div>
                </div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-avatar :icon="Avatar" shape="circle" fit="contain"></el-avatar>
              <div class="info-box">
                <div class="item">
                  <h4>收到新消息</h4>
                  <div>有个流程需要您审批</div>
                </div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-avatar :icon="Avatar" shape="circle" fit="contain"></el-avatar>
              <div class="info-box">
                <div class="item">
                  <h4>收到新消息</h4>
                  <div>有个流程需要您审批</div>
                </div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-avatar :icon="Avatar" shape="circle" fit="contain"></el-avatar>
              <div class="info-box">
                <div class="item">
                  <h4>收到新消息</h4>
                  <div>有个流程需要您审批</div>
                </div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
          <footer>
            <el-button class="notifications" type="primary" plain>查看所有通知</el-button>
          </footer>
        </template>
      </el-dropdown>

      <el-dropdown popper-class="profile-dropdown-poper" trigger="click">
        <el-button class="avatar-button" size="large" text bg circle @click="onAvatar">
          <el-avatar :size="28" shape="circle" :src="avatar" />
        </el-button>
        <template #dropdown>
          <header>
            <span class="title">个人资料</span>
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
              <div class="post">研发部 / 前端开发</div>
              <div class="email">
                <el-icon><Message /></el-icon>
                <span>vsdeeper@qq.com</span>
              </div>
            </div>
          </section>
          <footer>
            <el-button class="logout" type="danger" plain auto-insert-space> 登出 </el-button>
          </footer>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss">
.notification-dropdown-poper {
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
      .notifications {
        width: 100%;
      }
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
    margin-left: 10px;
    padding: 5px 0;
    h4 {
      font-size: 14px;
      line-height: 20px;
      margin: 0 0 5px 0;
    }
    div {
      font-size: 12px;
      line-height: 18px;
      margin: 0;
    }
  }
}
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
      .logout {
        width: 100%;
      }
    }
  }
  .user-box {
    display: flex;
    align-items: center;
    padding: 5px 16px;
    .info {
      padding: 5px 0;
      margin-left: 10px;
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
          margin-top: 3px;
          i[class*='-icon'] {
            margin-right: 5px;
          }
        }
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
