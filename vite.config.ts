/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true, // api 全局导入
    environment: 'jsdom', // 测试环境，默认为node.js
  },
  plugins: [vue()],
})
