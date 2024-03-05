// import axios from 'axios';
import { useUserStore } from '@/store/user.js';

export default {
    async install(app) {
        try {
            //   const response = await axios.get('https://api.example.com/data');
            const user = useUserStore();
            user.setName('Andrés de los Juanes');
        } catch (error) {
            console.error('Failed to load initial data:', error);
        }
    },
};
