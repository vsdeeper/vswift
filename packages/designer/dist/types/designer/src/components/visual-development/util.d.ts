import { ActiveDesignData, MergeDesignData, RowColDesignData, ComponentTypeOfPageDesigner } from '.';
/**
 * 判断是否容器组件
 * @param type
 */
export declare function isContainerComponent(type: ComponentTypeOfPageDesigner): boolean;
/**
 * 判断组件是否在设计中
 * @param type
 * @returns
 */
export declare function isActiveDesign(targetId: string, activeDesignData?: ActiveDesignData): boolean;
/**
 * 判断是否是根组件
 * @param data
 * @returns
 */
export declare function isRootComponent(id: string, designData: MergeDesignData[]): boolean;
/**
 * 找到组件的父级组件列表
 * @param data
 * @param designData
 * @returns
 */
export declare function findParentComponentOfComponent(target: MergeDesignData, designData: MergeDesignData[]): MergeDesignData | MergeDesignData[] | undefined;
/**
 * 拍平所有组件
 * @param data
 * @returns
 */
export declare function toFlattenComponents(data?: MergeDesignData[]): MergeDesignData[];
/**
 * 遍历组件列表
 * @param data
 * @param callback
 */
export declare function forEachHandlerOfComponents(data: MergeDesignData[], callback: (item: MergeDesignData) => void): void;
/**
 * 删除组件操作
 * @param activeDesignData
 * @param designData
 */
export declare function deleteComponent(activeDesignData: ActiveDesignData, designData: MergeDesignData[]): void;
/**
 * 判断组件是否是布局-row组件
 * @param data
 * @returns
 */
export declare function isRowComponent(data: ActiveDesignData): boolean;
/**
 * 判断组件是否是布局-col组件
 * @param data
 * @returns
 */
export declare function isColComponent(data: ActiveDesignData): boolean;
/**
 * 找到col在row中的索引
 * @param data
 * @param designData
 * @returns
 */
export declare function findIndexColInRow(data: RowColDesignData, designData: MergeDesignData[]): number | undefined;
/**
 * 生成设计数据id
 * @param type
 */
export declare function genId(type: string): string;
