/**
 * 驼峰转分隔符
 * @param str
 * @param separator
 * @returns
 */
export function camelToSeparator(str: string, separator?: string) {
  try {
    str = str.charAt(0).toLowerCase() + str.slice(1)
    return str.replace(/([A-Z])/g, `${separator??'-'}$1`).toLowerCase();
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}