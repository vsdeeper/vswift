import type { AsyncComponentLoader } from 'vue';
import { capitalizeFirstLetter } from '@/utils';

export * from './vd-project';
export * from './vd-logo';
export * from './vd-menu';
export * from './vd-search';
export * from './vd-table';
export * from './vd-form';
export * from './vd-container';
export * from './vd-aside';
export * from './vd-header';
export * from './vd-main';
export * from './vd-footer';
export * from './vd-router-view';
export * from './vd-view';
export * from './vd-row-col';

export type ComponentTypeOfPageDesigner =
  // 项目容器，只存在于最顶层
  | 'Project'
  // 以下全局组件
  | 'Logo'
  | 'Search'
  | 'Table'
  | 'Form'
  | 'Menu'
  // 以下布局容器
  | 'Aside'
  | 'Container'
  | 'Footer'
  | 'Header'
  | 'Main'
  | 'RowCol'
  // 以下主体容器
  | 'RouterView'
  | 'View'
  // 以下导航组件
  | 'Dropdown'
  // 以下基础组件
  | 'Button'
  | 'Icon'
  // 以下数据展示组件
  | 'Image'
  // 以下其他组件
  | 'Divider';

/** 基础设计数据类型 */
export type BaseDesignData<T = Record<string, any>> = {
  id: string;
  idAlias?: string;
  type: ComponentTypeOfPageDesigner;
  label: string;
  options: T & {
    components?: BaseDesignData<T>[];
  };
};

/** 导出所有vd-*可视化设计组件 */
const VdComponents: { [K in ComponentTypeOfPageDesigner]?: any } = {};
const vueModules = import.meta.glob('./vd-*/vd-*.vue');
for (const path in vueModules) {
  const key = path
    .substring(path.lastIndexOf('/') + 1)
    .replace('.vue', '')
    .replace('vd-', '')
    .split('-')
    .map(str => capitalizeFirstLetter(str))
    .join('') as ComponentTypeOfPageDesigner;
  VdComponents[key] = defineAsyncComponent({
    loader: vueModules[path] as AsyncComponentLoader<any>,
  });
}

export { VdComponents };
