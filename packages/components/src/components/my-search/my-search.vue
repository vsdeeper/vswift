<script setup lang="ts">
import { nanoid } from 'nanoid';
import type { MySearchOptions } from '.';
import { SComponent, type SComponentKey } from './components'

defineProps<{
  options?: MySearchOptions
}>()

const id = `mysearch${nanoid(5)}`
const isInquiring = ref(false)
const form = ref<Record<string, any>>({} )

defineExpose({
  isInquiring
})
</script>

<template>
  <div :id="id" class="my-search">
    <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col v-for="item in options" :key="item.id" :span="24" :xl="6" :lg="8" :md="12" :sm="24" :offset="0">
        <el-form-item :label="item.label">
          <components :is="SComponent[item.id as SComponentKey]" />
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
  </div>
</template>