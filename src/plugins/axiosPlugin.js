import axios from 'axios';

export default {
  install: (app, options) => {
    let token = null; // Token de acceso inicialmente nulo
    const xApplication = 'dev-spa'
    const axiosInstance = axios.create({
      baseURL: options.baseURL,
    });

    axiosInstance.interceptors.request.use(config => {
      config.headers["X-Application"] = xApplication;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(response => {
      // Manejar respuestas exitosas
      if ((response.config.url == '/auth/access' || response.config.url == '/auth/access/by-api-key') && response.status === 200) {
        console.log('response', response.data)
        let t = null; //token
        let r = null; //refresh
        if (response.data.token || response.data.refreshToken) {
          t = response.data.token // api2 quartup
          r = response.data.refreshToken
        } else {
          if (response.data.data) {
            t = response.data.data.token; //microservices gateway
            r = response.data.data.refreshToken
          }
        }
        token = t
        console.log('t',t)
        localStorage.setItem('refreshtoken', r);
      }
      if (response.data.data) {
        return response.data;
      }
      return response;
    }, async error => {
      const originalRequest = error.config;

      // Verificar si el error es 401, el token no está presente, y no se ha intentado ya un refresh
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Marcar que se intentará un refresh

        // Intento de obtener un nuevo token usando el refreshToken almacenado
        const refreshToken = localStorage.getItem('refreshtoken');
        if (refreshToken) {
          try {
            // Suponiendo que tienes un endpoint /auth/refresh para renovar el token
            const response = await axiosInstance.post('/auth/access/refresh', { refreshToken: refreshToken });
console.log(response);
            token = response.data.token; // Actualizar el token global
            // actualizamos el refreshToken
            localStorage.setItem('refreshtoken', response.data.refreshToken);
            // Actualizar el token en las cabeceras y reintentar la solicitud original
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            originalRequest.headers['Authorization'] = `Bearer ${token}`;

            return axiosInstance(originalRequest); // Reintentar la solicitud original con el nuevo token
          } catch (refreshError) {
            // Manejar el fallo en el refresh aquí, por ejemplo, redirigiendo al login
            console.error("Refresh token failed", refreshError);
            return Promise.reject(refreshError);
          }
        }
      }

      // Para cualquier otro error, simplemente lo pasamos
      return Promise.reject(error);
    });

    app.config.globalProperties.$axios = axiosInstance;
  },
};

