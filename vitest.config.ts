import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['verbose'], // This will show individual test results with 'it' format
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './app'),
    },
  },
})
