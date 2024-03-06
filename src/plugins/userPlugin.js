// import axios from 'axios';
import { useUserStore } from '@/store/userStore.js';

export default {
    async install(app) {
        try {
            //   const response = await axios.get('https://api.example.com/data');
            const user = useUserStore();
            user.setName('Lucas');
            user.setApp_lang('en');
        } catch (error) {
            console.error('Failed to load initial data:', error);
        }
    },
};
