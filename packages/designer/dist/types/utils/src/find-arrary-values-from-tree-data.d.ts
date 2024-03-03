/**
 * 根据子ID查询其所有父级ID
 * @param tree 树结构数据
 * @param targetId 要查询的目标id
 * @param options 可选参数
 * @param options.id id字段别名，默认value
 * @param options.label label字段别名，默认label
 * @param options.children children子节点别名，默认children
 * @param options.returnType 返回的树数据字段，默认返回ids
 */
export declare const findArraryValuesFromTreeData: (targetId: string | number, tree: Record<string, any>[], options?: {
    id?: string;
    label?: string;
    children?: string;
    returnType?: 'ids' | 'names' | 'objects';
}) => Record<string, any>[] | (string | number)[];
