/*
 * @Author: 王鑫
 * @Description: http封装请求
 * @Date: 2022-04-01 13:30:18
 */
import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import {
  cancelTokenType,
  RequestMethods,
  EnclosureHttpRequestConfig,
  EnclosureHttpResoponse,
  EnclosureHttpError
} from './types.d'
import { transformConfigByMethod } from './utils'
import { genConfig, jsonReg, errMsgMap, timeoutReg, netErrReg } from './config'
import router from '@/router'
import { removeItem } from '@/utils/storage'
import { ElMessage } from 'element-plus'

class EnclosureHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  // 初始化配置对象
  private static initConfig: EnclosureHttpRequestConfig = {}

  // 保存 EnclosureHttp实例
  private static EnclosureHttpInstance: EnclosureHttp

  private beforeRequestCallback: EnclosureHttpRequestConfig['beforeRequestCallback'] = undefined

  private beforeResponseCallback: EnclosureHttpRequestConfig['beforeResponseCallback'] = undefined

  // 取消的凭证数组
  private sourceTokenList: Array<cancelTokenType> = []

  /**
   * @description 取消重复请求
   * @returns void 0
   */
  private cancelRepeatRequest(): void {
    const temp: { [key: string]: boolean } = {}
    this.sourceTokenList = this.sourceTokenList.reduce<Array<cancelTokenType>>(
      (res: Array<cancelTokenType>, cancelToken: cancelTokenType) => {
        const { cancelKey, cancelExecutor } = cancelToken
        if (!temp[cancelKey]) {
          temp[cancelKey] = true
          res.push(cancelToken)
        } else {
          cancelExecutor()
        }
        return res
      },
      []
    )
  }

  /**
   * @description 拦截请求
   * @returns void 0
   */
  private httpInterceptorsRequest(): void {
    EnclosureHttp.axiosInstance.interceptors.request.use(
      (config: EnclosureHttpRequestConfig) => {
        const $config = config
        this.cancelRepeatRequest();
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof this.beforeRequestCallback === 'function') {
          this.beforeRequestCallback($config)
          this.beforeRequestCallback = undefined
          return $config
        }
        if (EnclosureHttp.initConfig.beforeRequestCallback) {
          EnclosureHttp.initConfig.beforeRequestCallback($config)
          return $config
        }
        return $config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  /**
   * @description 拦截响应
   * @returns void 0
   */
  private httpInterceptorsResponse(): void {
    const instance = EnclosureHttp.axiosInstance
    instance.interceptors.response.use(
      async (response: EnclosureHttpResoponse) => {
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof this.beforeResponseCallback === 'function') {
          this.beforeResponseCallback(response)
          this.beforeResponseCallback = undefined
          return response.data
        }
        if (EnclosureHttp.initConfig.beforeResponseCallback) {
          EnclosureHttp.initConfig.beforeResponseCallback(response)
          return response.data
        }
        let res = response.data
        // blob处理 处理文件下载
        if (response.config.responseType === 'blob') {
          if (jsonReg.test(response.data.type)) {
            try {
              const text = await response.data.text()
              res = JSON.parse(text)
            } catch (err: any) {
              return Promise.reject(err.message || err)
            }
          } else {
            return Promise.resolve(response)
          }
        }
        if (res.code === 401 || res.code === 404) {
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        }
        if (res.code === 200) {
          return Promise.resolve(res)
        } else {
          ElMessage.error(res.message)
          // 继续回调,改变loading
          return Promise.resolve(res)
        }
      },
      (error: EnclosureHttpError) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        // 所有的响应异常 区分来源为取消请求/非取消请求
        let msg = '出现问题，请重试'
        if (error.response && error.response.status) {
          const status = error.response.status
          const data = error.response.data
          if (data && data.code) {
            msg = data.message || msg
          } else {
            msg = errMsgMap[status] || error.response.statusText || msg
          }
          if (status === 401) {
            removeItem('token')
            setTimeout(() => {
              router.push('/login')
            }, 1000)
          } else if (timeoutReg.test(error.message)) {
            msg = '网络超时'
            ElMessage.error(msg)
          } else if (netErrReg.test(error.message)) {
            msg = '网络异常'
            ElMessage.error(msg)
          }
          ElMessage.error(msg)
        }
        return Promise.reject($error)
      }
    )
  }

  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: EnclosureHttpRequestConfig
  ): Promise<T> {
    const config = transformConfigByMethod(param, {
      method,
      url,
      ...axiosConfig
    } as EnclosureHttpRequestConfig)
    return new Promise((resolve, reject) => {
      EnclosureHttp.axiosInstance
        .request(config)
        .then((response: EnclosureHttpResoponse) => {
          resolve(response)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(genConfig())

  public post<T>(url: string, params?: T, config?: EnclosureHttpRequestConfig): Promise<T> {
    return this.request<T>('post', url, params, config)
  }

  public get<T>(url: string, params?: T, config?: EnclosureHttpRequestConfig): Promise<T> {
    return this.request<T>('get', url, params, config)
  }
}

export default EnclosureHttp
