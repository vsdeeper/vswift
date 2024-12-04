import chalk from 'chalk'
import consola from 'consola'
import { outputFile } from 'fs-extra'
import path from 'node:path'
import prettier from 'prettier'

export function finalOutput(projectName: string) {
  console.log(
    `\n  Next, you can start the project like this: \n\n` +
      chalk.gray(
        `  ${`$ cd ${projectName}`}\n` + `  ${'$ pnpm install'}\n` + `  ${'$ pnpm dev'}\n`,
      ),
  )
}

/**
 * 生成空格
 * @param num
 */
export function genSpace(num: number) {
  let str = ''
  while (num-- > 0) {
    str += ' '
  }
  return str
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
    const importObj = resolveImport(code)
    if (importType === 'type') {
      importObj?.typeImports.push(...importNames)
    } else if (importType === 'module') {
      importObj?.modleImports.push(...importNames)
    }
    if (!importObj?.modleImports.length) {
      storeObject[index] =
        `import type { ${importObj?.typeImports.join(',')} } from '${importPath}'`
    } else {
      const typeCodes = importObj?.typeImports.map(e => `type ${e}`)
      storeObject[index] =
        `import { ${typeCodes.length ? typeCodes.join(',') : ''}${importObj.modleImports.join(',')} } from '${importPath}'`
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
 * @param source
 * @param storeObject
 */
export function storeCodeSnippetOfDestructuringVar(
  name: string,
  sourceObject: string,
  storeObject: string[],
) {
  const code = storeObject.find(e => e.includes(sourceObject))
  const index = storeObject.findIndex(e => e.includes(sourceObject))
  if (!code /** 首次导入 */) {
    storeObject.push(`const { ${name} } = ${sourceObject}`)
  } else {
    const varArr = resolveDestructuringVar(code)
    varArr?.push(name)
    storeObject[index] = `const { ${varArr?.length ? varArr.join(',') : ''} } = ${sourceObject}`
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
    const { base } = data
    const formatOptions = await prettier.resolveConfig(
      path.resolve(process.cwd(), 'templates/vue-admin/src/main.ts'),
    )
    const transParser = (filePath: string) => {
      if (filePath.endsWith('.ts')) return 'typescript'
      else if (filePath.endsWith('.vue')) return 'vue'
    }
    const recurObject = async (obj: Record<string, any>, base: string) => {
      for (const key in obj) {
        if (key.startsWith('/') /** 说明是路径 */) {
          if (typeof obj[key] === 'string' /** 源代码 */) {
            const filePath = path.resolve(process.cwd(), `templates/vue-admin/src/${base}${key}`)
            const formatted = await prettier.format(obj[key], {
              ...formatOptions,
              parser: transParser(filePath),
            })
            await outputFile(filePath, formatted!)
          } /** 子目录 */ else {
            recurObject(obj[key], `${base}${key}`)
          }
        }
      }
    }
    await recurObject(data, base)
  } catch (error) {
    consola.error('genCodeFiles ->', error)
  }
}
