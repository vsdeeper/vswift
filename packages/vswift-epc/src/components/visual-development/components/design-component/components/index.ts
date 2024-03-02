/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentTypeOfPageDesigner } from '@/components'
import { capitalizeFirstLetter } from '@/utils'
import { AsyncComponentLoader } from 'vue'

/** 导出所有d-*子组件 */
const DesignComponent: { [K in ComponentTypeOfPageDesigner]?: any } = {}
const vueModules = import.meta.glob('./d-*/d-*.vue')
for (const path in vueModules) {
  const key = path
    .substring(path.lastIndexOf('/') + 1)
    .replace('.vue', '')
    .replace('d-', '')
    .split('-')
    .map(str => capitalizeFirstLetter(str))
    .join('') as ComponentTypeOfPageDesigner
  DesignComponent[key] = defineAsyncComponent({
    loader: vueModules[path] as AsyncComponentLoader<any>,
  })
}

export { DesignComponent }