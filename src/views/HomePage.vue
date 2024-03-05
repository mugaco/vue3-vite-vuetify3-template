<template>
    <div>
        <HelloWorld />
    </div>
</template>

<script setup>
import { useHead } from '@vueuse/head';
useHead({
  title: 'Mi Página Increíble',
//   link: [
//     { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
//     // Puedes añadir más enlaces aquí
//   ]
});
</script>

<style lang="scss" scoped>

</style>