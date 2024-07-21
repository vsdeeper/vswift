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
    <el-form v-if="options?.length" :model="form" :label-width="labelWidth ?? '100px'">
      <el-row>
        <el-col
          v-for="(item, index) in options"
          :key="item.id"
          :lg="6"
          :md="8"
          :sm="12"
          :xs="24"
          :class="{
            'hidden-sm-and-down': !showMore && index > 0,
            'hidden-md-and-down': !showMore && index > 1,
            'hidden-lg-and-down': !showMore && index > 2,
            'hidden-lg-and-up': !showMore && index > 2
          }"
        >
          <el-form-item :label="item.label" :prop="item.id">
            <slot :name="item.id" :data="form">
              <component
                v-if="item.type"
                :is="SComponent[pascal(item.type) as SComponentKey]"
                v-model="form[item.id]"
                :props="item.props"
              />
            </slot>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <div class="function-btns">
            <el-button class="more" type="primary" size="small" link @click="showMore = !showMore">
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
    <el-text v-else class="no-data" type="info" tag="i">未配置搜索选项</el-text>
  </div>
</template>

<style lang="scss" scoped>
.vs-search {
  .function-btns {
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
