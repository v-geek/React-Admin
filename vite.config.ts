import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    open: true, // 自动开启窗口
    host: true, // 监听本地所有IP
    // port: envConf.VITE_PORT,
    proxy: {
      // [env.VITE_API_BASE_URL]: {
      //   target: env.VITE_PROXY_URL,
      //   changeOrigin: true,
      //   rewrite: path => path.replace(env.VITE_API_BASE_URL, '')
      // },
      '/api': {
        target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', ''),
      },
    },
    // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
    warmup: {
      clientFiles: ['./index.html', './src/{views,components}/*'],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variable.scss" as *;
          @use "@/styles/mixin.scss" as *;
        `,
      },
    },
  },
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
})
