<template>
  <div> P2</div>
 
</template>

<script setup>
import { useUserStore } from "@/store/userStore.js";
import { useHead } from '@vueuse/head';
const { name } = useUserStore();

useHead({
  title: 'Mi Dos Página Increíble',
});
</script>

<style lang="scss" scoped></style>
