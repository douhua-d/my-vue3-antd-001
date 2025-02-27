// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user'; // 导入 Pinia 存储
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';

const ResourceImage = () => import('../views/ResourceImage.vue');
const ResourceVideo = () => import('../views/ResourceVideo.vue');

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { title: '首页', requiresAuth: false, icon: 'SmileFilled' },
        children: [],
    },
    {
        path: '/resource',
        name: 'Resource',
        meta: { title: '资源管理', icon: 'FormOutlined' },
        children: [
            {
                path: 'image',
                name: 'ResourceImage',
                component: ResourceImage,
                meta: { title: '图片管理', requiresAuth: true },
            },
            {
                path: 'video',
                name: 'ResourceVideo',
                component: ResourceVideo,
                meta: { title: '视频管理' },
            }
        ],
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { title: '关于', requiresAuth: false },
        children: [],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore(); // 获取 Pinia 用户状态

    // 恢复登录状态（从本地存储加载）
    if (!userStore.isAuthenticated) {
        userStore.restoreLogin();
    }

    // 检查是否需要认证
    if (to.meta.requiresAuth) {
        if (!userStore.isAuthenticated) {
            // 未登录，跳转到登录页，并保存目标路由以便登录后跳转
            return next({ name: 'Login', query: { redirect: to.fullPath } });
        }

        // 检查权限（根据角色动态控制）
        const userRoles = userStore.roles || []; // 用户角色
        const requiredRoles = to.meta.roles; // 可选：在 meta 中定义所需角色

        if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
            // 权限不足，跳转到无权限页面或首页
            return next({ name: 'Home' });
        }
    }

    // 设置页面标题
    if (to.meta.title) {
        document.title = `${to.meta.title} - Tiger`;
    }

    next(); // 继续路由导航
});

// 路由后置守卫（可选，用于日志或分析）
router.afterEach((to, from) => {
    console.log(`Navigated from ${from.name} to ${to.name}`);
});

// 路由错误处理（可选）
router.onError((error) => {
    console.error('Router error:', error);
});

export default router;