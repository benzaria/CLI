import { defineConfig } from 'vite';
// const { defineConfig } = require('vite')

export default defineConfig({
    root: './',
    base: './',
    build: {
        minify: false,
        outDir: 'dist',
        sourcemap: true,
        emptyOutDir: false,
        rollupOptions: {
            input: {
                main: '/src/index.ts',
            },

            output: {
                entryFileNames: 'index.js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: '[name]-[hash][ext]'
            },
        },
    }
});
