import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('./components/Home.vue'),
    },
    {
        path: '/games',
        component: () => import('./components/Games.vue'),
    },
    {
        path: '/games/:id',
        component: () => import('./components/Game.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
