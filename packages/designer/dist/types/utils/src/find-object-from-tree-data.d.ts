/**
 * 从树数据中找到目标ID所在的对象
 * @param {string} targetId - 目标ID
 * @param {Object} [options] - 可选参数
 * @param {string} options.id - id别名
 * @param {string} options.children - children别名
 */
export declare const findObjectFromTreeData: (targetId: string | number, tree: Record<string, any>[], options?: {
    id?: string;
    children?: string;
}) => Record<string, any> | undefined;
