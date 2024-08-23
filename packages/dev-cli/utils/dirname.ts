import path from 'path'
import { fileURLToPath } from 'url'

export function dirname(importMetaUrl: string) {
  return path.dirname(fileURLToPath(importMetaUrl))
}
