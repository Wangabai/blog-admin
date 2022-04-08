/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-04-01 10:10:14
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
// element puls
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/svg-icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    })
  ],

  // css配置
  css: {
    preprocessorOptions: {
      scss: {
        // 导入全局变量
        additionalData: `@import "@/styles/variables.scss";\n`
      }
    }
  },

  base: './',

  resolve: {
    // 别名配置
    alias: {
      '@': resolve(__dirname, 'src/')
    }
  }
})
