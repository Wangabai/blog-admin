/*
 * @Author: 王鑫
 * @Description: http封装请求
 * @Date: 2022-04-01 13:30:18
 */
import Axios, { AxiosRequestConfig, AxiosInstance, CancelTokenStatic, AxiosResponse } from 'axios'
import { RequestMethods, cancelTokenType, EnclosureHttpError } from './types.d'
import { transformConfigByMethod } from './utils'
import { genConfig, errMsgMap } from './config'
import router from '@/router'
import { removeItem } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import store from '@/store'
class EnclosureHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(genConfig())

  // axios取消对象
  private CancelToken: CancelTokenStatic = Axios.CancelToken

  // 取消的凭证数组
  private sourceTokenList: Array<cancelTokenType> = []

  // 记录当前这一次cancelToken的key
  private currentCancelTokenKey = ''

  /**
   * @description 生成唯一取消key
   * @param config axios配置
   * @returns string
   */
  private static genUniqueKey(config: AxiosRequestConfig): string {
    return `${config.url}--${JSON.stringify(config.data)}`
  }

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
      (config: AxiosRequestConfig) => {
        const $config = config
        const cancelKey = EnclosureHttp.genUniqueKey($config)
        $config.cancelToken = new this.CancelToken((cancelExecutor: (cancel: any) => void) => {
          this.sourceTokenList.push({ cancelKey, cancelExecutor })
        })
        this.cancelRepeatRequest()
        this.currentCancelTokenKey = cancelKey
        const token = store.getters.token
        if (token) ($config as any).headers['Authorization'] = `Bearer ${token}`
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
      async (response: AxiosResponse) => {
        // 判断当前的请求中是否在 取消token数组理存在，如果存在则移除（单次请求流程）
        if (this.currentCancelTokenKey) {
          const haskey = this.sourceTokenList.filter(
            (cancelToken) => cancelToken.cancelKey === this.currentCancelTokenKey
          ).length
          if (haskey) {
            this.sourceTokenList = this.sourceTokenList.filter(
              (cancelToken) => cancelToken.cancelKey !== this.currentCancelTokenKey
            )
            this.currentCancelTokenKey = ''
          }
        }
        let res = response.data
        if (res.code === 401 || res.code === 404) {
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        }
        if (res.code === 200) {
          return res
        } else {
          ElMessage.error(res.message)
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
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    const config = transformConfigByMethod(param, {
      method,
      url,
      ...axiosConfig
    } as AxiosRequestConfig)
    return new Promise<T>((resolve, reject) => {
      EnclosureHttp.axiosInstance
        .request<any, T>(config)
        .then((response) => {
          resolve(response)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  public post<T>(
    url: string,
    params?: AxiosRequestConfig,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>('post', url, params, config)
  }

  public get<T>(url: string, params?: AxiosRequestConfig, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('get', url, params, config)
  }
}

export default EnclosureHttp
