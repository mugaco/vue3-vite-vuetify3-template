import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/components/layouts/Default.vue';
import AuthLayout from '@/components/layouts/Auth.vue';
import HomePage from '@/views/HomePage.vue';
import PageDos from '@/views/PageDos.vue';
import LoginPage from '@/views/LoginPage.vue';

console.log(HomePage)

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'dos', component: PageDos },
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes,
});

export default router;
