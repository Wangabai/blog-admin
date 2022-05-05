/*
 * @Author: 王鑫
 * @Description: user接口
 * @Date: 2022-04-01 13:24:36
 */
import { http } from '@/utils/http';
import { USER_SERVER } from '@/config'

// 登陆
export function login<T>(parmas: object): Promise<T> {
  return http.post<T>(`${USER_SERVER}/login`, parmas);
}

// 获取用户信息
export function getUserInfo<T>(): Promise<T> {
  return http.get<T>(`${USER_SERVER}/user-info`);
}