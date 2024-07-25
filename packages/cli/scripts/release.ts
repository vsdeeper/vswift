import { $ } from 'execa'
import { consola } from 'consola'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import type { CommandOptions, PkgName } from './index.js'
import prettier from 'prettier'
import { globSync } from 'glob'
import { camel } from 'radash'
import { copy } from 'fs-extra/esm'
import { dirname } from '../utils/index.js'

export async function release(options: CommandOptions) {
  const { pkg } = options
  if (!pkg)
    throw new Error('Requires -p or --pkg parameter, optional value: cli | utils | unplugin')

  let releasePackageJson: Record<string, any> | undefined
  try {
    if (['utils'].includes(pkg)) {
      // 转换为发布时的package.json，将暂时修改package.json
      releasePackageJson = toReleasePackageJson(pkg)
    }
    if (pkg === 'cli') {
      // 格式化编译后的文件
      const jsfiles = globSync(path.resolve(process.cwd(), `packages/${pkg}/dist/**/*.js`))
      const formattedFilePath = path.resolve(process.cwd(), `packages/${pkg}/index.ts`)
      const formatOptions = await prettier.resolveConfig(formattedFilePath)
      for (const filePath of jsfiles) {
        const text = readFileSync(filePath, 'utf-8')
        const formatted = await prettier.format(text, formatOptions!)
        writeFileSync(filePath, formatted)
      }
      // 拷贝templates到cli/dist
      const dest = path.resolve(process.cwd(), 'packages/cli/dist/templates')
      const source = path.resolve(dirname(), `../../../../templates`)
      await copy(source, dest, {
        filter: (source) => !(source.endsWith('dist') || source.endsWith('node_modules'))
      })
    }
    const cwd = process.cwd()
    const dir = path.resolve(cwd, `packages/${pkg}`)
    await $({ stdio: 'inherit' })`pnpm --dir ${dir} release`
  } catch (error) {
    consola.error(error)
  }
  // 恢复为开发时的package.json
  releasePackageJson?.revert()
}

function toReleasePackageJson(pkgName: PkgName) {
  const pkgPath = path.resolve(process.cwd(), `packages/${pkgName}/package.json`)
  const storePackage = readFileSync(pkgPath)
  const parsePackage = JSON.parse(readFileSync(pkgPath).toString())
  try {
    if (pkgName === 'utils') {
      parsePackage.main = 'dist/index.cjs'
      parsePackage.module = 'dist/index.js'
      parsePackage.types = 'dist/types/index.d.ts'
      const matchFiles = globSync(path.resolve(process.cwd(), 'packages/utils/core/*.ts'))
      const exportsFiles = matchFiles.map((filePath) =>
        filePath.split(`/packages/${pkgName}/core/`)[1].replace('.ts', '')
      )
      parsePackage.exports = {}
      for (const fileName of exportsFiles) {
        if (fileName === 'index') {
          parsePackage.exports['.'] = {
            import: `./dist/${fileName}.js`,
            require: `./dist/${fileName}.cjs`,
            types: `./dist/types/${fileName}.d.ts`
          }
        } else {
          parsePackage.exports[`./${camel(fileName)}`] = {
            import: `./dist/${fileName}.js`,
            require: `./dist/${fileName}.cjs`,
            types: `./dist/types/${fileName}.d.ts`
          }
        }
      }
      writeFileSync(pkgPath, JSON.stringify(parsePackage, null, 2))
      return {
        revert: () => {
          writeFileSync(pkgPath, storePackage)
        }
      }
    }
  } catch (error) {
    consola.error(error)
  }
  return {
    revert: () => {
      writeFileSync(pkgPath, storePackage)
    }
  }
}
