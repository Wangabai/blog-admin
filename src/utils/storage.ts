/*
 * @Author: 王鑫
 * @Description: 封装缓存
 * @Date: 2022-04-01 13:35:07
 */
export const setItem = (key: string, value: string | object) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getItem = (key: string) => {
  const data = window.localStorage.getItem(key)?.toString()
  try {
    if (data) return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}

export const removeAllItem = () => {
  window.localStorage.clear()
}
