// store/user.js
import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    color: 'red',
  }),
  // Otras opciones como getters y actions...
});
