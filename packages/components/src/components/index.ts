import { type AsyncComponentLoader } from 'vue'
import { last, pascal } from 'radash'
import type { MyColorPickerInstance, MyDividerTitleInstance, MyLabelInstance } from '.'

export * from './my-color-picker'
export * from './my-divider-title'
export * from './my-label'
export * from './my-tree-select'
export * from './my-search'

// 生成动态组件对象
type ComponentsMap = {
  MyColorPicker?: MyColorPickerInstance
  MyDividerTitle?: MyDividerTitleInstance
  MyLabel?: MyLabelInstance
}

const matchFiles = import.meta.glob('./**/my-*.vue')
const MyComponents: ComponentsMap = {}

for (const filePath in matchFiles) {
  const filePathArr = filePath.split('/')
  const key = pascal(
    last(filePathArr)?.replace('.vue', '') ?? 'Unknown'
  ) as keyof typeof MyComponents
  MyComponents[key] = defineAsyncComponent({
    loader: matchFiles[filePath] as AsyncComponentLoader
  })
}

export { MyComponents }
