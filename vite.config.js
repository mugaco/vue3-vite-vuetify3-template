import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    vue({
      // Esta opción permite inyectar estilos SCSS globales
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "${resolve(__dirname, 'assets/styles/main.scss')}";`
          }
        }
      }
    }),
    Components({
      dirs: ['src/components'], // Puedes añadir más rutas si es necesario
      extensions: ['vue'], // Extensiones de archivo a considerar
      deep: true, // Buscar en subdirectorios de forma recursiva
      dts: true, // Generar archivo de declaración TypeScript
    }),
  ],
  server: {
    port: 8812, // Especifica el puerto deseado aquí
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
