/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VBtn } from 'vuetify/components';
// import { md3 } from 'vuetify/blueprints'
// // import { md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { useLayoutStore } from '@/store/layoutStore'


import { GREEN_THEME } from '@/theme/LightTheme';

import { DARK_GREEN_THEME } from '@/theme/DarkTheme';


const dark = localStorage.getItem('isDark');

let isDark = dark === true ?? false
// let isDark = false


export default {
  async install(app) {
    try {

      const layout = useLayoutStore();
      console.log(dark, isDark, layout.darkTheme)

      const vuetify = createVuetify({
        components: components,
        directives: directives,
        // blueprint: md3,

        icons: {
          defaultSet: 'mdi',
          aliases,
          sets: {
            mdi,
          },
        },
        theme: {
          defaultTheme: isDark ? layout.darkTheme : layout.lightTheme, //  'DARK_BLUE_THEME' : 'BLUE_THEME',
          themes: {
            // BLUE_THEME,
            // AQUA_THEME,
            // PURPLE_THEME,
            GREEN_THEME,
            // CYAN_THEME,
            // ORANGE_THEME,
            // DARK_BLUE_THEME,
            // DARK_AQUA_THEME,
            // DARK_ORANGE_THEME,
            // DARK_PURPLE_THEME,
            DARK_GREEN_THEME,
            // DARK_CYAN_THEME
            // QUARTUP,
            // DARK_QUARTUP,
            // MICEL,
            // DARK_MICEL
          }
        },
        defaults: {
          VCard: {
            rounded: 'md'
          },
          VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
          },
          VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
          },
          VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'primary'
          },
          VListItem: {
            minHeight: '45px'
          },
          VTooltip: {
            location: 'top'
          }
        }
      })
      app.use(vuetify)

    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  },
};