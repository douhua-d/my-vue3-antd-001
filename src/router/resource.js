const ResourceImage = () => import('../views/ResourceImage.vue');
const ResourceVideo = () => import('../views/ResourceVideo.vue');

import { FormOutlined } from '@ant-design/icons-vue'; // 按需导入图标

export default {
    path: '/resource',
    name: 'Resource',
    meta: { title: '资源管理', icon: FormOutlined },
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
            meta: { title: '视频管理', requiresAuth: true },
        },
    ],
};