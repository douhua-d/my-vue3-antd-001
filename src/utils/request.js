import axios from 'axios';
import { message } from 'ant-design-vue'; // 假设使用 Ant Design Vue 提示
import { useUserStore } from '@/stores/user'; // 假设使用 Pinia 管理用户状态

// 自定义错误类，用于统一错误处理
class HttpError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

// 创建 Axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 动态读取环境变量或默认值
    timeout: 10000, // 请求超时时间（10秒）
    withCredentials: false, // 是否携带 Cookie（视需求调整）
});

// 请求拦截器：在发送请求前做一些处理（如添加 token）
service.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers.Authorization = `Bearer ${userStore.token}`; // 添加认证 token
        }
        config.headers['Content-Type'] = 'application/json'; // 默认 JSON 格式
        return config;
    },
    (error) => {
        // 请求发送失败（网络错误等）
        message.error('网络请求失败，请检查网络连接');
        return Promise.reject(new HttpError('网络请求失败', null, error));
    }
);

// 响应拦截器：统一处理响应和错误
service.interceptors.response.use(
    (response) => {
        const { data, status } = response;
        if (status === 200) {
            console.log({status});
            console.log({data});
            if (data.code === 0 || data.success) { // 假设后端返回的成功标识
                return data.data || data; // 返回数据部分
            } else {
                // 业务逻辑错误（如后端返回 code 非 0）
                const error = new HttpError(data.message || '请求失败', status, data);
                handleError(error);
                return Promise.reject(error);
            }
        }
        // 网络错误或其他状态码
        const error = new HttpError('网络错误', status, data);
        handleError(error);
        return Promise.reject(error);
    },
    (error) => {
        // 响应错误（HTTP 状态码错误）
        const { response } = error;
        if (response) {
            const { status, data } = response;
            const errorMsg = data?.message || `HTTP 错误 ${status}`;
            const httpError = new HttpError(errorMsg, status, data);
            handleError(httpError);
            return Promise.reject(httpError);
        } else {
            const networkError = new HttpError('网络连接异常，请稍后重试', null, error);
            handleError(networkError);
            return Promise.reject(networkError);
        }
    }
);

// 统一错误处理函数
function handleError(error) {
    const { status } = error;
    switch (status) {
        case 401: // 未授权
            message.error('未授权，请登录');
            const userStore = useUserStore();
            userStore.logout(); // 登出
            window.location.href = '/login'; // 跳转到登录页
            break;
        case 403: // 权限不足
            message.error('权限不足');
            break;
        case 500: // 服务器错误
            message.error('服务器错误，请联系管理员');
            break;
        default:
            message.error(error.message || '请求失败');
    }
}

// 封装请求方法
export function get(url, params = {}) {
    return service.get(url, { params });
}

export function post(url, data = {}) {
    return service.post(url, data);
}

export function put(url, data = {}) {
    return service.put(url, data);
}

export function del(url, params = {}) {
    return service.delete(url, { params });
}

// 导出服务实例以便自定义配置
export default service;