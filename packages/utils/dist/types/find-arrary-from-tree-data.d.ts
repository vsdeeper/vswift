import { type NodeKey } from '.';
/**
 * 根据子ID查询其所有父级元素，包含其本身
 * @param targetId 要查询的目标id
 * @param treeData 树形数据
 * @param options 可选参数
 * @param options.id id字段别名，默认id
 * @param options.label label字段别名，默认label
 * @param options.children children子节点别名，默认children
 * @param options.returnType 返回所查找元素的类别，可选'ids'(默认)|'labels'|'nodes'
 */
export declare function findArraryValuesFromTreeData(targetId: NodeKey, treeData: Record<string, any>[], options?: {
    id?: string;
    label?: string;
    children?: string;
    returnType?: 'ids' | 'labels' | 'nodes';
}): Record<string, any>[] | NodeKey[] | undefined;
/**
 * 拍平树形数据
 * @param treeData 树形数据
 * @param options 可选参数
 * @param options.id id字段别名，默认id
 * @param options.children children子节点别名，默认children
 * @param options.parentId 节点的父级id，函数内部自动添加，无需传入
 */
export declare function toFlatten(treeData: Record<string, any>[], options?: {
    id?: string;
    children?: string;
    parentId?: NodeKey;
}): Record<string, any>[];
