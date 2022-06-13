/*
 * @Author: 王鑫
 * @Description: 
 * @Date: 2022-05-16 14:11:44
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
}

declare module 'vue3-markdown-it';