/**
 * 图片质量压缩
 * @param imgFile 图片文件
 * @param quality 默认0.5
 */
export declare function imageCompress(imgFile: File | Blob, quality?: number): Promise<string>;
