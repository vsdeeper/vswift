/**
 * 文件下载，适用于后端接口返回文件流
 * @param data 文件流数据
 * @param filename 文件名字，需带文件格式后缀
 */
export declare function fileDownload(data: ArrayBuffer | Blob, filename: string): boolean | undefined;
