import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false, // 是否已认证
        token: null, // 认证令牌
        roles: [], // 用户角色（如 ['admin', 'user']）
        userInfo: null, // 用户信息（可选）
    }),
    actions: {
        // 登录
        login(token, roles = ['user'], userInfo = {}) {
            this.isAuthenticated = true;
            this.token = token;
            this.roles = roles;
            this.userInfo = userInfo;
            // 可选：保存到本地存储以持久化
            localStorage.setItem('userToken', token);
            localStorage.setItem('userRoles', JSON.stringify(roles));
        },
        // 登出
        logout() {
            this.isAuthenticated = false;
            this.token = null;
            this.roles = [];
            this.userInfo = null;
            // 清除本地存储
            localStorage.removeItem('userToken');
            localStorage.removeItem('userRoles');
        },
        // 恢复登录状态（从本地存储加载）
        restoreLogin() {
            const token = localStorage.getItem('userToken');
            const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
            if (token) {
                this.isAuthenticated = true;
                this.token = token;
                this.roles = roles;
            }
        },
    },
    persist: {
        storage: localStorage, // 持久化存储到 localStorage
    },
});