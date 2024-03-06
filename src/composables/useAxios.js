// src/composables/useAxios.js
import { getCurrentInstance } from 'vue';

export function useAxios() {
  const instance = getCurrentInstance();
  return instance.appContext.config.globalProperties.$axios;
}
