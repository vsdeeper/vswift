<script setup lang="ts">
import {
  queryDeptIdList,
  queryPersonList,
  queryCascaderIdList,
  querySelectdList,
} from '@/api/demo-view'
import { useDemoViewStore } from '@/stores/demo-view'
import { toRenderData } from '../../utils'

const { setDeptIdListData, setPersonListData, setCascaderIdListData, setSelectdListData } =
  useDemoViewStore()

const FormDetail = defineAsyncComponent(
  () => import('../table-add/components/form-detail/FormDetail.vue'),
)
const FormDetailRef = ref<InstanceType<typeof FormDetail>>()

const show = ref(false)
const form = ref<Record<string, any>>({})

const open = (row: Record<string, any>) => {
  show.value = true
  form.value = toRenderData(row)
  queryDeptIdList().then(res => setDeptIdListData(res))
  queryPersonList().then(res => setPersonListData(res))
  queryCascaderIdList().then(res => setCascaderIdListData(res))
  querySelectdList().then(res => setSelectdListData(res))
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="show" title="查看">
    <FormDetail ref="FormDetailRef" v-model="form" disabled />
  </el-dialog>
</template>
