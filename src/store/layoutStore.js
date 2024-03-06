// store/layoutStore.js
import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    color: 'red',
  }),
  actions: {
    setColor(val) {
        this.color = val
    },
  }
  // Otras opciones como getters y actions...
});
