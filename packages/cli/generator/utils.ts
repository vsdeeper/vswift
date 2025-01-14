import chalk from 'chalk'
import consola from 'consola'
import { $ } from 'execa'
import { outputFile, pathExists } from 'fs-extra'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import prettier from 'prettier'
import { camel, pascal, snake, title } from 'radash'
import type { WidgetDesignData } from 'vswift-form'

export function finalOutput(projectName: string) {
  console.log(
    `\n  Next, you can start the project follow these steps: \n` +
      chalk.gray(`  ${`$ cd ${projectName}`}\n` + '  $ pnpm install\n' + '  $ pnpm dev\n') +
      `\n  Setup git hooks, you can follow these steps if you use pnpm: \n` +
      chalk.gray(
        '  $ pnpm exec husky init\n' +
          '  $ echo "pnpm lint-staged" > .husky/pre-commit\n' +
          '  $ echo "pnpm --no-install commitlint --edit" > .husky/commit-msg',
      ),
  )
}

/**
 * 生成空格
 * @param num
 */
export function genSpace(num?: number) {
  if (typeof num !== 'number') return ''
  let str = ''
  while (num-- > 0) {
    str += ' '
  }
  return str
}

/**
 * 将 key 转换为小驼峰变量名称
 * @param prefix
 * @param key
 * @param suffix
 */
export function transKeyToVar(prefix: string, key: string, ...suffix: string[]) {
  return `${camel(title(prefix))}${pascal(title(key))}${suffix?.length ? suffix.map(e => pascal(title(e))).join('') : ''}`
}

/**
 * 生成constants.ts中const常量名称
 * @param id
 */
export function genConstName(id: string) {
  return `${snake(title(id)).toUpperCase()}_OPTIONS`
}

/**
 * 生成model组件名称
 * @param id
 * @param parent
 */
export function genModelCompName(id: string, parent?: WidgetDesignData) {
  let suffix = ''
  if (parent?.type === 'recursive-area') {
    suffix = `Of${pascal(title(parent.idAlias))}`
  }
  return `${pascal(title(id))}${suffix}Model`
}

/**
 * forof 递归
 * @param data
 * @param handler
 * @param options
 */
export function forofRecursive<T = Record<string, any>>(
  data: T[],
  // eslint-disable-next-line no-unused-vars
  handler: (item: T, parent?: T) => any,
  options?: { children?: string; parent?: T },
) {
  const { children = 'children' } = options ?? {}
  for (const item of data) {
    handler(item, options?.parent)
    forofRecursive(item[children] ?? [], handler, {
      ...options,
      parent: item,
    })
  }
}

/**
 * forin 递归
 * @param data
 * @param handler
 * @param options
 */
export function forinRecursive(
  data: Record<string, any>,
  // eslint-disable-next-line no-unused-vars
  handler: (key: string, parent?: Record<string, any>) => any,
  options?: { children?: string; parent?: Record<string, any> },
) {
  for (const key in data) {
    handler(key, options?.parent)
    forinRecursive(data[key] ?? {}, handler, {
      ...options,
      parent: data[key],
    })
  }
}

/**
 * 将import代码片段存储到指定对象
 * @param importType
 * @param importNames
 * @param importPath
 * @param storeObject
 */
export function addImportCode(
  importType: 'type' | 'module',
  importNames: string[],
  importPath: string,
  storeObject: string[],
) {
  const code = storeObject.find(e => e.includes(importPath))
  const index = storeObject.findIndex(e => e.includes(importPath))
  if (!code /** 首次导入 */) {
    if (importType === 'type') {
      storeObject.push(`import type { ${importNames.join(',')} } from '${importPath}'`)
    } else if (importType === 'module') {
      storeObject.push(`import { ${importNames.join(',')} } from '${importPath}'`)
    }
  } else {
    // 解析导入代码
    const importObj = resolveImport(code)
    if (importType === 'type') {
      importObj?.typeImports.push(...importNames)
    } else if (importType === 'module') {
      importObj?.modleImports.push(...importNames)
    }
    // 去重
    if (importObj?.typeImports.length) {
      importObj.typeImports = Array.from(new Set(importObj.typeImports))
    }
    if (importObj?.modleImports.length) {
      importObj.modleImports = Array.from(new Set(importObj.modleImports))
    }
    if (!importObj?.modleImports.length /** 纯类型导入 */) {
      if (importObj?.typeImports.length) {
        storeObject[index] =
          `import type { ${importObj.typeImports.join(',')} } from '${importPath}'`
      }
    } else {
      if (importObj?.typeImports.length /**类型、模块混合导入 */) {
        storeObject[index] =
          `import { ${importObj?.typeImports.map(e => `type ${e}`).join(',')},${importObj.modleImports.join(',')} } from '${importPath}'`
      } /** 纯模块导入 */ else {
        storeObject[index] = `import { ${importObj.modleImports.join(',')} } from '${importPath}'`
      }
    }
  }
}

/**
 * 存储代码片段到指定对象
 * @param code
 * @param storeObject
 * @param fromIndex
 */
export function storeCodeSnippets(code: string[], storeObject: string[], fromIndex?: number) {
  if (typeof fromIndex === 'number') {
    // 添加到指定位置
    storeObject.splice(fromIndex, 0, ...code)
  } else {
    // 添加到末尾
    storeObject.push(...code)
  }
}

