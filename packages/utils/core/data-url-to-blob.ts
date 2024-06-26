/**
 * dataURL转换为blob数据
 * @param dataURL canvas.toDataURL
 */
export function dataURLToBlob(dataURL: string) {
  try {
    const BASE64_MARKER = ';base64,'
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      const parts = dataURL.split(',')
      const contentType = parts[0].split(':')[1]
      const raw = decodeURIComponent(parts[1])
      return new Blob([raw], { type: contentType })
    }
    const parts = dataURL.split(BASE64_MARKER)
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    const blobData = new Blob([uInt8Array], { type: contentType })
    console.log('dataURLToBlob转换后: ', blobData)
    return blobData
  } catch (error) {
    console.error('dataURLToBlob: ', error)
  }
}
