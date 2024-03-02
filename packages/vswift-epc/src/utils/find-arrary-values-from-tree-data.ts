/* eslint-disable @typescript-eslint/no-explicit-any */
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
export const findArraryValuesFromTreeData = (
  targetId: string | number,
  tree: Record<string, any>[],
  options?: {
    id?: string;
    label?: string;
    children?: string;
    returnType?: 'ids' | 'names' | 'objects';
  },
) => {
  const { id = 'id', label = 'label', children = 'children', returnType = 'ids' } = options ?? {};
  if (returnType === 'names') return getNames(targetId, toFlatArr(tree, { id, children }), { id, label });
  else if (returnType === 'ids') return getIds(targetId, toFlatArr(tree, { id, children }), { id });
  else return getObjects(targetId, toFlatArr(tree, { id, children }), { id });
};

function toFlatArr(
  tree: Record<string, any>[],
  options?: { id?: string; children?: string; parentId?: string | number },
) {
  const { id = 'id', children = 'children', parentId } = options ?? {};
  return tree.reduce((pre: Record<string, any>[], cur: Record<string, any>): Record<string, any>[] => {
    return [
      ...pre,
      typeof parentId === 'undefined' ? cur : { ...cur, parentId },
      ...(cur[children] && cur[children].length ? toFlatArr(cur[children], { id, children, parentId: cur[id] }) : []),
    ];
  }, []);
}

function getIds(targetId: string | number, flatArr: Record<string, any>[], options?: { id?: string }) {
  const { id = 'id' } = options ?? {};
  let ids = [targetId];
  let child = flatArr.find(e => e[id] === targetId);
  while (child && typeof child.parentId !== 'undefined') {
    ids = [child.parentId, ...ids];
    child = flatArr.find(e => e[id] === child!.parentId);
  }
  return ids;
}

function getNames(
  targetId: string | number,
  flatArr: Record<string, any>[],
  options?: { id?: string; label?: string },
) {
  const { id = 'id', label = 'label' } = options ?? {};
  let child = flatArr.find(e => e[id] === targetId);
  let names: string[] = (child && [child[label]]) || [];
  while (child && typeof child.parentId !== 'undefined') {
    const find = flatArr.find(e => e[id] === child!.parentId);
    names = [find![label], ...names];
    child = flatArr.find(e => e[id] === child!.parentId);
  }
  return names;
}

function getObjects(targetId: string | number, flatArr: Record<string, any>[], options?: { id?: string }) {
  const { id = 'id' } = options ?? {};
  let child = flatArr.find(e => e[id] === targetId);
  let objects: Record<string, any>[] = (child && [child]) || [];
  while (child && typeof child.parentId !== 'undefined') {
    const find = flatArr.find(e => e[id] === child!.parentId);
    objects = [find!, ...objects];
    child = flatArr.find(e => e[id] === child!.parentId);
  }
  return objects;
}
