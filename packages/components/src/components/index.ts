import { type AsyncComponentLoader } from 'vue'
import { last, pascal } from 'radash'
import type { MyColorPickerInstance, MyDividerTitleInstance, MyLabelInstance } from '.'

export * from './my-color-picker'
export * from './my-divider-title'
export * from './my-label'
export * from './my-tree-select'
export * from './my-search'

// 生成动态组件对象
export type MyComponentMap = {
  MyColorPicker?: MyColorPickerInstance
  MyDividerTitle?: MyDividerTitleInstance
  MyLabel?: MyLabelInstance
}
export type MyComponentKey = keyof MyComponentMap

const matchFiles = import.meta.glob('./**/my-*.vue')
const MyComponent: MyComponentMap = {}

for (const filePath in matchFiles) {
  const filePathArr = filePath.split('/')
  const key = pascal(last(filePathArr)?.replace('.vue', '') ?? 'Unknown') as MyComponentKey
  MyComponent[key] = defineAsyncComponent({
    loader: matchFiles[filePath] as AsyncComponentLoader
  })
}

export { MyComponent }
