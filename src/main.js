import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa la configuración del router
import setupAuthMiddleware from './middlewares/auth';
import { createPinia } from 'pinia'; // Importa Pinia
import { createHead } from '@vueuse/head';

import setUser from './plugins/userPlugin';
import setLayout from './plugins/layoutPlugin';
import i18n from './plugins/i18nPlugin';
import axiosPlugin from './plugins/axiosPlugin';
import vuetify from './plugins/vuetifyPlugin';
// console.log(vuetify)
import './assets/styles/main.scss'
const app = createApp(App);
const head = createHead();
const pinia = createPinia();

// Aplica el middleware auth al router
setupAuthMiddleware(router);
app.use(router); // Usa Vue Router
app.use(pinia); // Usa Pinia

app.use(setUser); // Usa el plugin setUser, en user (store) esta el idima que debe usar la aplicación
app.use(setLayout)
app.use(i18n)


app.use(head);
app.use(axiosPlugin, { baseURL: import.meta.env.VITE_API_URL });
app.use(vuetify)

const refreshToken = () =>{
    const el = document.getElementById('apir-usuario')
   return el.getAttribute("data-apir");
}
app.provide('refreshToken', refreshToken());
app.mount('#app');

