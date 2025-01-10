import type { WidgetDesignData } from 'vswift-form'
import { genSpace, transKeyToVar } from '../../utils.js'
import { camel, pascal, title } from 'radash'

export const genTextCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-text type="${widget.options.type ?? 'danger'}" style="display: block; width: 100%; padding: 12px 0;">`,
    `${genSpace(space ?? 0 + 2)}${widget.options.text}`,
    `${genSpace(space)}</el-text>`,
  )
  return codeSnippets
}

export const genDividerCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-divider>`,
    `${genSpace(space ?? 0 + 2)}${widget.options.text ?? '分割线'}`,
    `${genSpace(space)}</el-divider>`,
  )
  return codeSnippets
}

export const genInputCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-input v-model="${model}.${widget.idAlias}" type="${widget.options.type ?? 'text'}" placeholder="请输入" />`,
  )
  return codeSnippets
}

export const genInputNumberCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  const genPrecisionProp = (widget: WidgetDesignData) => {
    if (typeof widget.options.precision === 'number') {
      return `:precision="${widget.options.precision}"`
    } else return ''
  }
  codeSnippets.push(
    `${genSpace(space)}<el-input-number v-model="${model}.${widget.idAlias}" placeholder="请输入" :min="${widget.options.min ?? 0}" :max="${widget.options.max ?? 'Number.MAX_SAFE_INTEGER'}" ${genPrecisionProp(widget)} />`,
  )
  return codeSnippets
}

export const genRadioCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-radio-group v-model="${model}.${widget.idAlias}" @change="onChange('${widget.idAlias}', $event)">`,
    `${genSpace(space ?? 0 + 2)}<el-radio v-for="item in ${widget.idAlias?.toUpperCase()}_OPTIONS" :key="item.value" :value="item.value">`,
    `${genSpace(space ?? 0 + 4)}{{ item.label }}`,
    `${genSpace(space ?? 0 + 2)}</el-radio>`,
    `${genSpace(space)}</el-radio-group>`,
  )
  return codeSnippets
}

export const genCheckboxCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-checkbox-group v-model="${model}.${widget.idAlias}" @change="onChange('${widget.idAlias}', $event)">`,
    `${genSpace(space ?? 0 + 2)}<el-checkbox v-for="item in ${widget.idAlias?.toUpperCase()}_OPTIONS" :key="item.value" :label="item.label" :value="item.value" />`,
    `${genSpace(space)}</el-checkbox-group>`,
  )
  return codeSnippets
}

export const genSelectCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-select v-model="${model}.${widget.idAlias}" clearable filterable @change="onChange('${widget.idAlias}', $event)">`,
  )
  if (widget.options.dataSource === 'customize') {
    codeSnippets.push(
      `${genSpace(space ?? 0 + 2)}<el-option v-for="item in ${widget.idAlias?.toUpperCase()}_OPTIONS" :key="item.value" :label="item.label" :value="item.value" />`,
    )
  } else {
    codeSnippets.push(
      `${genSpace(space ?? 0 + 2)}<el-option v-for="item in ${camel(transKeyToVar('', widget.idAlias ?? 'undefined', 'list', 'data'))}" :key="item.${widget.options.map?.value ?? 'id'}" :label="item.${widget.options.map?.label ?? 'label'}" :value="item.${widget.options.map?.value ?? 'id'}" />`,
    )
  }
  codeSnippets.push(`${genSpace(space)}</el-select>`)
  return codeSnippets
}

export const genCascaderCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  const genPropsProp = (widget: WidgetDesignData) => {
    const codeArr: string[] = []
    if (widget.options.map?.label) codeArr.push(`label: '${widget.options.map.label}'`)
    if (widget.options.map?.value) codeArr.push(`value: '${widget.options.map.value}'`)
    if (widget.options.map?.children) codeArr.push(`children: '${widget.options.map.children}'`)
    if (codeArr.length) {
      return `:props="{ ${codeArr.join(',')} }"`
    } else return ''
  }
  codeSnippets.push(
    `${genSpace(space)}<el-cascader v-model="${model}.${widget.idAlias}" :options="${camel(transKeyToVar('', widget.idAlias ?? 'undefined', 'list', 'data'))}" clearable filterable ${genPropsProp(widget)}  @change="onChange('${widget.idAlias}', $event)" />`,
  )
  return codeSnippets
}

export const genDatePickerCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-date-picker v-model="${model}.${widget.idAlias}" type="${widget.options.type ?? 'date'}" value-format="x" @change="onChange('${widget.idAlias}', $event)" />`,
  )
  return codeSnippets
}

export const genDatetimePickerCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-date-picker v-model="${model}.${widget.idAlias}" type="${widget.options.type ?? 'datetime'}" value-format="x" @change="onChange('${widget.idAlias}', $event)" />`,
  )
  return codeSnippets
}

export const genTimePickerCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  codeSnippets.push(
    `${genSpace(space)}<el-time-picker v-model="${model}.${widget.idAlias}" value-format="x" @change="onChange('${widget.idAlias}', $event)" />`,
  )
  return codeSnippets
}

export const genUploadCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string },
) => {
  const { space, model = 'model' } = options ?? {}
  const codeSnippets: string[] = []
  const genSingleFileSizeLimitProp = (widget: WidgetDesignData) => {
    if (widget.options.singleFileSizeLimit) {
      return `:single-file-size-limit="${widget.options.singleFileSizeLimit}"`
    }
    return ''
  }
  const genAmountLimitProp = (widget: WidgetDesignData) => {
    if (widget.options.amountLimit) {
      return `:amount-limit="${widget.options.amountLimit}"`
    }
    return ''
  }
  codeSnippets.push(
    `${genSpace(space)}<VsUpload v-model="${model}.${widget.idAlias}" action="${widget.options.action}" ${genSingleFileSizeLimitProp(widget)} ${genAmountLimitProp(widget)} />`,
  )
  return codeSnippets
}

export const genDataTableCodeSnippets = (
  widget: WidgetDesignData,
  options?: { space?: number; model?: string; formItemProp?: string },
) => {
  const { space, model = 'model', formItemProp } = options ?? {}
  const codeSnippets: string[] = []
  const genFormItemProp = (id: string) => {
    if (formItemProp) {
      return `:form-item-prop="${formItemProp}.${id}"`
    }
    return `form-item-prop="${id}"`
  }
  codeSnippets.push(
    `${genSpace(space)}<${pascal(title(widget.idAlias))}Model v-model="${model}.${widget.idAlias}" ${genFormItemProp(widget.idAlias ?? 'undefined')} />`,
  )
  return codeSnippets
}
