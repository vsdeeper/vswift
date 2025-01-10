<script setup lang="ts">
import { sleep } from 'radash'
import {
  rowEdit,
  queryDeptIdList,
  queryPersonList,
  queryCascaderIdList,
  querySelectdList,
} from '@/api/demo-view'
import { useDemoViewStore } from '@/stores/demo-view'
import { toRenderData, toSubmitData } from '../../utils'

const emit = defineEmits<{
  (e: 'succeed'): void
}>()

const { setDeptIdListData, setPersonListData, setCascaderIdListData, setSelectdListData } =
  useDemoViewStore()

const FormDetail = defineAsyncComponent(
  () => import('../table-add/components/form-detail/FormDetail.vue'),
)
const FormDetailRef = ref<InstanceType<typeof FormDetail>>()

const show = ref(false)
const loading = ref(false)
const form = ref<Record<string, any>>({})

const onConfirm = async () => {
  const valid = await FormDetailRef.value?.validate()
  if (!valid) return
  loading.value = true
  if (await rowEdit(toSubmitData(form.value))) {
    ElMessage.success('编辑成功')
    emit('succeed')
  }
  loading.value = false
  show.value = false
}

const onClose = async () => {
  form.value = {}
  await sleep(50)
  FormDetailRef.value?.clearValidate()
}

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
  <el-dialog v-model="show" title="编辑" @close="onClose">
    <FormDetail ref="FormDetailRef" v-model="form" />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>
