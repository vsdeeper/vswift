import { last, pascal } from 'radash'
import type { SInputInstance } from './s-input'
import type { AsyncComponentLoader } from 'vue'

export * from './s-input'

// 生成动态组件对象
export type SComponentMap = {
  SInput?: SInputInstance
}
export type SComponentKey = keyof SComponentMap

const matchFiles = import.meta.glob('./**/s-*.vue')
const SComponent: SComponentMap = {}

for (const filePath in matchFiles) {
  const filePathArr = filePath.split('/')
  const key = pascal(last(filePathArr)?.replace('.vue', '') ?? 'Unknown') as SComponentKey
  SComponent[key] = defineAsyncComponent({
    loader: matchFiles[filePath] as AsyncComponentLoader
  })
}

export { SComponent }
