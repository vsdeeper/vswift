<script setup lang="ts">
import { queryRepos } from '@/api/global'

const loading = ref(false)
const reposData = ref<Record<string, any>[]>([])

onMounted(async () => {
  loading.value = true
  const data = await queryRepos()
  reposData.value = data.sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
  loading.value = false
})
</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-card class="my-confession">
        <template #header> 作者自白书 </template>
        <ul>
          <li>
            🌱 我现在专注于前端可视化开发，主要包含
            <el-link type="primary" href="https://github.com/vsdeeper/vswift" target="_blank">
              vswift
            </el-link>
            ，
            <el-link
              type="primary"
              href="https://github.com/vsdeeper/vswift-components"
              target="_blank"
            >
              vswift-components
            </el-link>
            ，
            <el-link
              type="primary"
              href="https://github.com/vsdeeper/visual-development"
              target="_blank"
            >
              visual-development
            </el-link>
            三个原创 git
            项目，它源于自己的兴趣和想法，旨在提供脚手架、快捷组件及项目初始框架，通过可视化配置生成业务页面。
          </li>
          <li>
            🔭 访问
            <el-link type="primary" href="https://vsdeeper.github.io/" target="_blank">
              这里
            </el-link>
            了解我的可视化开发思想和实践。
          </li>
          <li>🤔 我最近有换工作计划，目标城市是深圳或者武汉，看好我联系我 😄</li>
          <li>📫 Email: vsdeeper@qq.com , WeChat: cscomo 💬</li>
        </ul>
        <el-divider direction="horizontal" content-position="left">技术栈</el-divider>
        <a href="https://skillicons.dev" rel="nofollow">
          <img
            src="https://camo.githubusercontent.com/d43d2f0f9c9d97da4a6df4efc8bfc1ffaa453819316f9ac27f16aba32fad61c9/68747470733a2f2f736b696c6c69636f6e732e6465762f69636f6e733f693d6a732c747970657363726970742c736373732c7675652c72656163742c616e67756c61722c6e6f64656a732c6e6573746a732c6d7973716c"
            alt="My Skills"
            data-canonical-src="https://skillicons.dev/icons?i=js,typescript,scss,vue,react,angular,nodejs,nestjs,mysql"
            style="max-width: 100%"
          />
        </a>
        <el-divider direction="horizontal" content-position="left">使用工具</el-divider>
        <a href="https://skillicons.dev" rel="nofollow">
          <img
            src="https://camo.githubusercontent.com/ee224976fd679f32a8eb4c01b85caf55de0f74dfd62f5bdc0c00b9a614350943/68747470733a2f2f736b696c6c69636f6e732e6465762f69636f6e733f693d7673636f64652c766974652c7765627061636b2c67756c702c6769742c6769746875622c766974657374"
            alt="My Skills"
            data-canonical-src="https://skillicons.dev/icons?i=vscode,vite,webpack,gulp,git,github,vitest"
            style="max-width: 100%"
          />
        </a>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card v-loading="loading" class="my-repositories">
        <template #header> 我的仓库 </template>
        <el-row :gutter="20">
          <el-col v-for="item in reposData" :key="item.id" :span="24" :md="12">
            <el-card shadow="never">
              <header>
                <el-icon><Notebook /></el-icon>
                <el-link type="primary" :href="item.html_url" target="_blank">
                  {{ item.name }}
                </el-link>
                <el-tag type="info" effect="plain" size="small" round>{{ item.visibility }}</el-tag>
              </header>
              <el-text class="desc">{{ item.description }}</el-text>
              <div v-if="item.language" class="language">
                <el-tag type="success" effect="dark" size="small" round>{{ item.language }}</el-tag>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
div[class*='-row'] {
  margin: 0 -10px;
}
div[class*='-col'] {
  padding: 10px;
}
.my-confession {
  ul {
    margin: 0;
    padding-left: 16px;
    li {
      line-height: 24px;
      a[class*='-link'] {
        vertical-align: baseline;
      }
      & + li {
        margin-top: 8px;
      }
    }
  }
}
.my-repositories {
  :deep(div[class*='-card']) {
    height: 100%;
  }
  :deep(div[class*='-card__body']) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    header {
      display: flex;
      align-items: center;
      & > i[class*='-icon'] {
        margin-right: 8px;
      }
      & > span[class*='-tag'] {
        margin-left: 8px;
      }
    }
    .desc {
      flex: 1;
      align-self: unset;
      margin: 10px 0;
    }
  }
}
</style>
