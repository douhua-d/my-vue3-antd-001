import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import styleImport from 'vite-plugin-style-import';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
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
                additionalData: `@import "@/styles/globals.scss";`
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
});
