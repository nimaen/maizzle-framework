import { defineConfig } from 'tsdown'
import { cpSync } from 'node:fs'

export default defineConfig({
  entry: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/server/ui/**',
    '!src/types/modules.d.ts',
  ],
  format: 'cjs',
  dts: true,
  unbundle: true,
  outExtensions: () => ({ js: '.cjs', dts: '.d.ts' }),
  external: ['lightningcss'],
  outDir: 'dist-node',
  clean: true,
  hooks: {
    'build:done': () => {
      // Copy Vue components (resolved at runtime by unplugin-vue-components)
      cpSync('src/components', 'dist-node/components', { recursive: true })
      // Copy dev UI (served at runtime by Vite)
      cpSync('src/server/ui', 'dist-node/server/ui', { recursive: true })
      // Copy the parallel-build worker entry (plain JS, loaded by tinypool at runtime)
      cpSync('src/render/parallel/worker.mjs', 'dist-node/render/parallel/worker.mjs')
    },
  },
})
