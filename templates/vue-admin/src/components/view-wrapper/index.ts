import ViewWrapper from './ViewWrapper.vue'

export interface BreadcrumbDataItem {
  name?: string
  path?: string
}
export type ViewWrapperInstance = InstanceType<typeof ViewWrapper>
export { ViewWrapper }
