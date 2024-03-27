<!-- App.vue -->
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed, onMounted ,inject} from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';

export default {
  setup() {
    const refreshToken = inject('refreshToken');
    onMounted(()=>{
     console.log(refreshToken);
     localStorage.setItem('refreshtoken',refreshToken)
    })
    const route = useRoute();

    const layout = computed(() => {
      // Retorna el layout especificado en la meta de la ruta, o DefaultLayout si no hay ninguno definido
      return route.meta.layout || DefaultLayout;
    });

    return { layout };
  },
};
</script>
