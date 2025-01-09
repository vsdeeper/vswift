// 对前端获取的表单数据进行处理
export function toSubmitData(data: Record<string, any>) {
  const _data: Record<string, any> = JSON.parse(JSON.stringify(data))
  // 数据转换...
  return _data
}

// 对后端返回的数据进行处理
export function toRenderData(data: Record<string, any>) {
  const _data: Record<string, any> = JSON.parse(JSON.stringify(data))
  // 数据转换...
  return _data
}
