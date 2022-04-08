/*
 * @Author: 王鑫
 * @Description: http请求工具方式
 * @Date: 2022-04-02 14:33:57
 */
import { EnclosureHttpRequestConfig } from './types.d';

export function excludeProps<T extends { [key: string]: any }>(
  origin: T,
  prop: string
): { [key: string]: T } {
  return Object.keys(origin)
    .filter(key => !prop.includes(key))
    .reduce((res, key) => {
      res[key] = origin[key];
      return res;
    }, {} as { [key: string]: T });
}

export function transformConfigByMethod(
  params: any,
  config: EnclosureHttpRequestConfig
): EnclosureHttpRequestConfig {
  const { method } = config;
  const props = ['delete', 'get', 'head', 'options'].includes(
    method!.toLocaleLowerCase()
  )
    ? 'params'
    : 'data';
  return {
    ...config,
    [props]: params,
  };
}
