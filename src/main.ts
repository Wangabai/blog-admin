/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-04-01 10:10:14
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import components from './components';
import '@/styles/index.scss'
import 'virtual:svg-icons-register'; // 引入svg icon注册脚本

const app = createApp(App)

app.use(store)
  .use(router)
  .use(components)
  .mount('#app');
