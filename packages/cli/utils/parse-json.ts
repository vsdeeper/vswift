import consola from 'consola'
import { readFileSync } from 'fs'

export function parseJson(path: string) {
  try {
    return JSON.parse(readFileSync(path).toString())
  } catch (error) {
    consola.error(error)
  }
}
