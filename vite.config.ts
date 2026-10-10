import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-vite-plugin';

// GitHub Pages only serves real files, so a hard reload on a client-side
// route like /projects would 404. Serving the app shell as 404.html lets the
// router take over for any path.
function spaFallback(): Plugin {
  let outDir = 'dist';
  return {
    name: 'spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
}

const config = defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    react(),
    spaFallback(),
  ],
  base: '/',
});

export default config;
