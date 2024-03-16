import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';
import ErrorLayout from '@/components/layouts/ErrorLayout.vue';
import Home from '@/views/Home.vue';
import Dos from '@/views/Dos.vue';
import LoginPage from '@/views/LoginPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';



const routes = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Home },
      { path: 'dos', component: Dos },

      // Puedes agregar más rutas que usen DefaultLayout aquí
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage },
      // Puedes agregar más rutas que usen AuthLayout aquí
    ],
  },
  // Agrega más rutas según sea necesario

  // Ruta para manejar las páginas no encontradas (404)
  {
    path: '/:pathMatch(.*)*',
    component: ErrorLayout,
    children: [
      { path: '', component: NotFoundPage },
      // Puedes agregar más rutas que usen AuthLayout aquí
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes,
});

export default router;
