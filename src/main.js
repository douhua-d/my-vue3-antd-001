import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css';
import App from './App.vue';
import router from './router';

// 导入 Ant Design Vue
import Antd from 'ant-design-vue';

const app = createApp(App);
const pinia = createPinia();
pinia.use(PiniaPluginPersistedstate); // 启用持久化插件

app.use(pinia);
app.use(Antd); // 使用 Ant Design Vue
app.use(router);

app.mount('#app');
