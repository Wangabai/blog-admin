/*
 * @Author: 王鑫
 * @Description: 文章接口
 * @Date: 2022-04-08 15:02:01
 */
import { http } from '@/utils/http';
import { ARTICLE_SERVER } from '@/config'

// 文章列表
export function articleList(parmas: object): Promise<any> {
  return http.post(`${ARTICLE_SERVER}/list`, parmas);
}

// 新增文章
export function articleAdd(parmas: object): Promise<any> {
  return http.post(`${ARTICLE_SERVER}/add`, parmas);
}

// 文章编辑
export function articleEdit(parmas: object): Promise<any> {
  return http.post(`${ARTICLE_SERVER}/edit`, parmas);
}

// 文章详情
export function articleDetail(parmas: object): Promise<any> {
  return http.get(`${ARTICLE_SERVER}/detail`, parmas);
}

// 删除文章
export function articleDel(parmas: object): Promise<any> {
  return http.post(`${ARTICLE_SERVER}/delete`, parmas);
}
