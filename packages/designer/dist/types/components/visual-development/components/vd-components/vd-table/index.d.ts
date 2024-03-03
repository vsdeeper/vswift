import { BaseDesignData, Method } from '@/components';
import { Sort } from 'element-plus';
export type TableColumnItemFormatterType = 'displayByStaticData' /**根据静态数据回显 */ | 'displayByDynamicData' /**根据动态数据回显 */ | 'dateFormat' /** 格式化日期 */;
export interface TableColumnItem {
    id: string;
    prop?: string;
    label?: string;
    width?: string | number;
    minWidth?: string | number;
    fixed?: true | 'left' | 'right';
    showOverflowTooltip?: boolean;
    sortable?: boolean | 'custom';
    sortChange?: (...args: any[]) => void;
    formatterType?: TableColumnItemFormatterType;
    staticDataKey?: string;
    format?: string;
    apiMethod?: Extract<Method, 'GET'>;
    api?: string;
    apiParams?: Record<string, any>;
    tableColumnItems?: TableColumnItem[];
}
export interface TableDesignDataOptions {
    tableColumnItems?: TableColumnItem[];
    apiMethod?: Extract<Method, 'GET'>;
    api?: string;
    apiParams?: Record<string, any>;
    data?: Record<string, any>[];
    itemHasChildren?: string;
    itemChildren?: string;
    autoCalcMaxHeight?: boolean;
    relatedSearchId?: string;
    tableLayout?: 'fixed' | 'auto';
    showCheckbox?: boolean;
    showPagination?: boolean;
    defaultExpandAll?: boolean;
    highlightCurrentRow?: boolean;
    rowKey?: string;
    flexible?: boolean;
    lazy?: boolean;
    loadApiMethod?: Extract<Method, 'GET'>;
    loadApi?: string;
    loadApiParams?: Record<string, any>;
    defaultSort?: Sort;
    virtualized?: boolean;
    [key: string]: any;
}
export type TableDesignData = BaseDesignData<TableDesignDataOptions>;
