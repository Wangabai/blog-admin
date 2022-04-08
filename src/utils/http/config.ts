/*
 * @Author: 王鑫
 * @Description: axios 配置
 * @Date: 2022-04-02 14:12:41
 */
import { AxiosRequestConfig } from 'axios'
import { excludeProps } from './utils'
import Qs from 'qs'
import { removeNull } from '@/utils/filters'

/**
 * json正则
 */
export const jsonReg = new RegExp('application/json')

/**
 * 网络错误正则
 */
export const netErrReg = new RegExp('Network Error', 'i')

/**
 * 超时异常
 */
export const timeoutReg = new RegExp('timeout', 'i')

/**
 * 默认配置
 */
export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 24000, //60秒超时
  headers: {
    Accept: 'application/json, text/plain, */*',
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 请求体数据处理
  transformRequest(data, config: any) {
    if (data instanceof FormData) {
      return data
    }
    return jsonReg.test(config['Content-Type'])
      ? JSON.stringify(data)
      : Qs.stringify(data, { allowDots: true, strictNullHandling: true })
  },
  // url参数序列化
  paramsSerializer(params) {
    const object = { ...params }
    // 删除undefined，null和空字符串
    removeNull(object)
    return Qs.stringify(object, { allowDots: true, skipNulls: true })
  }
}

export function genConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config) {
    return defaultConfig
  }
  const { headers } = config
  if (headers && typeof headers === 'object') {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers
    }
  }
  return { ...excludeProps(config!, 'headers'), ...defaultConfig }
}

export const METHODS = ['post', 'get', 'put', 'delete', 'option', 'patch']

/**
 * 错误码信息配置
 */
export const errMsgMap = {
  401: '认证失败',
  403: '无权访问',
  404: '资源不存在',
  405: '不支持的请求方法',
  413: '请求体过长',
  414: 'URL过长',
  415: '格式错误',
  429: '请求过于频繁',
  431: '请求头过长',
  500: '服务器异常',
  502: '网关错误',
  503: '服务器异常',
  504: '网关超时'
}
