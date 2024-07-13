<script setup lang="ts">
import type { BreadcrumbDataItem } from '.'

const model = defineModel<BreadcrumbDataItem[]>({ default: () => [] })
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
  <div class="navigation-record-bar">
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
</template>

<style lang="scss" scoped>
.navigation-record-bar {
  span[class*='-tag'] {
    cursor: pointer;
    & + span[class*='-tag'] {
      margin-left: 5px;
    }
  }
}
</style>
