import axios from 'axios';

export default {
  install: (app, options) => {
    const axiosInstance = axios.create({
      baseURL: options.baseURL,
    });

    axiosInstance.interceptors.request.use(config => {
      // console.log("Añadiendo headers");
      const token = "TU_TOKEN_DE_AUTENTICACION";
      config.headers["X-Application"] = 'foo'
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    }, error => {
      return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(response => {
      return response;
    }, error => {
      return Promise.reject(error);
    });

    app.config.globalProperties.$axios = axiosInstance;
  },
};
