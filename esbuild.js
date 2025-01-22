import * as esbuild from 'esbuild';

// esbuild.formatMessages('errors-only', { color: true, kind: 'error' })

esbuild.build({
    entryPoints: ['src/index.ts'], // Your entry file(s)
    outfile: 'dist/index.cjs', // Output file path
    bundle: true, // Bundle all dependencies
    platform: 'node', // Target Node.js environment
    target: 'esnext', // Target modern JavaScript
    format: 'cjs', // Output format (CommonJS)
    tsconfig: 'tsconfig.json', // Use your own tsconfig file
    sourcemap: true, // Include sourcemaps
    minify: false, // Minify output (set true for production)
    external: [], // Empty array ensures no dependencies are excluded
})
    .then((res) => console.info(`\x1b[92mBuild complete!\x1b[0m`, res))
    .catch((err) => console.error(`\x1b[91mBuild error!\x1b[0m`, err));
