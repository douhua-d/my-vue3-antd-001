// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
const ResourceImage = () => import('../views/ResourceImage.vue');
const ResourceVideo = () => import('../views/ResourceVideo.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: '首页',requiresAuth: true },
        children: [],
    },
    {
        path: '/resource',
        name: 'Resource',
        meta: { title: '资源管理', icon: 'resource' },
        children: [
            {
                path: 'image',
                name: 'ResourceImage',
                component: ResourceImage,
                meta: { title: '图片管理' },
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
        meta: { title: '关于',requiresAuth: true },
        children: [],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;