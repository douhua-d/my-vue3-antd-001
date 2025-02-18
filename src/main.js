import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

// 导入 Ant Design Vue
import Antd from 'ant-design-vue';

const app = createApp(App);
app.use(Antd); // 使用 Ant Design Vue
app.use(router);

app.mount('#app');
