import { execSync } from 'node:child_process';
import { rmSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcDir = join(root, 'src');
const distDir = join(root, 'dist');

rmSync(distDir, { recursive: true, force: true });

execSync('npx tsc', { stdio: 'inherit', cwd: root });

// tsc only emits .ts/.tsx — copy CSS (and any other plain assets) alongside
// the compiled JS so relative imports like `import './Hero.css'` resolve.
function copyAssets(dir) {
  for (const entry of readdirSync(dir)) {
    const srcPath = join(dir, entry);
    if (statSync(srcPath).isDirectory()) {
      copyAssets(srcPath);
      continue;
    }
    if (!entry.endsWith('.css')) continue;
    const destPath = join(distDir, relative(srcDir, srcPath));
    mkdirSync(dirname(destPath), { recursive: true });
    copyFileSync(srcPath, destPath);
  }
}
copyAssets(srcDir);
