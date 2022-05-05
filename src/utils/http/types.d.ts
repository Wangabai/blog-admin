import { Method, Canceler, AxiosError } from 'axios'

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export type cancelTokenType = { cancelKey: string; cancelExecutor: Canceler }

export interface EnclosureHttpError extends AxiosError {
  isCancelRequest?: boolean
}
