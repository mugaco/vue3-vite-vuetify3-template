<!-- components/layouts/Default.vue -->
<template>
  <div>
    <header>
      menu: <router-link to="/">Ir a Home</router-link>
      <router-link to="/dos">Ir a Dos</router-link>
      <router-link to="/auth/login">Logins</router-link>
      <CambiarIdioma />
    </header>
    <main>
      <!-- Aquí se renderizarán los componentes de la ruta -->

      <!-- <slot></slot> -->
      <router-view />
    </main>
    <footer><!-- Pie de página común --></footer>
  </div>
</template>

<script setup>
// Lógica del componente
import { useHead } from '@vueuse/head';
useHead({
  // title: 'Mi Página Increíble',
  link: [
    { rel: 'icon', type:"image/svg+xml", href: '/vite.svg' },
    // Puedes añadir más enlaces aquí
  ]
});
</script>
