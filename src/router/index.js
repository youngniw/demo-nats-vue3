import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';
import SearchCar from '@/pages/SearchCar.vue';
import CarList from '@/pages/CarList.vue';
import CarOperationHistory from '@/pages/CarOperationHistory.vue';

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
        {
            // (페이지) 차량 목록
            path: '/carlist',
            name: 'CarList',
            component: CarList
        },
        {
            // (페이지) 차량 운행 이력
            path: '/operation-history',
            name: 'CarOperationHistory',
            component: CarOperationHistory
        },
    ]
});

export default router;
