/*
 * @Author: 王鑫
 * @Description: 批量公共组建引入
 * @Date: 2022-04-06 14:34:26
 */
import { App } from 'vue'
import Hamburger from './Hamburger.vue'
import SvgIcon from './SvgIcon.vue'

export default {
  install(Vue: App) {
    Vue.component('Hamburger', Hamburger)
    Vue.component('SvgIcon', SvgIcon)
  }
}
