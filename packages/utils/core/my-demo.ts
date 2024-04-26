import { sleep } from 'radash'

export async function MyDemo(num: number) {
  await sleep(3000)
  return num++
}
