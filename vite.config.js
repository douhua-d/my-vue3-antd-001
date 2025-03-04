import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import purgeCss from 'vite-plugin-purgecss';
import { viteMockServe } from 'vite-plugin-mock';

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
            viteMockServe({
                mockPath: './src/mock', // Mock 文件目录
                localEnabled: command === 'serve', // 仅在开发环境中启用 Mock
                prodEnabled: false, // 生产环境禁用 Mock
                // injectCode: `
                //   import { setupProdMockServer } from './mock/index';
                //   setupProdMockServer();
                // `, // 生产环境 Mock 配置（可选）
                supportTs: false, // 支持 TypeScript Mock 文件
                logger: true, // 启用日志输出，确保输出 "Mock Server is running"
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
        server: {
            host: '0.0.0.0', // 可访问的 IP 地址
            port: 5173, // 开发服务器端口
            open: true, // 自动打开浏览器
            cors: true,
            // 仅在开发环境中启用 proxy，避免测试和生产环境走代理
            // proxy: mode === 'development' ? {
            //     '/api': {
            //         target: 'http://localhost:3000', // 开发环境后端或 Mock 目标
            //         changeOrigin: true, // 改变请求源，解决跨域
            //         rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，去掉 /api 前缀
            //     },
            // } : {}, // 测试和生产环境不使用 proxy
            proxy: {
                // '/api': {
                //     target: '', // 后端服务器地址（从环境变量读取）
                //     changeOrigin: true, // 改变请求源，解决跨域
                //     rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，移除 /api 前缀
                // },
                // 匹配以 /upload 开头的请求
                // '/upload': {
                //     target: env.VITE_UPLOAD_TARGET || 'http://localhost:8080',
                //     changeOrigin: true,
                //     rewrite: (path) => path.replace(/^\/upload/, '/api/upload')
                // }
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
            // 生产环境移除console和debugger
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        },
        // // 动态定义环境变量
        // define: {
        //     __APP_ENV__: JSON.stringify(mode), // 在代码中可以通过 import.meta.env.__APP_ENV__ 访问
        // },
    };
});