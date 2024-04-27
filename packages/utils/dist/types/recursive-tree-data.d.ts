/**
 * 递归树形数据，返回原数据对象
 * @param treeData 树形数据
 * @param callback 递归回调，可对节点数据进行加工处理
 * @param options 可选参数
 * @param options.children children别名，默认children
 */
export declare function recursiveTreeData(treeData: Record<string, any>[], callback: (node: Record<string, any>) => void, options?: {
    children?: string;
}): Record<string, any>[];
