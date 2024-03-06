import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    
    vue(),
    Components({
      directoryAsNamespace: true,
      // configuraciones adicionales aquí
      resolvers: [VantResolver()],
    })
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
