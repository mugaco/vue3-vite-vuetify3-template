<!-- components/layouts/AuthLayout.vue -->
<template>
    <div>
      <header> <!-- Cabecera específica para Auth --> </header>
      <main>
        <!-- Aquí se renderizarán los componentes de la ruta de autenticación -->
        <!-- <slot></slot> -->
        <router-view/>
      </main>
      <!-- Puede que no quieras un footer para las páginas de autenticación -->
    </div>
  </template>
  
  <script setup>
  // Lógica del componente
  </script>
  