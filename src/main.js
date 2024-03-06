import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa la configuración del router
import { createPinia } from 'pinia'; // Importa Pinia
import { createHead } from '@vueuse/head';

import setUser from './plugins/userPlugin';
import setLayout from './plugins/layoutPlugin';
import i18n from './plugins/i18nPlugin';
import axiosPlugin from './plugins/axiosPlugin';
// import setupI18n from './plugins/i18n';

const app = createApp(App);
const head = createHead();
const pinia = createPinia();

app.use(router); // Usa Vue Router
app.use(pinia); // Usa Pinia

app.use(setUser); // Usa el plugin setUser, en user (store) esta el idima que debe usar la aplicación
app.use(setLayout)
app.use(i18n)
// app.use(i18n); // Usa el plugin
// setupI18n(app); // Configura vue-i18n después de instalar Pinia

app.use(head);
app.use(axiosPlugin, { baseURL: import.meta.env.VITE_API_URL });
app.mount('#app');
// ---
// // main.js
// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
// import { createPinia } from 'pinia';
// import { createHead } from '@vueuse/head';
// import setupI18n from './plugins/i18n'; // Importa la función

// const app = createApp(App);
// const head = createHead();
// const pinia = createPinia();

// app.use(router);
// app.use(pinia);
// setupI18n(app); // Configura vue-i18n después de instalar Pinia
// app.use(head);
// app.mount('#app');
