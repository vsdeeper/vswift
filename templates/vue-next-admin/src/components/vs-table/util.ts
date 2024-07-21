import type { VsTableColumnItem } from '.'

export function getSlots(data?: VsTableColumnItem[]) {
  return toFlatten(data)
    .filter((e) => !!e.prop)
    .map((e) => e.prop!)
}

function toFlatten(data?: VsTableColumnItem[]): VsTableColumnItem[] {
  return (
    data?.reduce<VsTableColumnItem[]>((pre, cur) => {
      return [...pre, ...(cur.children?.length ? toFlatten(cur.children) : [cur])]
    }, []) ?? []
  )
}
