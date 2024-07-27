<script setup lang="ts">
import type { VsSearchOptions } from '.'
import { SComponent, type SComponentKey } from './components'
import { pascal } from 'radash'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

defineProps<{
  options?: VsSearchOptions
  labelWidth?: string | number
}>()

const emit = defineEmits<{
  (e: 'inquire', val: Record<string, any>): void
  (e: 'reset'): void
}>()

const form = ref<Record<string, any>>({})
const loading = ref(false)
const showMore = ref(false)
const hiddenColLen = ref(0)
const appSettingMainWidth = inject<Ref<'boxed' | 'full'>>('appSettingMainWidth', ref('full'))

onMounted(() => {
  handleWindowResize()
  window.addEventListener('resize', handleWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})

function handleWindowResize() {
  const colELs = document.querySelectorAll('div.my-search-col[class*="hidden-"]')
  for (const el of colELs) {
    if (getComputedStyle(el).display === 'none') {
      hiddenColLen.value++
    }
  }
}

function onInquire() {
  emit('inquire', form.value)
}

function onRest() {
  form.value = {}
  emit('reset')
}

defineExpose({
  loading
})
</script>

<template>
  <div class="vs-search" :class="{ more: showMore }">
    <template v-if="options?.length">
      <el-form :model="form" :label-width="labelWidth ?? '100px'">
        <el-row>
          <el-col
            v-for="(item, index) in options"
            class="my-search-col"
            :key="item.id"
            :span="24"
            :lg="appSettingMainWidth === 'full' ? 6 : 8"
            :md="12"
            :sm="12"
            :class="{
              'hidden-sm-and-down': !showMore && index > 0,
              'hidden-md-and-down': !showMore && index > 0,
              'hidden-lg-and-down': !showMore && index > 1,
              'hidden-lg-and-up': !showMore && index > (appSettingMainWidth === 'full' ? 2 : 1)
            }"
          >
            <el-form-item :label="item.label" :prop="item.id">
              <slot :name="item.id" :data="form">
                <component
                  v-if="item.type"
                  :is="SComponent[pascal(item.type) as SComponentKey]"
                  v-model="form[item.id]"
                  :placeholder="item.label"
                  :props="item.props"
                />
              </slot>
            </el-form-item>
          </el-col>
          <el-col :span="24" :lg="appSettingMainWidth === 'full' ? 6 : 8" :md="12" :sm="12">
            <div class="function-btns">
              <el-button
                v-if="hiddenColLen !== 0"
                class="more"
                type="primary"
                size="small"
                link
                @click="showMore = !showMore"
              >
                更多筛选条件
                <el-icon class="el-icon--right">
                  <component :is="showMore ? ArrowUp : ArrowDown" />
                </el-icon>
              </el-button>
              <el-button type="primary" @click="onInquire">查询</el-button>
              <el-button @click="onRest">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-divider direction="horizontal" />
    </template>
    <el-text v-else class="no-data" type="info" tag="i">未配置搜索选项</el-text>
  </div>
</template>

<style lang="scss" scoped>
.vs-search {
  & > form[class*='-form'] {
    & + div[class*='-divider--horizontal'] {
      margin: 12px 0;
      border-top-color: var(--vs-border-color-lighter);
    }
  }
  .function-btns {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    .more {
      font-weight: normal;
    }
    button[class*='-button'] + button[class*='-button'] {
      margin-left: 5px;
    }
  }
  :deep(div[class*='-cascader ']) {
    flex: 1;
  }
  :deep(div[class*='-date-editor ']) {
    flex: 1;
  }
  .no-data {
    display: block;
    padding: 16px;
  }
}
</style>
