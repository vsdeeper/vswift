<script setup lang="ts">
import type { NavigationRecordDataItem } from '.'

const model = defineModel<NavigationRecordDataItem[]>({ default: () => [] })
const activePath = defineModel<string>('activePath')
const router = useRouter()

function onClose(index: number) {
  model.value.splice(index, 1)
}

function onGoto(path: string) {
  router.push({
    path
  })
}
</script>

<template>
  <el-scrollbar class="navigation-record-bar">
    <div class="scrollbar-flex-content">
      <el-tag
        v-for="(item, index) in model"
        :key="item.path"
        :effect="activePath === item.path ? 'dark' : 'light'"
        closable
        @close="onClose(index)"
        @click="onGoto(item.path!)"
      >
        {{ item.name }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.navigation-record-bar {
  height: auto;
  padding: 8px 0;
  .scrollbar-flex-content {
    display: flex;
    span[class*='-tag'] {
      cursor: pointer;
      & + span[class*='-tag'] {
        margin-left: 5px;
      }
    }
  }
}
</style>
