//auth
export default function setupAuthMiddleware(router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const isAuthenticated = localStorage.getItem('refreshtoken'); // Aquí va tu lógica de verificación

        if (requiresAuth && !isAuthenticated) {
            next({ path: '/auth/login' }); // Redirigir al login si es necesario
        } else {
            next(); // Continuar si está autenticado o si la ruta no requiere autenticación
        }
    });
}
