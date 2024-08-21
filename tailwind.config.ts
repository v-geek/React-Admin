/** @type {import('tailwindcss').Config} */
export default {
  // 不在 content 包括的文件内, 你编写的 class, 是不会生成对应的css工具类的
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  // 取消 TailwindCSS 内置的全局样式
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      // 添加颜色  eg: text-primary
      colors: {
        dark: '#1f1f1f',
        'base-color': 'var(--colorText)',
      },
    },
  },
  plugins: [],
}
