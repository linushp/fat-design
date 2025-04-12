import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import ts from 'typescript';

// @ts-ignore
import {resolve} from 'path'
// @ts-ignore
import packageJson from './package.json'
import {visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/

// @ts-ignore
const env = process.env;
const TARGET_ENV = env.TARGET_ENV;
const NODE_ENV = env.NODE_ENV;

console.log("NODE_ENV : " + NODE_ENV)
console.log("TARGET_ENV : " + TARGET_ENV)


// @ts-ignore
const libEntry = resolve(__dirname, 'src/index.tsx');

function buildConfig() {

    const emitDTS = {
        name: "emit-dts",
        buildEnd() {
            const program = ts.createProgram([libEntry], {
                target: ts.ScriptTarget.ESNext,
                module: ts.ModuleKind.ESNext,
                moduleResolution: ts.ModuleResolutionKind.NodeJs,
                jsx: ts.JsxEmit.Preserve,
                jsxImportSource: "solid-js",
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                outDir: `distTmp/js`,
                declarationDir: `distTmp/0buildTypes`,
                declaration: true,
                emitDeclarationOnly: true,
                allowJs: false,
            });
            program.emit();
        },
    };


    const baseObj = {
        plugins: [
            react(),
            visualizer({
                filename: './stats.html',
                open: true,
                gzipSize: true,
                brotliSize: true,
            }),
        ],
        define: {'process.env.NODE_ENV': NODE_ENV === 'development' ? '"development"' : '"production"'},

        build: {
            manifest: true,
            target: 'es2015',
            outDir: 'dist',
            sourcemap: true,
            // sourcemap: 'inline',
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: libEntry,
                name: 'FatDesign',
                fileName: 'index'
            },
            modulePreload: {
                polyfill: false,
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['react', 'react-dom'],
                input: '/demo/main.tsx',
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
        },
    };




    if (TARGET_ENV === 'npm') {
        baseObj.plugins = [
            emitDTS,
            react(),
            // visualizer({
            //     filename: './stats.html',
            //     open: true,
            //     gzipSize: true,
            //     brotliSize: true,
            // }),
        ];
        baseObj.build.rollupOptions.input = libEntry;
        baseObj.build.sourcemap = false;
        // baseObj.build.rollupOptions.external = Object.keys(packageJson.npmPackageDependencies)
        baseObj.build.rollupOptions.external = [
            'react',
            'react/jsx-runtime',
            'react/jsx-dev-runtime'
        ]
        baseObj.build.rollupOptions.output.globals = packageJson.npmPackageDependenciesUMD;
    }


    return baseObj;
}


export default defineConfig(buildConfig())
