import { createI18n } from 'vue-i18n';

import { useUserStore } from "@/store/userStore.js";

export default {
  async install(app) {
    const { app_lang } = useUserStore();

    try {
      app.use(createI18n({
        legacy: false,
        globalInjection: true,
        locale: app_lang,//'es',
        fallbackLocale: 'es',
        messages: {
          en: {
            message: {
              hello: 'hello world',
            },
          },
          es: {
            message: {
              hello: 'hola mundo',
            },
          },
        },
      }));

    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  },
};
