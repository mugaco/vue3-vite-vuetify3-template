<!-- components/layouts/Default.vue -->
<template>

  <v-app>
    <!-- <app-loading></app-loading> -->
    <v-layout>

      <!-- <RightDrawer /> -->
      <!-- <header>
        menu: <router-link to="/">Ir a Home</router-link>
        <router-link to="/dos">Ir a Dos</router-link>
        <router-link to="/auth/login">Logins</router-link>
        <CambiarIdioma />
      </header> -->
      <!-- <Header /> -->
      <v-main>
        <slot></slot>

      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
// Lógica del componente
import { useHead } from '@vueuse/head';
useHead({
  title: 'Error',
  link: [
    { rel: 'icon', type: "image/svg+xml", href: '/vite.svg' },
    // Puedes añadir más enlaces aquí
  ]
});
</script>
