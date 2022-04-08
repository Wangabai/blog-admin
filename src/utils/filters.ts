/*
 * @Author: 王鑫
 * @Description: 
 * @Date: 2022-04-01 13:30:08
 */
/**
 * @description: 去除空值
 * @param {Object} obj 值对象
 * @param {Boolean} reserveBlank 保留空字符串
 */
export function removeNull(obj: object, reserveBlank = false) {
  const arr = Object.keys(obj)
  const objNew = { ...obj }
  arr.forEach((key) => {
    if (objNew[key] === null || objNew[key] === undefined) {
      delete objNew[key]
    }
    if (objNew[key] === '' && !reserveBlank) {
      delete objNew[key]
    }
  })
  return objNew
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description: 判断是否为空
 * @param {any} data
 * @return {*}
 */
export function isNull(data: any) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}