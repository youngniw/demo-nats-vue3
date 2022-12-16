import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';
import SearchCar from '@/pages/SearchCar.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            // 메인 홈페이지
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            // (페이지) 나의 차량 찾기
            path: '/search-car',
            name: 'SearchCar',
            component: SearchCar
        },
    ]
});

export default router;
