/*
 * @Author: 王鑫
 * @Description: user接口
 * @Date: 2022-04-01 13:24:36
 */
import { http } from '@/utils/http';

// 登陆
export function login(parmas: object): Promise<any> {
  return http.post('/sys/login', parmas);
}