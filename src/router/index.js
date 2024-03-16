// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ErrorLayout from '@/layouts/ErrorLayout.vue';
import Home from '@/views/Home.vue';
import Dos from '@/views/Dos.vue';
import Tres from '@/views/Tres.vue';
import LoginPage from '@/views/LoginPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
const routes = [
    {
        path: '/',
        component: Home,
        meta: { layout: DefaultLayout },
    },
    {
        path: '/dos',
        component: Dos,
        meta: { layout: DefaultLayout },
    },
    {
        path: '/tres',
        component: Tres,
        meta: { layout: DefaultLayout },
    },
    {
        path: '/auth',
        component: LoginPage,
        meta: { layout: AuthLayout },
    },

    // Ruta para manejar las páginas no encontradas (404)
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
        meta: { layout: ErrorLayout },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
