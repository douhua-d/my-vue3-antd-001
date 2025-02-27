import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import purgeCss from 'vite-plugin-purgecss';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    // 加载环境变量，__dirname 是配置文件所在目录
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    console.log('Current command:', command); // 输出当前命令（build 或 serve）
    console.log('Current mode:', mode); // 输出当前模式（development 或 production）
    console.log('Vite env:', env); // 输出加载的环境变量对象

    return {
        plugins: [
            vue(),
            vueJsx(),
            purgeCss({
                safelist: [/^ant-/, 'ant-layout-sider'], // 保留所有以 'ant-' 开头的类名和特定类名
            }),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/styles/global.scss";`,
                },
            },
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve(__dirname, 'src'),
                '@components': resolve(__dirname, 'src/components'),
                '@assets': resolve(__dirname, 'src/assets'),
                '@stores': resolve(__dirname, 'src/stores'),
            },
        },
        build: {
            // 动态根据环境调整配置
            target: 'esnext',
            outDir: 'dist',
            assetsDir: 'assets',
            rollupOptions: {
                output: {
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                },
            },
            minify: command === 'build' ? 'esbuild' : false, // 生产环境压缩，开发环境不压缩
            cssCodeSplit: true,
            sourcemap: command === 'serve', // 开发环境启用 source map，生产环境禁用
            chunkSizeWarningLimit: 500,
        },
        // // 动态定义环境变量
        // define: {
        //     __APP_ENV__: JSON.stringify(mode), // 在代码中可以通过 import.meta.env.__APP_ENV__ 访问
        // },
    };
});