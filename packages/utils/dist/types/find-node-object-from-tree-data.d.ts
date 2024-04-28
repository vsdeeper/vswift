import { type NodeKey } from '.';
/**
 * 从树形数据中找到目标ID所在的节点对象
 * @param targetId 目标ID
 * @param options 可选参数
 * @param options.id id别名
 * @param options.children children别名
 */
export declare function findNodeObjectFromTreeData(targetId: NodeKey, treeData: Record<string, any>[], options?: {
    id?: string;
    children?: string;
}): Record<string, any> | undefined;
