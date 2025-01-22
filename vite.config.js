import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    base: './',
    build: {
        minify: false,
        outDir: 'dist',
        target: 'node',
        sourcemap: true,
        emptyOutDir: false,
        rollupOptions: {
            input: {
                main: '/src/index.ts',
            },

            output: {
                entryFileNames: 'cli.js',
                chunkFileNames: 'lib/[name].js',
                assetFileNames: '[name]-[hash][ext]'
            },
        },
    },
});
