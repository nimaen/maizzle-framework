import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { realpathSync } from 'node:fs'
import { tmpdir } from 'node:os'

export function createTempProject() {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), 'maizzle-render-')))
  return dir
}

export function writeSfc(dir: string, path: string, content: string) {
  const full = join(dir, path)
  mkdirSync(join(dir, ...path.split('/').slice(0, -1)), { recursive: true })
  writeFileSync(full, content)
}
