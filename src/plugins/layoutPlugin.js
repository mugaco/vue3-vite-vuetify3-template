import { useLayoutStore } from "@/store/layoutStore.js";
import { useUserStore } from "@/store/userStore.js";

export default {
    async install(app) {
        try {
            // Acceder al dominio
            const domain = window.location.hostname;
            // en funcion del dominio queremos y podemos setear variables de layout

            // console.log(domain)
            // const { name } = useUserStore();
            const layout = useLayoutStore();
            // if (name == "Lucas") {
            //     layout.setColor('blue');

            // } else {
            //     layout.setColor('green');

            // }
        } catch (error) {
            console.error('Failed to load initial data:', error);
        }
    },
};
