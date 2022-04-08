/*
 * @Author: 王鑫
 * @Description: 判断是否缓存路由
 * @Date: 2022-03-30 14:10:29
 */
const whiteList = ['/login', '/import', '/404', '401']
export function isTags(path: string) {
  return !whiteList.includes(path)
}
