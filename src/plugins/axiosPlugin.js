// src/plugins/axiosPlugin.js
import axios from 'axios';

export default {
  install: (app, options) => {
    const axiosInstance = axios.create({
      baseURL: options.baseURL, // Configuraciones por defecto
    });

    // Interceptor de peticiones
    axiosInstance.interceptors.request.use(
      config => {
        // Aquí puedes modificar la configuración de la petición antes de que se envíe
        // Por ejemplo, añadir un token de autenticación a los headers
        const token = "TU_TOKEN_DE_AUTENTICACION";
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
      }, 
      error => {
        // Haz algo con el error de la petición
        return Promise.reject(error);
      }
    );

    // Interceptor de respuestas
    axiosInstance.interceptors.response.use(
      response => {
        // Cualquier código de estado que esté dentro del rango 2xx causa que esta función se dispare
        // Haz algo con los datos de respuesta
        return response;
      },
      error => {
        // Cualquier código de estado fuera del rango 2xx causa que esta función se dispare
        // Haz algo con el error de respuesta
        return Promise.reject(error);
      }
    );

    // Hacer la instancia de axios disponible globalmente
    app.config.globalProperties.$axios = axiosInstance;
  },
};
