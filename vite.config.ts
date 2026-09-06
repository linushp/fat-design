import { defineConfig, esmExternalRequirePlugin, type Plugin, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ts from 'typescript'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

type FatDesignPkg = {
    name: string
    version: string
    npmPackageDependencies: Record<string, string>
    npmPackageDependenciesUMD: Record<string, string>
    publishConfig?: { registry?: string }
    uifaasDeploy?: {
        serverOrigin: string
        baseCdnUrl: string
        baseCdnUrl1?: string
    }
}

const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'),
) as FatDesignPkg

const TARGET_ENV = process.env.TARGET_ENV
const NODE_ENV = process.env.NODE_ENV
const libEntry = path.resolve(__dirname, 'src/index.tsx')
const buildVersion = resolveBuildVersion(packageJson.version, process.env.BUILD_PROD)
let dtsEmitted = false

console.log('NODE_ENV : ' + NODE_ENV)
console.log('TARGET_ENV : ' + TARGET_ENV)
console.log('[fat-design] build version : ' + buildVersion)

function pad2(num: number) {
    return num < 10 ? '0' + num : String(num)
}

function getDateTimeString() {
    const now = new Date()
    return [
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
    ].map((num) => pad2(Number(num))).join('')
}

function formatBuildTime(date = new Date()) {
    const y = date.getFullYear()
    const m = pad2(date.getMonth() + 1)
    const d = pad2(date.getDate())
    const h = pad2(date.getHours())
    const min = pad2(date.getMinutes())
    const s = pad2(date.getSeconds())
    return `${y}-${m}-${d} ${h}:${min}:${s}`
}

function resolveBuildVersion(version: string, buildProd?: string) {
    if (buildProd) {
        return version
    }
    return version + '-beta.' + getDateTimeString()
}

function emitDtsPlugin(): Plugin {
    return {
        name: 'emit-dts',
        buildEnd() {
            if (dtsEmitted) {
                return
            }
            dtsEmitted = true
            const program = ts.createProgram([libEntry], {
                target: ts.ScriptTarget.ESNext,
                module: ts.ModuleKind.ESNext,
                moduleResolution: ts.ModuleResolutionKind.NodeJs,
                jsx: ts.JsxEmit.ReactJSX,
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                skipLibCheck: true,
                declarationDir: path.resolve(__dirname, 'types/0buildTypes'),
                declaration: true,
                emitDeclarationOnly: true,
                allowJs: false,
            })
            program.emit()
        },
    }
}

function fatDesignPackagePlugin(version: string, pkg: FatDesignPkg): Plugin {
    return {
        name: 'fat-design-package',
        writeBundle() {
            const distDir = path.resolve(__dirname, 'dist')
            if (!fs.existsSync(distDir)) {
                console.error('[fat-design-package] dist not found, skip package emit')
                return
            }

            const distPackage = {
                name: 'fat-design',
                version,
                scripts: {},
                main: 'index.umd.js',
                module: 'index.js',
                typings: 'types/index.d.ts',
                // react / react-dom 由宿主安装并注入，不写入 dependencies
                dependencies: {},
                peerDependencies: pkg.npmPackageDependencies,
                devDependencies: {},
                repository: {
                    type: 'git',
                    url: 'https://cnb.cool/fatcms/fat-design',
                },
                publishConfig: pkg.publishConfig || {
                    registry: 'https://registry.npmjs.org',
                },
                buildTime: formatBuildTime(),
            }

            fs.writeFileSync(
                path.join(distDir, 'package.json'),
                JSON.stringify(distPackage, null, 4),
                'utf-8',
            )
            fs.copyFileSync(
                path.resolve(__dirname, 'README.md'),
                path.join(distDir, 'README.md'),
            )
            fs.copyFileSync(
                path.resolve(__dirname, 'example.html'),
                path.join(distDir, 'example.html'),
            )
            fs.cpSync(
                path.resolve(__dirname, 'libs'),
                path.join(distDir, 'libs'),
                { recursive: true },
            )
            fs.cpSync(
                path.resolve(__dirname, 'types'),
                path.join(distDir, 'types'),
                { recursive: true },
            )
            const skillsSrc = path.resolve(__dirname, 'skills')
            if (fs.existsSync(skillsSrc)) {
                fs.cpSync(skillsSrc, path.join(distDir, 'skills'), { recursive: true })
            }

            console.log('[fat-design-package] build version :   ' + distPackage.version)
            console.log('[fat-design-package] build time :   ' + distPackage.buildTime)
        },
    }
}

