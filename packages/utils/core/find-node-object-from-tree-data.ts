import { type NodeKey } from '.'
/**
 * 从树形数据中找到目标ID所在的节点对象
 * @param targetId 目标ID
 * @param options 可选参数
 * @param options.id id别名
 * @param options.children children别名
 */
export function findNodeObjectFromTreeData(
  targetId: NodeKey,
  treeData: Record<string, any>[],
  options?: { id?: string; children?: string }
) {
  try {
    return findHandler(targetId, treeData, options)
  } catch (error) {
    console.error('findNodeFromTreeData: ', error)
  }
}

function findHandler(
  targetId: NodeKey,
  treeData: Record<string, any>[],
  options?: { id?: string; children?: string }
) {
  const { id = 'id', children = 'children' } = options ?? {}
  let find: Record<string, any> | undefined
  for (const node of treeData) {
    if (node[id] === targetId) {
      find = node
      break
    }
    if (node[children]?.length) {
      findHandler(targetId, node[children], options)
    }
  }
  return find
}
