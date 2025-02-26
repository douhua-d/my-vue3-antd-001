import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';  // 导入vue-jsx插件
// import styleImport from 'vite-plugin-style-import';
import { resolve } from 'path';
import purgeCss from 'vite-plugin-purgecss';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),  // 启用 JSX 支持
        purgeCss(), // 移除未使用的 CSS
        // styleImport({
        //     libs: [
        //         {
        //             libraryName: 'ant-design-vue',
        //             esModule: true,
        //             resolveStyle: (name) => {
        //                 // 按需加载样式
        //                 return `ant-design-vue/es/${name}/style/index`;
        //             },
        //         },
        //     ],
        // }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/global.scss";`
            }
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
            '@assets': resolve(__dirname, 'src/assets')
        }
    },
    build: {
        // 生产环境优化
        target: 'esnext', // 目标 JavaScript 版本
        outDir: 'dist', // 输出目录
        assetsDir: 'assets', // 静态资源目录
        rollupOptions: {
            output: {
                // 自定义输出文件命名
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            },
        },
        minify: 'esbuild', // 使用 esbuild 压缩代码（比 terser 更快）
        cssCodeSplit: true, // CSS 按需分割
        sourcemap: false, // 生产环境禁用 source map
        chunkSizeWarningLimit: 500, // 警告过大的 chunk 大小（单位：KB）
    },
});
