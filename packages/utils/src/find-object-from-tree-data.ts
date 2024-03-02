/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 从树数据中找到目标ID所在的对象
 * @param {string} targetId - 目标ID
 * @param {Object} [options] - 可选参数
 * @param {string} options.id - id别名
 * @param {string} options.children - children别名
 */
export const findObjectFromTreeData = (
  targetId: string | number,
  tree: Record<string, any>[],
  options?: { id?: string; children?: string },
) => {
  const { id = 'id', children = 'children' } = options ?? {};
  return finder(targetId, tree, { id, children });
};

function finder(targetId: string | number, tree: Record<string, any>[], options?: { id?: string; children: string }) {
  const { id = 'id', children = 'children' } = options ?? {};
  for (const item of tree) {
    if (item[id] === targetId) {
      return item;
    }
    if (item[children] && item[children].length) {
      finder(targetId, item[children], { id, children });
    }
  }
}
