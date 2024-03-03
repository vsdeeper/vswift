import { Method, BaseDesignData } from '@/components';
export type SearchConditionType = 'Input' | 'InputNumber' | 'Select' | 'Cascader' | 'DatePicker';
export type DateType = 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange';
export interface SearchConditionOptionItem {
    label?: string;
    value?: string;
}
export interface SearchConditionItem {
    id: string;
    key?: string;
    type?: SearchConditionType;
    placeholder?: string;
    dataSource?: 'api' | 'custom';
    apiMethod?: Extract<Method, 'GET'>;
    api?: string;
    apiParams?: Record<string, any>;
    options?: SearchConditionOptionItem[];
    itemLabel?: string;
    itemValue?: string;
    itemChildren?: string;
    multiple?: boolean;
    checkStrictly?: boolean;
    lazy?: boolean;
    defaultValue?: unknown;
    format?: string;
    valueFormat?: string;
    dateType?: DateType;
    virtualized?: boolean;
}
export interface SearchDesignDataOptions {
    searchConditionItems?: SearchConditionItem[];
}
export type SearchDesignData = BaseDesignData<SearchDesignDataOptions>;
