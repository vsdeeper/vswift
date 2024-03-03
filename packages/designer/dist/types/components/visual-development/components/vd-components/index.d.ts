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
export type ComponentTypeOfPageDesigner = 'Project' | 'Logo' | 'Search' | 'Table' | 'Form' | 'Menu' | 'Aside' | 'Container' | 'Footer' | 'Header' | 'Main' | 'RowCol' | 'RouterView' | 'View' | 'Dropdown' | 'Button' | 'Icon' | 'Image' | 'Divider';
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
declare const VdComponents: {
    [K in ComponentTypeOfPageDesigner]?: any;
};
export { VdComponents };
