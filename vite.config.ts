import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'brotliCompress', threshold: 1024 }),
    viteCompression({ algorithm: 'gzip', threshold: 1024 }),
    visualizer({ open: false, filename: 'dist/stats.html' }),
  ],
  server: {
    proxy: {
      '/blog-feed.xml': {
        target: 'https://samuteg-dev.vercel.app',
        changeOrigin: true,
        rewrite: () => '/rss.xml',
      },
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-analytics': ['@vercel/analytics', '@vercel/speed-insights'],
        },
      },
    },
  },
})
