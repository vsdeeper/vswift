<script setup lang="ts">
import { Avatar, Bell, Expand, Fold } from '@element-plus/icons-vue'
import avatar from '@/assets/avatar.png'
import user1 from '@/assets/user-1.jpg'
import user2 from '@/assets/user-2.jpg'
import user3 from '@/assets/user-3.jpg'
import Cookies from 'js-cookie'

const collapse = defineModel<boolean>()
const router = useRouter()

function onCollapse() {
  collapse.value = !collapse.value
}

function onSignOut() {
  Cookies.remove('token')
  router.replace({
    path: '/login',
    replace: true
  })
}
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
          <el-button class="bell-button" :icon="Bell" size="large" text bg circle />
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
              <el-dropdown-item>
                <el-avatar
                  shape="square"
                  fit="contain"
                  src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2014C10.8133%2014%209.65328%2013.6481%208.66658%2012.9888C7.67989%2012.3295%206.91085%2011.3925%206.45673%2010.2961C6.0026%209.19975%205.88378%207.99335%206.11529%206.82946C6.3468%205.66558%206.91825%204.59648%207.75736%203.75736C8.59648%202.91825%209.66558%202.3468%2010.8295%202.11529C11.9933%201.88378%2013.1997%202.0026%2014.2961%202.45673C15.3925%202.91085%2016.3295%203.67989%2016.9888%204.66658C17.6481%205.65328%2018%206.81331%2018%208C17.9981%209.59073%2017.3654%2011.1158%2016.2406%2012.2406C15.1158%2013.3654%2013.5907%2013.9981%2012%2014Z'%20fill='%23B2B1FF'/%3e%3cpath%20d='M15.7%2012.7129C14.6455%2013.5455%2013.3411%2013.9983%2011.9975%2013.9983C10.6539%2013.9983%209.34955%2013.5455%208.29501%2012.7129C6.61287%2013.3837%205.14464%2014.499%204.04731%2015.9396C2.94998%2017.3802%202.26479%2019.092%202.06501%2020.8919C2.03641%2021.1555%202.11368%2021.4197%202.27983%2021.6263C2.44598%2021.833%202.6874%2021.9652%202.95101%2021.9939L20.94%2021.9999C21.0805%2022%2021.2195%2021.9705%2021.3478%2021.9133C21.4762%2021.8562%2021.591%2021.7726%2021.6849%2021.668C21.7788%2021.5635%2021.8496%2021.4404%2021.8927%2021.3066C21.9358%2021.1729%2021.9502%2021.0316%2021.935%2020.8919C21.7346%2019.0918%2021.0489%2017.3799%2019.951%2015.9393C18.8532%2014.4987%2017.3845%2013.3835%2015.702%2012.7129H15.7Z'%20fill='%235D87FF'/%3e%3c/svg%3e"
                ></el-avatar>
                <div class="info-box">
                  <div class="item">
                    <h4>资料</h4>
                    <div>账户设置</div>
                  </div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-avatar
                  shape="square"
                  fit="contain"
                  src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.10001%204H19.1C19.7%204%2020.1%204.4%2020.1%205V19C20.1%2019.6%2019.7%2020%2019.1%2020H5.10001C4.50001%2020%204.10001%2019.6%204.10001%2019V5C4.10001%204.4%204.50001%204%205.10001%204Z'%20fill='%23B2B1FF'/%3e%3cpath%20d='M22.1%2014V5C22.1%203.3%2020.8%202%2019.1%202H5.10001C3.40001%202%202.10001%203.3%202.10001%205V19C2.10001%2020.7%203.40001%2022%205.10001%2022H19.1C20.8%2022%2022.1%2020.7%2022.1%2019V14ZM5.10001%204H19.1C19.7%204%2020.1%204.4%2020.1%205V13H17.6C16.9%2013%2016.3%2013.3%2015.9%2013.9L14.5%2016H9.60001L8.20001%2013.9C7.80001%2013.3%207.20001%2013%206.50001%2013H4.10001V5C4.10001%204.4%204.50001%204%205.10001%204Z'%20fill='%235D87FF'/%3e%3c/svg%3e"
                ></el-avatar>
                <div class="info-box">
                  <div class="item">
                    <h4>收件箱</h4>
                    <div>消息和电子邮件</div>
                  </div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-avatar
                  shape="square"
                  fit="contain"
                  src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10%2014H3C2.86867%2014%202.73862%2013.9742%202.61728%2013.9239C2.49594%2013.8737%202.38568%2013.8%202.29282%2013.7072C2.19995%2013.6143%202.12629%2013.5041%202.07605%2013.3827C2.02581%2013.2614%201.99997%2013.1313%202%2013V3C1.99997%202.86867%202.02581%202.73862%202.07605%202.61728C2.12629%202.49594%202.19995%202.38568%202.29282%202.29282C2.38568%202.19995%202.49594%202.12629%202.61728%202.07605C2.73862%202.02581%202.86867%201.99997%203%202H10C10.1313%201.99997%2010.2614%202.02581%2010.3827%202.07605C10.5041%202.12629%2010.6143%202.19995%2010.7072%202.29282C10.8%202.38568%2010.8737%202.49594%2010.9239%202.61728C10.9742%202.73862%2011%202.86867%2011%203V13C11%2013.1313%2010.9742%2013.2614%2010.9239%2013.3827C10.8737%2013.5041%2010.8%2013.6143%2010.7072%2013.7072C10.6143%2013.8%2010.5041%2013.8737%2010.3827%2013.9239C10.2614%2013.9742%2010.1313%2014%2010%2014Z'%20fill='%23B2B1FF'/%3e%3cpath%20d='M10%2022H3C2.86867%2022%202.73862%2021.9742%202.61728%2021.9239C2.49594%2021.8737%202.38568%2021.8%202.29282%2021.7072C2.19995%2021.6143%202.12629%2021.5041%202.07605%2021.3827C2.02581%2021.2614%201.99997%2021.1313%202%2021V17C1.99997%2016.8687%202.02581%2016.7386%202.07605%2016.6173C2.12629%2016.4959%202.19995%2016.3857%202.29282%2016.2928C2.38568%2016.2%202.49594%2016.1263%202.61728%2016.0761C2.73862%2016.0258%202.86867%2016%203%2016H10C10.1313%2016%2010.2614%2016.0258%2010.3827%2016.0761C10.5041%2016.1263%2010.6143%2016.2%2010.7072%2016.2928C10.8%2016.3857%2010.8737%2016.4959%2010.9239%2016.6173C10.9742%2016.7386%2011%2016.8687%2011%2017V21C11%2021.1313%2010.9742%2021.2614%2010.9239%2021.3827C10.8737%2021.5041%2010.8%2021.6143%2010.7072%2021.7072C10.6143%2021.8%2010.5041%2021.8737%2010.3827%2021.9239C10.2614%2021.9742%2010.1313%2022%2010%2022Z'%20fill='%235D87FF'/%3e%3cpath%20d='M21%2022H14C13.8687%2022%2013.7386%2021.9742%2013.6173%2021.9239C13.4959%2021.8737%2013.3857%2021.8%2013.2928%2021.7072C13.2%2021.6143%2013.1263%2021.5041%2013.0761%2021.3827C13.0258%2021.2614%2013%2021.1313%2013%2021V13C13%2012.8687%2013.0258%2012.7386%2013.0761%2012.6173C13.1263%2012.4959%2013.2%2012.3857%2013.2928%2012.2928C13.3857%2012.2%2013.4959%2012.1263%2013.6173%2012.0761C13.7386%2012.0258%2013.8687%2012%2014%2012H21C21.1313%2012%2021.2614%2012.0258%2021.3827%2012.0761C21.5041%2012.1263%2021.6143%2012.2%2021.7072%2012.2928C21.8%2012.3857%2021.8737%2012.4959%2021.9239%2012.6173C21.9742%2012.7386%2022%2012.8687%2022%2013V21C22%2021.1313%2021.9742%2021.2614%2021.9239%2021.3827C21.8737%2021.5041%2021.8%2021.6143%2021.7072%2021.7072C21.6143%2021.8%2021.5041%2021.8737%2021.3827%2021.9239C21.2614%2021.9742%2021.1313%2022%2021%2022Z'%20fill='%23D8D8FF'/%3e%3cpath%20d='M21%2010H14C13.8687%2010%2013.7386%209.97419%2013.6173%209.92395C13.4959%209.87371%2013.3857%209.80005%2013.2928%209.70718C13.2%209.61432%2013.1263%209.50407%2013.0761%209.38272C13.0258%209.26138%2013%209.13133%2013%209V3C13%202.86867%2013.0258%202.73862%2013.0761%202.61728C13.1263%202.49594%2013.2%202.38568%2013.2928%202.29282C13.3857%202.19995%2013.4959%202.12629%2013.6173%202.07605C13.7386%202.02581%2013.8687%201.99997%2014%202H21C21.1313%201.99997%2021.2614%202.02581%2021.3827%202.07605C21.5041%202.12629%2021.6143%202.19995%2021.7072%202.29282C21.8%202.38568%2021.8737%202.49594%2021.9239%202.61728C21.9742%202.73862%2022%202.86867%2022%203V9C22%209.13133%2021.9742%209.26138%2021.9239%209.38272C21.8737%209.50407%2021.8%209.61432%2021.7072%209.70718C21.6143%209.80005%2021.5041%209.87371%2021.3827%209.92395C21.2614%209.97419%2021.1313%2010%2021%2010Z'%20fill='%238C8AFF'/%3e%3c/svg%3e"
                ></el-avatar>
                <div class="info-box">
                  <div class="item">
                    <h4>任务</h4>
                    <div>待办事项和日常任务</div>
                  </div>
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
      &:not(.is-disabled):focus {
        span[class*='-avatar'] {
          background-color: rgba($color: #fff, $alpha: 0.35);
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