function libFileName(format: string) {
    if (format === 'es') {
        return 'index.js'
    }
    if (format === 'umd') {
        return 'index.umd.js'
    }
    return `index.${format}.js`
}

const cssConfig = {
    preprocessorOptions: {
        scss: {
            silenceDeprecations: ['import', 'global-builtin', 'if-function'],
        },
    },
    lightningcss: {
        errorRecovery: true,
    },
}

export default defineConfig((): UserConfig => {
    const define = {
        'process.env.NODE_ENV': NODE_ENV === 'development' ? '"development"' : '"production"',
        __FAT_DESIGN_VERSION__: JSON.stringify(buildVersion),
    }

    // esbuild 的 charset 默认为 utf8，会把图标字体的私有区码位（如 U+E65F）
    // 以原始 UTF-8 字节输出，造成产物乱码。显式改为 ascii 后，
    // 非 ASCII 字符会被转义为 "\e65f" 形式（配合 build.cssMinify: 'esbuild' 生效）。
    // 同时关闭压缩（空白/标识符/语法），使输出的 CSS 保持格式化、便于阅读
    const esbuildOptions = {
        charset: 'ascii' as const,
        minifyWhitespace: false,
        minifyIdentifiers: false,
        minifySyntax: false,
    }

    if (TARGET_ENV === 'npm') {
        return {
            plugins: [
                emitDtsPlugin(),
                // classic：避免把开发依赖里的 React 18 jsx-runtime 打进产物，保证宿主 React 16.8/17/18 同源
                react({ jsxRuntime: 'classic' }),
                esmExternalRequirePlugin({
                    external: ['react'],
                }),
                fatDesignPackagePlugin(buildVersion, packageJson),
            ],
            define,
            css: cssConfig,
            esbuild: esbuildOptions,
            build: {
                target: 'es2015',
                outDir: 'dist',
                sourcemap: false,
                emptyOutDir: true,
                manifest: false,
                // 使用 esbuild 压缩 CSS：配合上方 esbuild.charset = 'ascii'，
                // 把图标字体等非 ASCII 码位转义为 "\e65f" 形式，避免产物乱码
                cssMinify: 'esbuild',
                lib: {
                    entry: libEntry,
                    name: 'FatDesign',
                    formats: ['es', 'umd'],
                    fileName: libFileName,
                    cssFileName: 'style',
                },
                rolldownOptions: {
                    output: {
                        globals: packageJson.npmPackageDependenciesUMD,
                    },
                },
            },
        }
    }

    return {
        plugins: [
            react(),
            ...(TARGET_ENV === 'demo'
                ? [
                    visualizer({
                        filename: './stats.html',
                        open: false,
                        gzipSize: true,
                        brotliSize: true,
                    }),
                ]
                : []),
        ],
        define,
        css: cssConfig,
        esbuild: esbuildOptions,
        // 生产 demo 构建走 CDN 路径，供 buildDeployRelease 上传；本地 dev 仍是 /
        base: NODE_ENV === 'production' && packageJson.uifaasDeploy
            ? `${packageJson.uifaasDeploy.baseCdnUrl}/${packageJson.name}/${packageJson.version}/`
            : '/',
        build: {
            target: 'es2015',
            outDir: 'dist',
            sourcemap: true,
            emptyOutDir: true,
            manifest: true,
            cssMinify: 'esbuild',
        },
    }
})
