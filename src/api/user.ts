/*
 * @Author: 王鑫
 * @Description: user接口
 * @Date: 2022-04-01 13:24:36
 */
import { http } from '@/utils/http';
import { USER_SERVER } from '@/config'

// 登陆
export function login(parmas: object): Promise<any> {
  return http.post(`${USER_SERVER}/login`, parmas);
}

// 获取用户信息
export function getUserInfo(): Promise<any> {
  return http.get(`${USER_SERVER}/user-info`);
}