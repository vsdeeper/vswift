<script setup lang="ts">
import { sleep } from 'radash'
import { editItem, queryDeptList, queryPersonList, queryCascaderIdList } from '@/api/demo-view'
import { useDemoViewStore } from '@/stores/demo-view'
import { toRenderData, toSubmitData } from '../../utils'

const emit = defineEmits<{
  (e: 'succeed'): void
}>()

const { setDeptListData, setPersonListData, setCascaderIdListData } = useDemoViewStore()

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
  if (await editItem(toSubmitData(form.value))) {
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
  queryDeptList().then(res => setDeptListData(res))
  queryPersonList().then(res => setPersonListData(res))
  queryCascaderIdList().then(res => setCascaderIdListData(res))
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
