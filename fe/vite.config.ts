import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),   tailwindcss(),],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['crypto-js']
  },
  resolve: {
    alias: {
      crypto: 'crypto-js'
    }
  }
})