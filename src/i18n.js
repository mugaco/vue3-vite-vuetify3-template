import { createI18n } from 'vue-i18n';

// Mensajes de localización
const messages = {
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
};

// Crear instancia de i18n
const i18n = createI18n({
  locale: 'en', // Establece el idioma inicial
  fallbackLocale: 'en', // Establece el idioma de respaldo
  messages,
});

export default i18n;
