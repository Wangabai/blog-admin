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
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 导入权限控制模块
import './permission'

const app = createApp(App)

app.use(store)
  .use(router)
  .use(components)
  .use(ElementPlus, { locale: zhCn })
  .mount('#app');
