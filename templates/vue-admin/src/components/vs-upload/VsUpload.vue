<script setup lang="ts">
import {
  ElMessage,
  type UploadFile,
  type UploadFiles,
  type UploadInstance,
  type UploadRawFile,
  type UploadStatus,
  type UploadUserFile,
} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps<{
  action: string
  singleFileSizeLimit?: number
  amountLimit?: number
  listType?: 'text' | 'picture' | 'picture-card'
  previewTeleported?: boolean
}>()

const uploadRef = ref<UploadInstance>()
const model = defineModel<UploadUserFile[]>({ default: () => [] })
const slots = useSlots()
const previewSrcList = ref<string[]>([])
const showImagePreview = ref(false)
const tipArr = computed(() => {
  const arr: string[] = []
  if (typeof props.singleFileSizeLimit === 'number') {
    arr.push(`单文件大小不超过${props.singleFileSizeLimit}KB`)
  }
  if (typeof props.amountLimit === 'number') {
    arr.push(`最多允许上传${props.amountLimit}个文件`)
  }
  return arr
})

const onPreview = (uploadFile: UploadFile) => {
  previewSrcList.value = [uploadFile.url!]
  showImagePreview.value = true
}

const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('onSuccess', response, uploadFile, uploadFiles)
}

const onError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('onError', error, uploadFile, uploadFiles)
}

const beforeUpload = (rawFile: UploadRawFile) => {
  const { size } = rawFile
  if (props.singleFileSizeLimit) {
    if (size / 1024 > props.singleFileSizeLimit) {
      ElMessage.error('文件大小超过限制')
      return false
    }
  }
}

// 以下defineExpose
function abort(file: UploadFile) {
  uploadRef.value?.abort(file)
}

function submit() {
  uploadRef.value?.submit()
}

function clearFiles(status?: UploadStatus[]) {
  uploadRef.value?.clearFiles(status)
}

function handleStart(rawFile: UploadRawFile) {
  uploadRef.value?.handleStart(rawFile)
}

function handleRemove(file: UploadFile | UploadRawFile) {
  uploadRef.value?.handleRemove(file)
}

defineExpose({
  abort,
  submit,
  clearFiles,
  handleStart,
  handleRemove,
})
</script>

<template>
  <el-upload
    ref="uploadRef"
    class="vswift-upload"
    :class="{ [listType || 'text']: true }"
    v-bind="{
      action,
      onPreview,
      onSuccess,
      onError,
      beforeUpload,
    }"
    v-model:file-list="model"
  >
    <template #default>
      <el-icon v-if="listType === 'picture-card'"><Plus /></el-icon>
      <el-button v-else type="primary">选择文件</el-button>
      <div v-if="typeof amountLimit === 'number'" class="limit-tip">
        {{ model.length }}/{{ amountLimit }}
      </div>
    </template>
    <template v-if="slots.trigger" #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #tip>
      <slot name="tip" :amount-limit single-file-size-limit>
        <div class="vs-upload__tip">
          {{ tipArr.join('，') }}
        </div>
      </slot>
    </template>
    <template v-if="slots.file" #file>
      <slot name="file"></slot>
    </template>
  </el-upload>
  <el-image v-if="showImagePreview" :preview-teleported :preview-src-list />
</template>

<style lang="scss" scoped>
.vswift-upload {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vs-border-color);
  border-radius: var(--vs-border-radius-base);
  & > :deep(div[class*='-upload']) {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  .limit-tip {
    font-size: 14px;
    line-height: 1;
    color: var(--vs-text-color-regular);
  }
  &.picture-card {
    :deep(.vs-upload) {
      position: relative;
      justify-content: space-around;
      align-items: center;
    }
    .limit-tip {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
      line-height: 1;
      padding: 5px;
      color: var(--vs-text-color-secondary);
    }
  }
}
</style>