/**
 * 存储解构变量的代码片段到指定对象
 * @param name
 * @param storeKey
 * @param storeObject
 */
export function storeCodeSnippetOfDestructuringVar(
  name: string,
  storeKey: string,
  storeObject: string[],
) {
  const code = storeObject.find(e => e.includes(storeKey))
  const index = storeObject.findIndex(e => e.includes(storeKey))
  if (!code /** 首次导入 */) {
    storeObject.push(`const { ${name} } = ${storeKey}`)
  } else {
    const varArr = resolveDestructuringVar(code)
    varArr?.push(name)
    storeObject[index] = `const { ${varArr?.length ? varArr.join(',') : ''} } = ${storeKey}`
  }
}

/**
 * 解析解构变量
 * @param varCode
 */
export function resolveDestructuringVar(varCode: string) {
  const arr = varCode.split(' ').filter(e => e !== ' ' && e !== ',' /** 去空格和逗号 */)
  if (arr.length < 5) {
    consola.error(`"${varCode}" is invalid`)
    return
  }
  const leftBracketIndex = arr.indexOf('{')
  const rightBracketIndex = arr.indexOf('}', leftBracketIndex)
  return arr.slice(leftBracketIndex + 1, rightBracketIndex)
}

/**
 * 解析import代码
 * @param importCode
 */
export function resolveImport(importCode: string) {
  const arr = importCode.split(' ').filter(e => e !== ' ' && e !== ',' /** 去空格和逗号 */)
  if (arr.length < 4) {
    consola.error(`"${importCode}" is invalid`)
    return
  }
  const leftBracketIndex = arr.indexOf('{')
  const rightBracketIndex = arr.indexOf('}', leftBracketIndex)
  if (arr[1] === 'type' /** 导入的全部为类型 */) {
    return {
      typeImports: arr.slice(leftBracketIndex + 1, rightBracketIndex),
      modleImports: [],
    }
  } else if (arr.includes('type') /** 有类型导入 */) {
    const imports = arr.slice(leftBracketIndex + 1, rightBracketIndex)
    return {
      typeImports: imports.map((e, i, a) => (e === 'type' ? a[i + 1] : null)).filter(e => !!e),
      modleImports: imports.map((e, i, a) => (e === 'type' && a[i + 2] !== 'type' ? a[i + 2] : e)),
    }
  } else {
    return {
      typeImports: [],
      modleImports: arr.slice(leftBracketIndex + 1, rightBracketIndex),
    }
  }
}

/**
 * 生成代码文件
 * @param data
 */
export async function genCodeFiles(data: Record<string, any>) {
  try {
    const filePaths: string[] = []
    const { base } = data
    let _path = 'src'
    if (!(await pathExists(_path))) {
      _path = 'templates/vue-admin/src'
    }
    const formatOptions = await prettier.resolveConfig(
      path.resolve(process.cwd(), `${_path}/main.ts`),
    )
    const transParser = (filePath: string) => {
      if (filePath.endsWith('.ts')) return 'typescript'
      else if (filePath.endsWith('.vue')) return 'vue'
    }
    const recurObject = async (obj: Record<string, any>, base: string) => {
      for (const key in obj) {
        if (key.startsWith('/') /** 说明是路径 */) {
          if (typeof obj[key] === 'string' /** 有源代码 */) {
            const filePath = path.resolve(process.cwd(), `${_path}/${base}${key}`)
            const formatted = await prettier.format(obj[key], {
              ...formatOptions,
              parser: transParser(filePath),
            })
            await outputFile(filePath, formatted!)
            filePaths.push(filePath)
          } /** 子目录 */ else {
            await recurObject(obj[key], `${base}${key}`)
          }
        }
      }
    }
    await recurObject(data, base)
    return filePaths
  } catch (error) {
    consola.error('genCodeFiles ->', error)
  }
}

export async function gitInit(projectName: string) {
  await $({ shell: true })`cd ${projectName} && git init`
}

export async function hasGitRemoteOrigin(projectName: string) {
  try {
    await $({
      shell: true,
    })`cd ${projectName} && git remote get-url origin`
    return true
  } catch (error) {
    return false
  }
}

export async function addGitRemoteOrigin(projectName: string, url: string) {
  await $({ shell: true })`cd ${projectName} && git remote add origin ${url}`
}

export async function packageInstall(projectName: string) {
  await $({
    shell: true,
  })`cd ${projectName} && pnpm install`
}

export async function setupGithooks(projectName: string) {
  await $({
    shell: true,
  })`cd ${projectName} && pnpm exec husky init`
  await $({
    shell: true,
  })`cd ${projectName} && echo "pnpm lint-staged" > .husky/pre-commit && echo "pnpm --no-install commitlint --edit" > .husky/commit-msg`
}

export async function createGitignore(path: string) {
  const rules = [
    '# Logs',
    'logs',
    '*.log',
    'pnpm-debug.log*',
    '',
    'node_modules',
    '.DS_Store',
    'dist',
    'coverage',
    '*.local',
    '',
    '/cypress/videos/',
    '/cypress/screenshots/',
    '# Editor directories and files',
    '.vscode/*',
    '!.vscode/extensions.json',
    '',
    '*.tsbuildinfo',
  ]
  await writeFile(path, rules.join('\n'))
}
