import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function dirname() {
  return path.dirname(fileURLToPath(import.meta.url))
}
