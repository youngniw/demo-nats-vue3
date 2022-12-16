import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            // 메인 홈페이지
            path: '/',
            name: 'Main',
            component: Main
        },
    ]
});

export default router;
