import { cp, rm, mkdir } from 'node:fs/promises';
import { execSync } from 'node:child_process';

execSync('node scripts/check.mjs', { stdio: 'inherit' });

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });

const dirs = ['assets', 'club', 'equips', 'escoleta', 'socis', 'sponsors', 'contacte', 'area-privada', 'legal'];
for (const d of dirs) {
  await cp(d, `dist/${d}`, { recursive: true });
}
await cp('index.html', 'dist/index.html');

console.log('Build completada a dist/.');
