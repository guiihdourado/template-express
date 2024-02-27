import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['src/shared/tests/setupTests.ts'],
    coverage: {
      include: ['src/modules/**/application/use-cases/*.ts'],
      provider: 'v8',
    },
  },
})
