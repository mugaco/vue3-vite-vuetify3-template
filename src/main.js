// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa la configuración del router
import { createPinia } from 'pinia'; // Importa Pinia
import { createHead } from '@vueuse/head';

import setUser from './plugins/setUser';

const app = createApp(App);
const head = createHead();

app.use(router); // Usa Vue Router
app.use(createPinia()); // Usa Pinia
app.use(setUser); // Usa el plugin setUser

app.use(head);
app.mount('#app');
