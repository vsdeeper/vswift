/**
 * 简易倒计时
 * @param seconds 倒计时总秒数
 * @param change 每秒变化时的回调
 * @param done 倒计时完成时的回调
 */
export declare function countDown(seconds: number, change: (seconds: number) => void, done?: () => void): void;
