import type { XLSX$Utils, WorkSheet } from 'xlsx-js-style';
/**
 * xlsx文件导出
 * 更多关于xlsx-js-style, 参见 https://github.com/gitbrent/xlsx-js-style
 * @param exportData 导出数据
 * @param name 导出文件名，包含文件格式后缀
 * @param addStyleExc 自定义样式执行
 */
export declare function xlsxExport(exportData: Record<string, any>[], name?: string, addStyleExc?: (xlsx: {
    utils: XLSX$Utils;
}, worksheet: WorkSheet) => void): Promise<void>;
