import type { WidgetDesignData } from 'vswift-form'
import {
  genCascaderCodeSnippets,
  genCheckboxCodeSnippets,
  genDataTableCodeSnippets,
  genDatePickerCodeSnippets,
  genDatetimePickerCodeSnippets,
  genDividerCodeSnippets,
  genInputCodeSnippets,
  genInputNumberCodeSnippets,
  genRadioCodeSnippets,
  genRecursiveAreaCodeSnippets,
  genSelectCodeSnippets,
  genTextCodeSnippets,
  genTimePickerCodeSnippets,
  genUploadCodeSnippets,
} from './gen-form-widget.js'
import { genFormItemStartTag, genFormItemEndTag } from './gen-form-item.js'

export const genFormItemsCodeSnippets = (
  widgetList: WidgetDesignData[],
  options?: {
    space?: number
    model?: string
    recursive?: boolean
    suffix?: string
  },
) => {
  const { space } = options ?? {}
  const codeSnippets: string[][] = []
  for (const widget of widgetList) {
    if (widget.type === 'text') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genTextCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'divider') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genDividerCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'input') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genInputCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'input-number') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genInputNumberCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'radio') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genRadioCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'checkbox') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genCheckboxCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'select') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genSelectCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'cascader') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genCascaderCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'date-picker') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genDatePickerCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'datetime-picker') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genDatetimePickerCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'time-picker') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genTimePickerCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'upload') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genUploadCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'data-table') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genDataTableCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    } else if (widget.type === 'recursive-area') {
      codeSnippets.push([
        genFormItemStartTag(widget, options),
        ...genRecursiveAreaCodeSnippets(widget, options),
        genFormItemEndTag(space),
      ])
    }
  }
  return codeSnippets
}
