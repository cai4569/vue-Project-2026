import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-Project-2026/', // 👈 重点：必须是 /仓库名/，前后都有斜杠！
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})