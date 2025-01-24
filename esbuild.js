import * as esbuild from 'esbuild';

// let formatted = await esbuild.formatMessages([
//     {
//         text: 'This is an error',
//         location: {
//             file: 'app.js',
//             line: 10,
//             column: 4,
//             length: 3,
//             lineText: 'let foo = bar',
//         },
//     },
// ], {
//     kind: 'error',
//     color: false,
//     terminalWidth: 100,
// })

// console.log(formatted.join('\n'))

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
