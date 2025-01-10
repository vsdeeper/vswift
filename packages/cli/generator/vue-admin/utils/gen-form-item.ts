import type { WidgetDesignData } from 'vswift-form'
import { genSpace } from '../../utils.js'

export const genFormItemRulesProp = (widget: WidgetDesignData) => {
  const codeArr: string[] = []
  if (widget.options.required) {
    codeArr.push(`{ required: true, message: '必填项' }`)
  }
  if (widget.options.pattern) {
    codeArr.push(
      `{ pattern: new RegExp('${widget.options.pattern}'), message: '${widget.options.patternMessage || '格式不正确'}' }`,
    )
  }
  if (codeArr.length) {
    return `:rules="[${codeArr.join(',')}]"`
  } else return ''
}

export const genFormItemStartTag = (
  widget: WidgetDesignData,
  options?: { space?: number; recursive?: boolean },
) => {
  const { space, recursive } = options ?? {}
  const genFormItemProp = (id: string) => {
    if (recursive) {
      return ':prop="genFormItemProp(`${$index}.' + `${id}` + '`)"'
    }
    return `props="${id}"`
  }
  return `${genSpace(space)}<el-form-item label="${widget.options.label}" ${genFormItemProp(widget.idAlias ?? 'undefined')} ${genFormItemRulesProp(widget)}>`
}

export const genFormItemEndTag = (space?: number) => {
  return `${genSpace(space)}</el-form-item>`
}
