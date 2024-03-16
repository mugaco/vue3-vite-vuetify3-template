// store/layoutStore.js
import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  id: 'layout',
  state: () => {
    return {
      // maxWidth: '1240px',
      drawer: true,
      // rightDrawer: false,
      // rightDrawerWidth: 900,
      // rightDrawerContent: null, // aquí se almacenará el contenido del drawer
      isDark: false,
      darkTheme: 'DARK_GREEN_THEME',//'DARK_BLUE_THEME',
      lightTheme: 'GREEN_THEME',//'BLUE_THEME',
      // logo: null,
      // title: null,
      // favicon: null
    }
  },
  actions: {
    toggleDark() {
      this.isDark = !this.isDark
      // console.log('togle')
    },
    setDark(v) {
      this.isDark = v
      // console.log('togle')
    },
    async openRightDrawer(componentName) {
      this.rightDrawerContent = componentName;
      this.rightDrawer = true;
    },
    closeRightDrawer() {
      this.rightDrawer = false
    },
    setTheme(val) {
      this.darkTheme = `DARK_${val.toUpperCase()}`
      this.lightTheme = val.toUpperCase()
    },
    // setLogo(val) {
    //   this.logo = val
    // },
    // setFavi(val) {
    //   this.favicon = val
    // },
    // setTitle(val) {
    //   this.title = val
    // },
  }
})