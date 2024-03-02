/**
 * 首字母大写
 * @param str
 * @returns
 */
export function capitalizeFirstLetter(str: string) {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}