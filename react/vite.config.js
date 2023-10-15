import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: true,
    assetsDir: 'assets',
    chunkFileNames: 'assets/[name].[hash].js',
    assetFileNames: 'assets/[name].[hash].[ext]',
    cssCodeSplit: true,
    minify: 'terser',
    sourcemap: true,
  },
});

