<template>
  <div>page 2 {{ name }}</div>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import { useHead } from '@vueuse/head';
const { name } = useUserStore();

useHead({
  title: 'Mi Dos Página Increíble',
//   link: [
//     { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
//     // Puedes añadir más enlaces aquí
//   ]
});
</script>

<style lang="scss" scoped></style>
