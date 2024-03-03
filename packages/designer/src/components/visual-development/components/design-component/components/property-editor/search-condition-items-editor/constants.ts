import { DateType, SearchConditionType } from "@/components";

export const SEARCH_TYPE_OPTIONS: { label: string; value: SearchConditionType }[] = [
  { label: '输入框', value: 'Input' },
  { label: '数字输入框', value: 'InputNumber' },
  { label: '选择器', value: 'Select' },
  { label: '级联选择器', value: 'Cascader' },
  { label: '日期选择器', value: 'DatePicker' },
]
export const DATE_TYPE_OPTIONS: { label: string; value: DateType }[] = [
  { label: '年份', value: 'year' },
  { label: '月份', value: 'month' },
  { label: '日期', value: 'date' },
  { label: '星期', value: 'week' },
  { label: '多选日期', value: 'dates' },
  { label: '日期时间', value: 'datetime' },
  { label: '日期范围', value: 'daterange' },
  { label: '日期时间范围', value: 'datetimerange' },
  { label: '月范围', value: 'monthrange' },
]