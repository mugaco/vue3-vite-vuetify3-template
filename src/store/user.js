// store/user.js
import { defineStore } from 'pinia';


// console.log(dark);
export const useUserStore = defineStore('user', {

    state: () => {
        return {
            user_id: null,
            name: 'Juan Doe',
            email: 'john@example.com',
            role: null,
            is: null,
            signature: null,
            app_lang: 'es'
        }
    },
    actions: {
        setUser_id(val) {
            this.user_id = val
        },
        setName(val) {
            this.name = val
        },
        setEmail(val) {
            this.email = val
        },
        setRole(val) {
            this.role = val
        },
        setIs(val) {
            this.is = val
        },
        setSignature(val) {
            this.signature = val
        },
        setApp_lang(val) {
            this.app_lang = val
        }

    }
})

