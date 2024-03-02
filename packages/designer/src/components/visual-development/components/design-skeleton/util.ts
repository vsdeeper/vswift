import { MergeDesignData } from '../..'

export function genStyle(data: MergeDesignData) {
  return {
    'flex': data.options?.width ? `0 0 ${data.options?.width}` : '1',
    'width': data.options?.width,
    'minHeight': data.options?.height
  }
}