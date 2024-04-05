import { $ } from 'execa'
import { consola } from 'consola'
import { createSpinner } from 'nanospinner'

export async function typeEmit(options) {
  const spinner = createSpinner('type emitting...', { color: 'green' }).start()
  try {
    const start = Date.now()
    const { pkg } = options
    if (!pkg) throw new Error('Requires pkg parameter, optional value: components | utils | visual-development')
    switch (pkg) {
      case 'components':
      case 'visual-development': {
        await $`vue-tsc --project tsconfig.${pkg}.json`
        break
      }
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
