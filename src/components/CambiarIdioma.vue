<script setup>
import { useI18n } from 'vue-i18n';

// Obtén la instancia i18n para acceder a las funcionalidades de internacionalización
const { locale } = useI18n();

// Función para cambiar el idioma
function changeLanguage(lang) {
  locale.value = lang; // Cambia el idioma actualmente activo
}
</script>

<template>
  <div>
    <!-- Botones para cambiar el idioma -->
    <pre>{{ {locale} }}</pre>
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('es')">Español</button>
  </div>
</template>
