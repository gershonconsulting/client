import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  // src/entry.ts = /api/matrix-stats in front of the app in src/index.tsx (2026-10-28)
  plugins: [pages({ entry: './src/entry.ts' })],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  build: {
    outDir: 'dist',
    minify: true
  }
})
