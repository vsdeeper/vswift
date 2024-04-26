import { $ } from 'execa'
import { consola } from 'consola'
import { createSpinner } from 'nanospinner'

export async function typeEmit(options) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: utils')
    return
  }
  const spinner = createSpinner('type emitting...', { color: 'green' }).start()
  try {
    const start = Date.now()
    switch (pkg) {
      case 'utils': {
        await $`tsc --project tsconfig.${pkg}.json`
        break
      }
    }
    const end = Date.now()
    spinner.success({ text: `type emit done in ${(end - start) / 1000}s` })
    return true
  } catch (error) {
    spinner.error({ text: 'type emit failed' })
    consola.error(error)
  }
}
