import { $ } from 'execa'
import { copy, pathExists } from 'fs-extra/esm'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

export function dirname(importMetaUrl: string) {
  return path.dirname(fileURLToPath(importMetaUrl))
}

export async function getTemplatePath(templateName: string, importMetaUrl: string, base = '..') {
  let tplPath = path.resolve(dirname(importMetaUrl), base, `templates/${templateName}/`)
  if (!(await pathExists(tplPath))) {
    tplPath = path.resolve(dirname(importMetaUrl), base, '../..', `templates/${templateName}/`)
  }
  return tplPath
}

export async function copyTemplate(source: string, dest: string) {
  await copy(source, dest, {
    filter: src => !(src.endsWith('dist') || src.endsWith('node_modules')),
  })
}

export async function parseJson(path: string) {
  return JSON.parse(await readFile(path, { encoding: 'utf-8' }))
}

export async function parsePackageJson() {
  const pkgPath = path.resolve(dirname(import.meta.url), `../package.json`)
  if (await pathExists(pkgPath)) {
    return JSON.parse(await readFile(pkgPath, { encoding: 'utf-8' }))
  } else {
    const pkgPath = path.resolve(dirname(import.meta.url), `../../package.json`)
    return JSON.parse(await readFile(pkgPath, { encoding: 'utf-8' }))
  }
}

export function getPackageVersion(pkg: string, source: string) {
  if (source.includes(pkg)) {
    return source.substring(
      source.indexOf(`${pkg}@`) + `${pkg}@`.length,
      source.indexOf('\n', source.indexOf(`${pkg}@`)),
    )
  }
}

export async function checkExistsGlobalPackage(pkg: string) {
  const { stdout } = await $({ shell: true })`npm list -g ${pkg}`
  const version = getPackageVersion('husky', stdout)
  return !!version
}
