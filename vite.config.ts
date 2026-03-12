import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['hono', '@hono/node-server']
    },
    ssr: true,
    outDir: 'dist'
  }
})
