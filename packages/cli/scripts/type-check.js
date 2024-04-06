import { $ } from 'execa'
import { consola } from 'consola'
import { createSpinner } from 'nanospinner'

export async function typeCheck(options) {
  const { pkg } = options
  if (!pkg) {
    consola.error('Requires pkg parameter, optional value: components | utils | visual-development')
    return
  }
  const spinner = createSpinner('type checking...', { color: 'green' }).start()
  try {
    const start = Date.now()
    switch (pkg) {
      case 'components':
      case 'visual-development': {
        await $`vue-tsc --project tsconfig.${pkg}.json --noEmit --emitDeclarationOnly false`
        break
      }
      case 'utils': {
        await $`tsc --project tsconfig.${pkg}.json --noEmit --emitDeclarationOnly false`
        break
      }
    }
    const end = Date.now()
    spinner.success({ text: `Done in ${(end - start) / 1000}s.` })
    return true
  } catch (error) {
    spinner.error({ text: 'Type check failed!' })
    consola.error(error)
  }
}
