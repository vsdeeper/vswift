import path from 'path'
import { pathExistsSync } from 'fs-extra/esm'
import { dirname } from './index.js'

export function getTemplatePath(templateName: string, importMetaUrl: string, base?: string) {
  // 从dist目录中查找
  const tplPath = path.resolve(dirname(importMetaUrl), base ?? '..', `templates/${templateName}/`)
  if (pathExistsSync(tplPath) /** 该tpl存在 */) {
    return tplPath
  } else {
    // dist目录中不存在该tpl，说明是开发环境
    return path.resolve(process.cwd(), `templates/${templateName}/`)
  }
}
