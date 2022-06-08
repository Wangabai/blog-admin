/*
 * @Author: 王鑫
 * @Description: 标签、分类接口配置
 * @Date: 2022-05-19 13:56:53
 */
import { http } from '@/utils/http'
import { TAG_SERVER } from '@/config'
import { CATEGORY_SERVER } from '@/config'

// 添加标签
export function addTag(parmas: object): Promise<any> {
  return http.post(`${TAG_SERVER}/add`, parmas)
}

// 标签列表
export function listTag(parmas: object): Promise<any> {
  return http.post(`${TAG_SERVER}/list`, parmas)
}

// 标签Select
export function selectTag(): Promise<any> {
  return http.get(`${TAG_SERVER}/select-list`)
}

// 添加分类
export function addCategory(parmas: object): Promise<any> {
  return http.post(`${CATEGORY_SERVER}/add`, parmas)
}

// 分类列表
export function listCategory(parmas: object): Promise<any> {
  return http.post(`${CATEGORY_SERVER}/list`, parmas)
}

// 标签Select
export function selectCategory(): Promise<any> {
  return http.get(`${CATEGORY_SERVER}/select-list`)
}